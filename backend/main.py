from flask import Flask
from jd_resume import jd_resume

app = Flask(__name__)

app.register_blueprint(jd_resume, url_prefix='/jd_resume')

if __name__ == '__main__':
    app.run(debug=True) 