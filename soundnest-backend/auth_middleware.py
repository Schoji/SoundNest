from flask import request, jsonify
from functools import wraps
import jwt
from app_def import app
from datetime import timedelta, datetime
from users import *
def token_required(func):
   @wraps(func)
   def wrapper(*args, **kwargs):
      token = request.headers.get("Authorization")
      if not token:
         return "Token is missing", 401
      try:
         data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
         expiresIn = datetime.strptime(data["expiresIn"], '%Y-%m-%d %H:%M:%S')
         if datetime.now() > expiresIn:
            return "Token is expired", 401
         if not UserModel.query.filter_by(id = data["user_id"]).first():
            return "User is invalid", 401
         return jsonify(UserModel.query.filter_by(id = data["user_id"]))
      except jwt.exceptions.InvalidSignatureError as e:
         print(e)

   return wrapper