from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from studios import *
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

class ProductModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_studio = db.Column(db.Integer, db.ForeignKey(StudioModel.id))
    album = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(80), nullable=False)
    desc = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Float, nullable=False) #todo
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
    "item_path":fields.String,
}

product_args = reqparse.RequestParser()
product_args.add_argument("id_studio", required=True, help="Studio id cannot be blank")
product_args.add_argument("album", type=str, required=True, help="Name cannot be blank")
product_args.add_argument("artist", type=str, required=True, help="Studio description")
product_args.add_argument("desc", type=str, required=True, help="Studio description")
product_args.add_argument("price", type=str, required=True, help="Studio description")
product_args.add_argument("item_path", type=str, required=False, help="Studio description")


class Products(Resource):
    @marshal_with(productFields)
    def get(self):
        products = ProductModel.query.all()
        for product in products:
            if not product:
                return 404, "Product not found in database."

            if product.item_path != "/":
                image_path = UPLOAD_FOLDER + "/products/" + product.item_path
                print("XDDD")
                print(image_path)
                with open(image_path, "rb") as image_file:
                    data = base64.b64encode(image_file.read()).decode('ascii')
                product.item_path = data
        return products
    
    @marshal_with(productFields)
    def post(self):
        args = product_args.parse_args()
        product = ProductModel(id_studio=args["id_studio"], album=args["album"], artist=args["artist"],desc=args["desc"], price=args["price"])
        if [args["item_path"]]:
            file = args["item_path"]
            file = file.split(",")[1]
            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            last_product = ProductModel.query.order_by(desc("id")).first()
            product_path = UPLOAD_FOLDER + "/products/" + str(int(last_product.id) + 1) + ".jpg"
            img.save(product_path)
            product.item_path = str(last_product.id + 1) + ".jpg"
        db.session.add(product)
        db.session.commit()
        Products = ProductModel.query.all()
        return Products, 201

class Product(Resource):
    @marshal_with(productFields)

    def get(self, id):
        product = ProductModel.query.filter_by(id=id).first()
        if not product:
                abort(404, "Product not found")
        if product.item_path != "/":
            image_path = UPLOAD_FOLDER + "/products/" + product.item_path
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            product.item_path = data
        return product
    
    @marshal_with(productFields)
    def patch(self, id):
        args = product_args.parse_args()
        product = ProductModel.query.filter_by(id=id).first()

        if args["file"]:
            file = args["file"]
            file = file.split(",")[1]

            img = Image.open(BytesIO(base64.b64decode(file)))
            img = img_resize.resizeImage(img)
            item_path = UPLOAD_FOLDER + "/products/" + str(id) + ".jpg"
            img.save(item_path)
            product.item_path = str(id) + ".jpg"

        if not product:
            return 404, "Product not found in database."

        product.id_studio = args["id_studio"]
        product.album = args["name"]
        product.artist = args["artist"]
        product.desc = args["desc"]
        product.price = args["price"]
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