from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from studios import *

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class ProductModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_studio = db.Column(db.Integer, db.ForeignKey(StudioModel.id))
    album = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    desc = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False) #todo
    amount = db.Column(db.Integer, nullable=False) #todo
    item_path = db.Column(db.String(80), default="/")

    def __repr__(self):
        return f"yes"

productFields = {
    "id":fields.Integer,
    "id_studio":fields.Integer,
    "album":fields.String,
    "artist":fields.String,
    "desc": fields.String,
    "price":fields.Float,
    "amount":fields.Integer,
    "item_path":fields.String,
}

product_args = reqparse.RequestParser()
product_args.add_argument("id_studio", required=True, help="Studio id cannot be blank")
product_args.add_argument("album", type=str, required=True, help="Name cannot be blank")
product_args.add_argument("artist", type=str, required=True, help="Studio description")
product_args.add_argument("desc", type=str, required=True, help="Studio description")
product_args.add_argument("price", type=str, required=True, help="Studio description")
product_args.add_argument("amount", type=int, required=True, help="Studio description")

class Products(Resource):
    @marshal_with(productFields)
    def get(self):
        Products = ProductModel.query.all()
        return Products
    
    @marshal_with(productFields)
    def post(self):
        args = product_args.parse_args()
        product = ProductModel(id_studio=args["id_studio"], album=args["album"], artist=args["artist"],desc=args["desc"],price=args["price"],amount=args["amount"])
        db.session.add(product)
        db.session.commit()
        Products = ProductModel.query.all()
        return Products, 201

class Product(Resource):
    @marshal_with(productFields)

    def get(self, id):
        product = ProductModel.query.filter_by(id=id).first()
        if not product:
            abort(404, "User not found")
        return product
    
    @marshal_with(productFields)
    def patch(self, id):
        args = product_args.parse_args()
        product = ProductModel.query.filter_by(id=id).first()
        if not product:
            abort(404, "User not found")
        product.id_studio = args["id_studio"]
        product.album = args["name"]
        product.artist = args["artist"]
        product.desc = args["desc"]
        product.price = args["price"]
        product.amount = args["amount"]
        db.session.commit()
        return product
    
    @marshal_with(productFields)
    def delete(self, id):
        product = ProductModel.query.filter_by(id=id).first()
        if not product:
            abort(404, "User not found")
        db.session.delete(product)
        db.session.commit()
        Products = ProductModel.query.all()
        return Products, 204