from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from flask_cors import CORS
import secrets
import jwt

DATABASES = ["sqllite", "mysql", "postgresql"]
DATABASE = "sqllite"
ALLOWED_EXTENSIONS = set(["jpg", "png", "jpeg"])
UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "Uploads/"))


def allowedFile(filename):
    if '.' in filename:
        if filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            return True
    return False 

app = Flask(__name__)

app.config["SECRET_KEY"] = "VerySecure@@@@"

CORS(app, resources={r"/api/*": {"origins" : "*"}})
if (DATABASE == "sqllite"):
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
elif (DATABASE == "mysql"):
    DB_USER = "root"
    DB_PASSWORD = ""
    DB_NAME = "soundnest"
    app.config["SQLALCHEMY_DATABASE_URI"] = f'mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@localhost:3306/{DB_NAME}'
else:
    DB_USER = "postgres"
    DB_PASSWORD = ""
    DB_NAME = "soundnest"
    app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@localhost:5432/{DB_NAME}'

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 500 * 1000 * 100 #50MB
app.config['CORS_HEADERS'] = 'application/json'

db = SQLAlchemy(app)
api = Api(app)

if __name__ == "__main__":
   db.create_all()