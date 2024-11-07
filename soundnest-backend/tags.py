from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class TagsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"Hello I'm a tag. My id is {self.id} and my name is {self.tag_name}."

tagFields = {
    "id":fields.Integer,
    "tag_name":fields.String,
}

tag_args = reqparse.RequestParser()
tag_args.add_argument("tag_name", required=True, help="i.e. rock, pop")


class Tags(Resource):
    @marshal_with(tagFields)
    def get(self):
        tags = TagsModel.query.all()
        if not tags:
            return 404, "tag not found in database."

        return tags
    
    @marshal_with(tagFields)
    def post(self):
        args = tag_args.parse_args()
        tag = TagsModel(tag_name = args["tag_name"])
        db.session.add(tag)
        db.session.commit()
        return tag, 201

class Tag(Resource):
    @marshal_with(tagFields)

    def get(self, id):
        tag = TagsModel.query.filter_by(id=id).first()
        if not tag:
            return 404, "Tag not found."
        return tag
    
    @marshal_with(tagFields)
    def patch(self, id):
        args = tag_args.parse_args()
        tag = TagsModel.query.filter_by(id=id).first()

        if not tag:
            return 404, "tag not found in database."

        tag.id_studio = args["tag_name"]
        db.session.commit()
        return tag
    
    @marshal_with(tagFields)
    def delete(self, id):
        tag = TagsModel.query.filter_by(id=id).first()
        if not tag:
            abort(404, "User not found")
        db.session.delete(tag)
        db.session.commit()
        Tags = TagsModel.query.all()
        return Tags, 204