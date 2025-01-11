from flask import Blueprint, request, jsonify
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Gemma2-9b-It")

jd_resume = Blueprint('jd_resume', __name__)

def get_job_description_features(job_description):
    """
    Extracts key details from the job description using the Groq API.
    :param job_description: The full text of the job description.
    :return: A dictionary containing extracted skills, qualifications, experience, and other details.
    """
    # Define the system prompt for the Groq model
    system_prompt = (
        "You are an AI trained to analyze job descriptions. Extract the following details in a structured format:\n"
        "- Skills/technologies mentioned (e.g., Java, Agile, .NET).\n"
        "- Educational qualifications (e.g., Bachelor's degree in Computer Science).\n"
        "- Experience requirements (e.g., 3+ years of software engineering experience).\n"
        "- Job benefits (e.g., competitive salary, flexible working hours).\n\n"
        "Provide the output in a structured JSON format with keys: 'skills', 'qualifications', 'experience', and 'benefits'.\n\n"
        f"Job Description:\n{job_description}"
    )

    try:
        # Call the Groq API with the prompt
        response = llm.invoke([{"role": "system", "content": system_prompt}])

        # Extract the response content as text
        response_content = response.content  # Access the content directly

        # Parse the response_content as JSON if the response is structured
        # If the response is plain text, you'll need to parse it based on its format
        extracted_features = eval(response_content)  # Convert string to Python dictionary safely
        return {"extracted_features": extracted_features, "raw_output": response_content}

    except Exception as e:
        raise RuntimeError(f"Error occurred while processing job description: {str(e)}")


@jd_resume.route('/extract_jd_features', methods=['POST'])
def checkpoint():
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
