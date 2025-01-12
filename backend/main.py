from flask import Flask
from jd_resume import jd_resume
from career_advisor import career_advisor
from groclake_RAG import groclake_RAG

app = Flask(__name__)


app.register_blueprint(jd_resume, url_prefix='/jd-resume')
app.register_blueprint(career_advisor, url_prefix='/career-advisor')
app.register_blueprint(groclake_RAG, url_prefix='/groclake-RAG')

if __name__ == '__main__':
    app.run(debug=True) 