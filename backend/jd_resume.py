from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv
import json
import PyPDF2

# Load environment variables
load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Gemma2-9b-It")

jd_resume = Blueprint('jd_resume', __name__)

def parse_json_response(response_content):
    """
    Manually parse the response content as JSON using string formatting.
    """
    try:
        start_index = response_content.find('{')
        end_index = response_content.rfind('}') + 1
        json_content = response_content[start_index:end_index]
        return json.loads(json_content)
    except Exception as e:
        raise ValueError(f"Failed to parse JSON response: {str(e)}")

def get_job_description_features(job_description):
    """
    Extracts key details from the job description using the Groq API.
    :param job_description: The full text of the job description.
    :return: A dictionary containing extracted skills, qualifications, experience, and other details.
    """
    # Define the system prompt for the Groq model
    system_prompt = (
        r"You are an AI trained to analyze job descriptions. Extract the following details in a structured format:\n"
        r"- Skills/technologies mentioned (e.g., Java, Agile, .NET).\n"
        r"- Educational qualifications (e.g., Bachelor's degree in Computer Science).\n"
        r"- Experience requirements (e.g., 3+ years of software engineering experience).\n"
        r"- Job benefits (e.g., competitive salary, flexible working hours).\n\n"
        r"Provide the output in a structured JSON format with keys: 'skills', 'qualifications', 'experience', and 'benefits'.\n\n"
        f"Job Description:\n{job_description}"
    )

    try:
        # Call the Groq API with the prompt
        response = llm.invoke([{"role": "system", "content": system_prompt}])
        # print(response)
        # Extract the response content as text
        response_content = response.content  # Access the content directly

        if not response_content:
            raise ValueError("Empty response content")

        # Manually parse the response content as JSON
        extracted_features = parse_json_response(response_content)

        return {"extracted_features": extracted_features, "raw_output": response_content}

    except Exception as e:
        raise RuntimeError(f"Error occurred while processing job description: {str(e)}")


@jd_resume.route('/extract_jd_features', methods=['POST'])
def extract_jd_features():
    """
    API endpoint to extract features from a job description.
    """
    job_description = request.json.get('job_description')
    if not job_description:
        return jsonify({"error": "Job description is required."}), 400

    try:
        # Extract job description features
        job_description_features = get_job_description_features(job_description)
        return jsonify(job_description_features), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while extracting the job description features: {e}"}), 500
    
def get_resume_details(resume_text):
    """
    Extracts key details from the resume using the Groq API.
    :param resume_text: The full text of the resume.
    :return: A dictionary containing extracted skills, qualifications, experience, and other details.
    """
    # Define the system prompt for the Groq model
    system_prompt = (
        r"You are an AI trained to analyze resumes. Extract the following details in a structured format:\n"
        r"- Skills/technologies mentioned (e.g., Java, Agile, .NET).\n"
        r"- Educational qualifications (e.g., Bachelor's degree in Computer Science).\n"
        r"- Experience details (e.g., 3+ years of software engineering experience).\n"
        r"- Personal details (e.g., name, contact information).\n\n"
        r"Provide the output in a structured JSON format with keys: 'skills', 'qualifications', 'experience', and 'personal_details'.\n\n"
        f"Resume Text:\n{resume_text}"
    )

    try:
        # Call the Groq API with the prompt
        response = llm.invoke([{"role": "system", "content": system_prompt}])
        # print(response)
        # Extract the response content as text
        response_content = response.content  # Access the content directly

        if not response_content:
            raise ValueError("Empty response content")

        # Manually parse the response content as JSON
        extracted_details = parse_json_response(response_content)

        return {"extracted_details": extracted_details, "raw_output": response_content}

    except Exception as e:
        raise RuntimeError(f"Error occurred while processing resume: {str(e)}")

@jd_resume.route('/extract_resume_details', methods=['POST'])
def extract_resume_details():
    """
    API endpoint to extract details from a resume.
    """
    if 'resume_file' not in request.files:
        return jsonify({"error": "Resume file is required."}), 400

    resume_file = request.files['resume_file']

    try:
        pdf_reader = PyPDF2.PdfReader(resume_file)
        resume_text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            resume_text += page.extract_text()

        # Extract resume details
        resume_details = get_resume_details(resume_text)
        return jsonify(resume_details), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while extracting the resume details: {e}"}), 500

