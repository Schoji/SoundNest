from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
import base64
import os
import base64
from io import BytesIO
from PIL import Image
import img_resize
from sqlalchemy import desc
import hashlib

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

def encrypt_string(hash_string):
  sha_signature = \
  hashlib.sha256(hash_string.encode()).hexdigest()
  sha_signature2 = \
  hashlib.sha256(sha_signature.encode()).hexdigest()
  return sha_signature2

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    bio = db.Column(db.String(80))
    prefered_theme = db.Column(db.Integer, default=0) #0 - black, 1 - light
    credits = db.Column(db.Float, default=0)
    avatar_dir = db.Column(db.String(80), default="/") 
    is_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"User(username = {self.username}, email={self.email})"

userFields = {
    "id":fields.Integer,
    "username":fields.String,
    "name":fields.String,
    "bio": fields.String,
    "surname":fields.String,
    "email":fields.String,
    "password":fields.String,
    "prefered_theme":fields.Integer,
    "credits":fields.Float,
    "avatar_dir":fields.String,
    "is_admin":fields.Boolean,
}

user_args = reqparse.RequestParser()
user_args.add_argument("name", type=str, required=True, help="Name cannot be blank")
user_args.add_argument("surname", type=str, required=True, help="Surname cannot be blank")
user_args.add_argument("username", type=str, required=True, help="Username cannot be blank")
user_args.add_argument("bio", type=str, help="Username cannot be blank")
user_args.add_argument("email", type=str, required=True, help="Email cannot be blank")
user_args.add_argument("password", type=str, required=False, help="Password cannot be blank")
user_args.add_argument("credits", type=float, help="Password cannot be blank")
user_args.add_argument("avatar_dir", type=str, required=False, help="Dir")
user_args.add_argument("is_admin", type=str, required=False, help="isAdmin? True/False")

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = UserModel.query.all()
        for user in users:
            if user.avatar_dir != "/":
                image_path = UPLOAD_FOLDER + "/avatars/" + user.avatar_dir
                with open(image_path, "rb") as image_file:
                    data = base64.b64encode(image_file.read()).decode('ascii')
                user.avatar_dir = data   
        return users
    
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        user = UserModel(username=args["username"], email=args["email"], name=args["name"], bio=args["bio"], surname=args["surname"], password=args["password"], is_admin=args["is_admin"])
        if args["avatar_dir"]:
            file = args["avatar_dir"]
            file = file.split(",")[1]

            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            last_id = UserModel.query.order_by(desc("id")).first()
            avatar_dir = UPLOAD_FOLDER + "/avatars/" + str(int(last_id.id) + 1) + ".jpg"
            img.save(avatar_dir)
            user.avatar_dir = str(last_id + 1) + ".jpg"
        db.session.add(user)
        db.session.commit()
        users = UserModel.query.all()
        return users

class User(Resource):
    @marshal_with(userFields)
    def get(self, id):  
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            return 404, "User not found" 
        if user.avatar_dir != "/":
            image_path = UPLOAD_FOLDER + "/avatars/" + user.avatar_dir
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            user.avatar_dir = data      
        return user
    
    @marshal_with(userFields)
    def patch(self, id):
        args = user_args.parse_args()
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, "User not found")

        if args["password"]:
            new_password = encrypt_string(args["password"])
            if user.password != new_password:
                user.password = new_password
        
        if args["avatar_dir"]:
            file = args["avatar_dir"]
            file = file.split(",")[1]

            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            avatar_dir = UPLOAD_FOLDER + "/avatars/" + str(id) + ".jpg"
            img.save(avatar_dir)
            user.avatar_dir = str(id) + ".jpg"
        if args["name"]: 
            user.name = args["name"]
        if args["username"]: 
            user.username = args["username"]
        if args["email"]:      
            user.email = args["email"]
        if args["surname"]:
            user.surname = args["surname"]
        if args["credits"]:
            user.credits = args["credits"]
        if args["bio"]:
            user.bio = args["bio"]
        db.session.commit()
        return user
    
    @marshal_with(userFields)
    def delete(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            return user, 404
        db.session.delete(user)
        db.session.commit()
        return user, 204

#This function checks if user's credentials are matching. If they match, full user information is returned.
class UserAuthentication(Resource):
    @marshal_with(userFields)

    def get(self, username, password):
        user = UserModel.query.filter_by(username=username, password=encrypt_string(password)).first()

        if not user:
            return "User with this password was not found in database.", 404
        
        if user.avatar_dir != "/":
            image_path = UPLOAD_FOLDER + "/avatars/" + user.avatar_dir
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            user.avatar_dir = data
        return user

class ThemeSwitcher(Resource):
    def get(self, id_user):
        user = UserModel.query.filter_by(id=id_user).first()

        if (user.prefered_theme == 0):
            user.prefered_theme = 1
        else:
            user.prefered_theme = 0
        
        db.session.commit()
        return "Theme was changed successfully.", 201

class MakeAdmin(Resource):
    def get(self, id_user):
        user = UserModel.query.filter_by(id=id_user).first()
        user.is_admin = True
        
        db.session.commit()
        return "Admin was added successfully.", 201

    def delete(self, id_user):
        user = UserModel.query.filter_by(id=id_user).first()
        users = UserModel.query.all()
        
        admin_count = 0
        for every_user in users:
            if (every_user.is_admin == True):
                admin_count += 1
        
        if (admin_count < 1):
            return "Error deleting admin. There will be no admins left."
        
        user.is_admin = False
        db.session.commit()
        return "Admin was removed successfully.", 201