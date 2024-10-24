from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
import base64
import os
#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    surname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
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
user_args.add_argument("email", type=str, required=True, help="Email cannot be blank")
user_args.add_argument("password", type=str, required=True, help="Password cannot be blank")
user_args.add_argument("credits", type=float, help="Password cannot be blank")
user_args.add_argument("avatar_dir", type=str, required=False, help="Dir")
user_args.add_argument("is_admin", type=str, required=False, help="isAdmin? True/False")

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = UserModel.query.all()
        for user in users:
            if os.path.exists(UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"):
                image_path = UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"
                with open(image_path, "rb") as image_file:
                    data = base64.b64encode(image_file.read()).decode('ascii')
                user.avatar_dir = data   
        return users
    
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        user = UserModel(username=args["username"], email=args["email"], name=args["name"], surname=args["surname"], password=args["password"], is_admin=args["is_admin"])
        db.session.add(user)
        db.session.commit()
        users = UserModel.query.all()
        return users

class User(Resource):
    @marshal_with(userFields)


    def get(self, id):  
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, "User not found")  
        if os.path.exists(UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"):
            image_path = UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"
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
        user.username = args["username"]
        user.email = args["email"]
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

class UserCall(Resource):
    @marshal_with(userFields)

    def get(self, username, password):
        user = UserModel.query.filter_by(username=username, password=password).first()
        if not user:
            print("user not found")
            return user, 404
        if os.path.exists(UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"):
            image_path = UPLOAD_FOLDER + "/avatars/" + str(user.id) + ".jpg"
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            user.avatar_dir = data
        return user
    
class ProductByUser(Resource):
    pass
#     @marshal_with(userFields)

#     # def get(self, id):
#     #     transaction = TransactionModel.query.filter_by(id_user = id).first()
#     #     if not user:
#     #         print("user not found")
#     #         return user, 404
#     #     return user