def get_score_with_jd(resume_details, job_description_features):
    """
    Calculates how well the resume matches the job description.
    :param resume_details: Extracted features from the resume.
    :param job_description_features: Extracted features from the job description.
    :return: A dictionary containing the score and matching details.
    """
    # Define the system prompt for the Groq model
    system_prompt = (
        r"You are an AI trained to compare resumes and job descriptions. Based on the following:\n"
        r"- Skills/technologies.\n"
        r"- Educational qualifications.\n"
        r"- Experience requirements.\n\n"
        r"Evaluate how well the resume matches the job description and provide:\n"
        r"- A matching score out of 100.\n"
        r"- A summary of alignment between the resume and the job description.\n\n"
        f"Resume Details:\n{json.dumps(resume_details)}\n\n"
        f"Job Description Details:\n{json.dumps(job_description_features)}\n"
        r"Provide the response in JSON format."
    )

    try:
        # Call the Groq API with the prompt
        response = llm.invoke([{"role": "system", "content": system_prompt}])
        # print(response)
        # Extract the response content as text
        response_content = response.content if hasattr(response, 'content') else response
        # print("Groq API Response for Scoring:", response_content)

        if not response_content:
            raise ValueError("Empty response from Groq API.")

        # Manually parse the response content as JSON
        response_json = parse_json_response(response_content)

        return {
            "score": response_json.get("matching_score", 0),
            "summary": response_json.get("summary", "No summary provided."),
        }

    except Exception as e:
        raise RuntimeError(f"Error occurred while scoring the resume with JD: {str(e)}")

def get_score_without_jd(resume_details):
    """
    Calculates the ATS score of the resume based on formatting, use of action words, and general content.
    :param resume_details: Extracted features from the resume.
    :return: A dictionary containing the ATS score and suggestions.
    """
    # Define the system prompt for the Groq model
    system_prompt = (
        r"You are an AI trained to evaluate resumes for ATS (Applicant Tracking Systems). Based on the following criteria:\n"
        r"- Use of action words.\n"
        r"- Proper formatting (consistent fonts, spacing, etc.).\n"
        r"- Inclusion of relevant skills, qualifications, and experience.\n"
        r"- Conciseness and readability.\n"
        r"- Use of keywords.\n\n"
        r"Evaluate the resume and provide:\n"
        r"- An ATS score out of 100.\n"
        r"- Suggestions for improving the resume.\n\n"
        f"Resume Text:\n{json.dumps(resume_details)}\n"
        r"Provide the response in JSON format."
    )

    try:
        # Call the Groq API with the prompt
        response = llm.invoke([{"role": "system", "content": system_prompt}])
        # print(response)
        # Extract the response content as text
        response_content = response.content if hasattr(response, 'content') else response

        if not response_content:
            raise ValueError("Empty response from Groq API.")

        # Manually parse the response content as JSON
        response_json = parse_json_response(response_content)

        return {
            "ATS Score": response_json.get("ATS Score", 0),
            "Suggestions": response_json.get("Suggestions", "No suggestions provided."),
        }

    except Exception as e:
        raise RuntimeError(f"Error occurred while calculating the ATS score: {str(e)}")


@jd_resume.route('/check-resume', methods=['POST'])
def check_resume():
    """
    Endpoint to evaluate a resume with or without a job description.
    """
    resume = request.files.get('resume')
    job_description = request.form.get('job_description')

    if not resume:
        return jsonify({"error": "Resume file is required."}), 400

    try:
        pdf_reader = PyPDF2.PdfReader(resume)
        resume_text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            resume_text += page.extract_text()

        if not resume_text.strip():
            return jsonify({"error": "The extracted resume text is empty."}), 400

        if not job_description:
            response_score = get_score_without_jd(resume_text)
            return jsonify(response_score), 200
        else:
            resume_details = get_resume_details(resume_text)
            job_description_features = get_job_description_features(job_description)
            response_score = get_score_with_jd(resume_details, job_description_features)
            return jsonify(response_score), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while processing the resume and job description: {e}"}), 500
