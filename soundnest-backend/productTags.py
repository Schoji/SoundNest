from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from tags import *
from product import *
#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class ProductTagsModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_product = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    id_tag = db.Column(db.Integer, db.ForeignKey(TagsModel.id))

    def __repr__(self):
        return f"<ProductTagsModel {self.id_product},{self.id_tag}."

ProductTagsFields = {
    "id_product":fields.String,
    "id_tag":fields.String,
}

ProductTags_args = reqparse.RequestParser()
ProductTags_args.add_argument("id_product", required=True, help="i2332")
ProductTags_args.add_argument("id_tag", required=True, help="i.e. rock, pop")


class ProductTags(Resource):
    @marshal_with(ProductTagsFields)
    def get(self):
        ProductTags = ProductTagsModel.query.all()
        if not ProductTags:
            return 404, "tag not found in database."

        return ProductTags
    
    @marshal_with(ProductTagsFields)
    def post(self):
        args = ProductTags_args.parse_args()
        tag = ProductTagsModel(id_product = args["id_product"], id_tag = args["id_tag"])
        db.session.add(tag)
        db.session.commit()
        return tag, 201

class ProductTag(Resource):
    @marshal_with(ProductTagsFields)

    def get(self, id):
        tag = ProductTagsModel.query.filter_by(id=id).first()
        if not tag:
            return 404, "Tag not found."
        return tag
    
    @marshal_with(ProductTagsFields)
    def patch(self, id):
        args = ProductTags_args.parse_args()
        tag = ProductTagsModel.query.filter_by(id=id).first()

        if not tag:
            return 404, "tag not found in database."

        tag.id_studio = args["tag_name"]
        db.session.commit()
        return tag
    
    @marshal_with(ProductTagsFields)
    def delete(self, id):
        tag = ProductTagsModel.query.filter_by(id=id).first()
        if not tag:
            abort(404, "User not found")
        db.session.delete(tag)
        db.session.commit()
        ProductTags = ProductTagsModel.query.all()
        return ProductTags, 204