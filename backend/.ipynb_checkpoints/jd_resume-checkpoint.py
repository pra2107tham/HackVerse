from flask import Blueprint, request, jsonify, render_template
from sentence_transformers import SentenceTransformer, util
import spacy
import docx
import PyPDF2

# Initialize blueprint and models
jd_resume = Blueprint('jd_resume', __name__)
nlp = spacy.load("en_core_web_sm")  # For extracting essential parts
model = SentenceTransformer('all-MiniLM-L6-v2')  # Use an efficient model

# Function to read text from resume file
def extract_text(file):
    if file.filename.endswith('.pdf'):
        pdf_reader = PyPDF2.PdfReader(file)
        text = " ".join([page.extract_text() for page in pdf_reader.pages])
    elif file.filename.endswith('.docx'):
        doc = docx.Document(file)
        text = " ".join([para.text for para in doc.paragraphs])
    else:
        text = file.read().decode('utf-8')
    return text

# Extract essential parts using spaCy
def extract_essentials(text, is_job_description=False):
    doc = nlp(text)
    essentials = {
        "skills": [],
        "qualifications": [],
        "experience": [],
    }
    
    for ent in doc.ents:
        if ent.label_ in ["SKILL", "QUALIFICATION"]:  # Extract skills and qualifications
            essentials["skills"].append(ent.text.lower())
        elif is_job_description and ent.label_ == "EXPERIENCE":
            essentials["experience"].append(ent.text)
    
    return essentials

# Compare extracted features
def compare_features(resume_features, job_features):
    # Compute overlap in skills
    resume_skills = set(resume_features["skills"])
    job_skills = set(job_features["skills"])
    skill_match = len(resume_skills & job_skills) / max(1, len(job_skills))

    # Compute similarity using embeddings
    job_text = " ".join(job_features["skills"] + job_features["experience"])
    resume_text = " ".join(resume_features["skills"] + resume_features["experience"])
    job_embedding = model.encode(job_text, convert_to_tensor=True)
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    similarity = util.cos_sim(resume_embedding, job_embedding).item()

    return {
        "skill_match": round(skill_match * 100, 2),
        "semantic_similarity": round(similarity * 100, 2)
    }

@jd_resume.route('/check-resume', methods=['POST'])
def check_resume():
    resume_file = request.files.get('resume')  # Get file from the request
    job_description = request.form.get('job_description', None)

    if not resume_file:
        return jsonify({"error": "No resume file uploaded"}), 400

    if not job_description:
        return jsonify({"error": "No job description provided"}), 400

    try:
        resume_text = extract_text(resume_file)

        # Extract essential parts
        resume_features = extract_essentials(resume_text)
        job_features = extract_essentials(job_description, is_job_description=True)

        # Compare features and calculate scores
        comparison = compare_features(resume_features, job_features)
        feedback = {
            "Skill Match (%)": comparison["skill_match"],
            "Semantic Similarity (%)": comparison["semantic_similarity"],
            "Suggestions": "Consider including more relevant skills from the job description."
        }
        return jsonify(feedback)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
