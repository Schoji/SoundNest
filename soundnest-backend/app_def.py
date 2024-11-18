from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from flask_cors import CORS

DATABASES = ["sqllite", "mysql", "postgresql"]

ALLOWED_EXTENSIONS = set(["jpg", "png", "jpeg"])
UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "Uploads/"))

def allowedFile(filename):
    if '.' in filename:
        if filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            return True
    return False 

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins" : "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 500 * 1000 * 100 #50MB
app.config['CORS_HEADERS'] = 'application/json'

db = SQLAlchemy(app)
api = Api(app)
