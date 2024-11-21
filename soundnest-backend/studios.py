from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from users import *
from io import BytesIO
import base64
from PIL import Image
import img_resize
from sqlalchemy import desc
#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class StudioModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    name = db.Column(db.String(80), nullable=False)
    desc = db.Column(db.String(80)) #todo
    studio_dir = db.Column(db.Text, default="/")

    def __repr__(self):
        return f"User(Studio name = {self.name}, user_id={self.id_user})"

studioFields = {
    "id":fields.Integer,
    "id_user":fields.String,
    "name":fields.String,
    "desc":fields.String,
    "studio_dir":fields.String,
}

studio_args = reqparse.RequestParser()
studio_args.add_argument("id_user", required=False, help="User id cannot be blank")
studio_args.add_argument("name", type=str, required=True, help="Name cannot be blank")
studio_args.add_argument("desc", type=str, required=False, help="Studio description")
studio_args.add_argument("studio_dir", type=str, required=False, help="IMAGE")

class Studios(Resource):
    @marshal_with(studioFields)
    def get(self):
        Studios = StudioModel.query.all()
        for studio in Studios:
            if studio.studio_dir != "/":
                image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
                with open(image_path, "rb") as image_file:
                    data = base64.b64encode(image_file.read()).decode('ascii')
                studio.studio_dir = data   
        return Studios
    
    @marshal_with(studioFields)
    def post(self):
        args = studio_args.parse_args()
        studio = StudioModel(id_user=args["id_user"], name=args["name"], desc=args["desc"])
        if args["studio_dir"]:
            file = args["studio_dir"]
            file = file.split(",")[1]
            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            last_studio = StudioModel.query.order_by(desc("id")).first()
            studio_path = UPLOAD_FOLDER + "/studios/" + str(int(last_studio.id) + 1) + ".jpg"
            img.save(studio_path)
            studio.studio_dir = str(last_studio.id + 1) + ".jpg"
        db.session.add(studio)
        db.session.commit()
        return studio

class Studio(Resource):
    @marshal_with(studioFields)

    def get(self, id):
        studio = StudioModel.query.filter_by(id=id).first()
        if not studio:
            print("user not found")
            return studio, 404
        if studio.studio_dir != "/":
            image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            studio.studio_dir = data
        return studio
    
    @marshal_with(studioFields)
    def patch(self, id):
        args = studio_args.parse_args()
        studio = StudioModel.query.filter_by(id=id).first()
        if not studio:
            return 404, "Studio not found in database."
        if args["studio_dir"]:
            file = args["studio_dir"]
            file = file.split(",")[1]

            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            studio_path = UPLOAD_FOLDER + "/studios/" + str(id) + ".jpg"
            img.save(studio_path)
            studio.studio_dir = str(id) + ".jpg"
        studio.name = args["name"]
        studio.desc = args["desc"]
        db.session.commit()
        return studio
    
    @marshal_with(studioFields)
    def delete(self, id):
        studio = StudioModel.query.filter_by(id=id).first()
        if not studio:
            abort(404, "Studio was not found in database.")
        db.session.delete(studio)
        db.session.commit()
        return 204, "Studio was deleted succesfully."