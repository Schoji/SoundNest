from users import *
from studios import *
from product import *
from transaction import *
from track import *
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

api.add_resource(Users, "/api/users/")
api.add_resource(User, "/api/users/<int:id>")
api.add_resource(UserAuthentication, "/api/users/<string:username>/<string:password>")
api.add_resource(Studios, "/api/studios/")
api.add_resource(Studio, "/api/studios/<int:id>")
api.add_resource(Products, "/api/products/")
api.add_resource(Product, "/api/product/<int:id>")
api.add_resource(Transactions, "/api/transactions/")
api.add_resource(Transaction, "/api/transaction/<int:id>")
api.add_resource(Tracks, "/api/tracks/")
api.add_resource(Track, "/api/tracks/<int:id>")
api.add_resource(ProductTracks, "/api/producttracks/<int:id_product>")
api.add_resource(UserProducts, "/api/userproducts/<int:id_user>/")
api.add_resource(UserTransactions, "/api/usertransactions/<int:id_user>/")

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