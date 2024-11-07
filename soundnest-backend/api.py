from users import *
from studios import *
from product import *
from transaction import *
from track import *
from productTags import *
from tags import *
from flask import request, jsonify
import werkzeug
from PIL import Image
from datetime import datetime

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resources
class UserProducts(Resource):
   def get(self, id_user):
      transactions = TransactionModel.query.filter_by(id_user = id_user).all()
      products = []
      for item in transactions:
         product = ProductModel.query.filter_by(id = item.id_product).first()
         if not product:
                abort(404, "Product not found")
         if os.path.exists(UPLOAD_FOLDER + "/products/" + str(product.id) + ".jpg"):
               image_path = UPLOAD_FOLDER + "/products/" + str(product.id) + ".jpg"
               with open(image_path, "rb") as image_file:
                  data = base64.b64encode(image_file.read()).decode('ascii')
               product.item_path = data
         product_dict = {
            "id" : product.id,
            "id_studio" : product.id_studio,
            "album" : product.album,
            "artist" : product.artist,
            "desc" : product.desc,
            "price" : product.price,
            "item_path" : product.item_path
         }
         products.append(product_dict)
      return products
   
class UserTransactions(Resource):
   def get(self, id_user):
      transactions = TransactionModel.query.filter_by(id_user = id_user)
      response = []
      for item in transactions:
         product = ProductModel.query.filter_by(id = item.id_product).first()
         dataset = { 
             "id" : item.id,
             "date" : (item.date).strftime("%d/%m/%Y, %H:%M:%S"),
             "album" : product.album,
             "artist" : product.artist,
             "price" : product.price
         }
         response.append(dataset)
      return response

class Search(Resource):
   def get(self, search_str):
      products = ProductModel.query.filter(ProductModel.album.like("%" + search_str + "%")).all()
      response = []
      for product in products:
         image_path = UPLOAD_FOLDER + "/products/" + product.item_path
         with open(image_path, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('ascii')
         product.item_path = data
         dataset = { 
            "id" : product.id,
            "album" : product.album,
            "item_path" : data
         }
         response.append(dataset)
      return response

class UserStudios(Resource):
   @marshal_with(studioFields)
   def get(self, id_user):
      studios = StudioModel.query.filter_by(id_user = id_user).all()
      if not studios:
         return 404, "User has no studios."
      return studios

   #  "id":fields.Integer,
   #  "id_studio":fields.Integer,
   #  "album":fields.String,
   #  "artist":fields.String,
   #  "desc": fields.String,
   #  "price":fields.Float,
   #  # "tags": fields.String,
   #  "item_path":fields.String,
class ProductsWithTags(Resource):
   def get(self):
      products = ProductModel.query.all()
      dataset = []
      for product in products:
         tags = ProductTagsModel.query.filter_by(id_product=product.id).all()
         tag_dataset = []
         for tag in tags:
            tag_dataset.append(TagsModel.query.filter_by(id = tag.id_tag).first().tag_name)

         if product.item_path != "/":
            image_path = UPLOAD_FOLDER + "/products/" + product.item_path
            with open(image_path, "rb") as image_file:
                data = base64.b64encode(image_file.read()).decode('ascii')
            product.item_path = data
         
         dataset.append({
            "id" : product.id,
            "id_studio" : product.id_studio,
            "album": product.album,
            "artist": product.artist,
            "desc": product.desc,
            "price":product.price,
            "tags": tag_dataset,
            "item_path": product.item_path,
         })
      return dataset

class ProductWithTags(Resource):
   def get(self, id):
      product = ProductModel.query.filter_by(id = id).first()
      dataset = []
      tags = ProductTagsModel.query.filter_by(id_product=product.id).all()
      tag_dataset = []
      for tag in tags:
         tag_dataset.append(TagsModel.query.filter_by(id = tag.id_tag).first().tag_name)

      if product.item_path != "/":
         image_path = UPLOAD_FOLDER + "/products/" + product.item_path
         with open(image_path, "rb") as image_file:
               data = base64.b64encode(image_file.read()).decode('ascii')
         product.item_path = data
         
      dataset = {
         "id" : product.id,
         "id_studio" : product.id_studio,
         "album": product.album,
         "artist": product.artist,
         "desc": product.desc,
         "price":product.price,
         "tags": tag_dataset,
         "item_path": product.item_path,
      }
      return dataset

api.add_resource(Users, "/api/users/")
api.add_resource(User, "/api/users/<int:id>")
api.add_resource(UserAuthentication, "/api/users/<string:username>/<string:password>")
api.add_resource(Studios, "/api/studios/")
api.add_resource(Studio, "/api/studios/<int:id>")
api.add_resource(Products, "/api/products/")
api.add_resource(Product, "/api/product/<int:id>")
api.add_resource(ProductsWithTags, "/api/products_with_tags/")
api.add_resource(ProductWithTags, "/api/products_with_tags/<int:id>")
api.add_resource(Transactions, "/api/transactions/")
api.add_resource(Transaction, "/api/transaction/<int:id>")
api.add_resource(Tags, "/api/tags/")
api.add_resource(Tag, "/api/tags/<int:id>")
api.add_resource(ProductTags, "/api/producttags/")
api.add_resource(ProductTag, "/api/producttags/<int:id>")
api.add_resource(Tracks, "/api/tracks/")
api.add_resource(Track, "/api/tracks/<int:id>")
api.add_resource(ProductTracks, "/api/producttracks/<int:id_product>")
api.add_resource(UserProducts, "/api/userproducts/<int:id_user>/")
api.add_resource(UserTransactions, "/api/usertransactions/<int:id_user>/")
api.add_resource(UserStudios, "/api/userstudios/<int:id_user>/")
api.add_resource(Search, "/api/search/<string:search_str>/")

@app.route("/")
def home():
   resources = []
   for route in app.url_map.iter_rules():
      resources.append('%s' % route)
   
   response = ""
   for resource in resources:
      response += f'<a href={resource}>{resource}</a><br>'
   return response

if __name__ == "__main__":
    app.run(debug=True)