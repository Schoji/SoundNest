from users import *
from studios import *
from product import *
from transaction import *
from track import *
from productTags import *
from tags import *
from trade_offer import *
from flask import request, jsonify
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
      search_str = search_str.rstrip()
      products = ProductModel.query.filter(ProductModel.album.like("%" + search_str + "%")).all()
      studios = StudioModel.query.filter(StudioModel.name.like("%" + search_str + "%")).all()
      tracks = TrackModel.query.filter(TrackModel.name.like("%" + search_str + "%")).all()
      
      response = []
      search_id = 0
      for product in products:
         image_path = UPLOAD_FOLDER + "/products/" + product.item_path
         with open(image_path, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('ascii')
         dataset = { 
            "id" : search_id,
            "result_id" : product.id,
            "result_name" : product.album,
            "result_pic" : data,
            "type": "product"
         }
         search_id += 1
         response.append(dataset)
      
      for studio in studios:
         data = "/"
         image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
         with open(image_path, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('ascii')
         dataset = { 
            "id" : search_id,
            "result_id" : studio.id,
            "result_name" : studio.name,
            "result_pic" : data,
            "type": "studio"
         }
         search_id += 1
         response.append(dataset)

      for track in tracks:
         data = "/"
         product = ProductModel.query.filter_by(id = track.id_product).first()
         image_path = UPLOAD_FOLDER + "/products/" + product.item_path
         with open(image_path, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('ascii')
         dataset = { 
            "id" : search_id,
            "result_id" : track.id,
            "result_name" : track.name,
            "result_pic" : data,
            "type": "track"
         }
         search_id += 1
         response.append(dataset)


      return response

class UserStudios(Resource):
   @marshal_with(studioFields)
   def get(self, id_user):
      studios = StudioModel.query.filter_by(id_user = id_user).all()

      for studio in studios:
         if studio.studio_dir != "/":
            image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
            with open(image_path, "rb") as image_file:
                  data = base64.b64encode(image_file.read()).decode('ascii')
            studio.studio_dir = data

      if not studios:
         return 404, "User has no studios."
         
      return studios
   
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

#My masterpiece
#this function returns other product that are similiar based on tags (id_product).
class getOtherProducts(Resource):
   @marshal_with(productFields)
   def get(self, id_product, limit):
      tag_dict = {}
      every_tags = ProductTagsModel.query.all()
      for x in every_tags:
         if not(x.id_product in tag_dict.keys()):
            tag_dict[x.id_product] = [x.id_tag]
         else:
            tag_dict[x.id_product].append(x.id_tag)
      root_tags = tag_dict[int(id_product)]
      tag_dict.pop(id_product)
      similarity = {}
      for product_id in tag_dict:
         similiar_counter = 0
         for tag in tag_dict[product_id]:
            if tag in root_tags:
               similiar_counter += 1
         similarity[product_id] = similiar_counter
      similarity = sorted(similarity, key=similarity.get, reverse=True)
      dataset = []
      for i in range(limit):
         product = ProductModel.query.filter_by(id=similarity[i]).first()
         if product.item_path != "/":
            image_path = UPLOAD_FOLDER + "/products/" + product.item_path
            with open(image_path, "rb") as image_file:
                  data = base64.b64encode(image_file.read()).decode('ascii')
            product.item_path = data
         dataset.append(product)
      return dataset

class getStudiosProducts(Resource):
   @marshal_with(productFields)
   def get(self, id_studio):
      products = ProductModel.query.filter_by(id_studio = id_studio).all()

      for product in products:
         if product.item_path != "/":
            image_path = UPLOAD_FOLDER + "/products/" + product.item_path
            with open(image_path, "rb") as image_file:
                  data = base64.b64encode(image_file.read()).decode('ascii')
            product.item_path = data
      
      return products

class getOtherStudios(Resource):
   @marshal_with(studioFields)
   def get(self, id_studio):
      studios = StudioModel.query.all()

      for studio in studios:
            if studio.id == id_studio:
               studios.remove(studio)
            if studio.studio_dir != "/":
                image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
                with open(image_path, "rb") as image_file:
                    data = base64.b64encode(image_file.read()).decode('ascii')
                studio.studio_dir = data   
      
      return studios

class getStudioWithUser(Resource):
   def get(self, id_studio):
      studio = StudioModel.query.filter_by(id = id_studio).first()
      user = UserModel.query.filter_by(id = studio.id_user).first()

      if studio.studio_dir != "/":
         image_path = UPLOAD_FOLDER + "/studios/" + studio.studio_dir
         with open(image_path, "rb") as image_file:
               data = base64.b64encode(image_file.read()).decode('ascii')
         studio.studio_dir = data
      
      if user.avatar_dir != "/":
         image_path = UPLOAD_FOLDER + "/avatars/" + user.avatar_dir
         with open(image_path, "rb") as image_file:
            data = base64.b64encode(image_file.read()).decode('ascii')
         user.avatar_dir = data   

      dataset = {
         "id" : studio.id,
         "id_user" : studio.id_user,
         "name": studio.name,
         "desc": studio.desc,
         "studio_dir": studio.studio_dir,
         "user_name" : user.name,
         "user_surname" : user.surname,
         "user_picture" : user.avatar_dir
      }
      return dataset

api.add_resource(Users, "/api/users/")
api.add_resource(User, "/api/users/<int:id>")
api.add_resource(UserAuthentication, "/api/users/<string:username>/<string:password>")
api.add_resource(Studios, "/api/studios/")
api.add_resource(Studio, "/api/studios/<int:id>")
api.add_resource(getStudiosProducts, "/api/studios_products/<int:id_studio>")
api.add_resource(getOtherStudios, "/api/other_studios/<int:id_studio>")
api.add_resource(getStudioWithUser, "/api/studio_with_user/<int:id_studio>")
api.add_resource(Products, "/api/products/")
api.add_resource(Product, "/api/product/<int:id>")
api.add_resource(ProductsWithTags, "/api/products_with_tags/")
api.add_resource(ProductWithTags, "/api/products_with_tags/<int:id>")
api.add_resource(getOtherProducts, "/api/other_products/<int:id_product>/<int:limit>")
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
api.add_resource(TradeOffers, "/api/trade_offers/")
api.add_resource(TradeOffer, "/api/trade_offers/<int:id>/")
api.add_resource(getTradeToken, "/api/trade_token/")
api.add_resource(getUserTradeoffers, "/api/user_tradeoffers/<int:id_user>/")
api.add_resource(ExchangeProducts, "/api/exchange_products/<string:trade_id>/")

@app.route("/last_update")
def last_update():
   contents = ""
   try:
      file = open("last_update.txt", "r")
      contents = file.read()
      file.close()
   except:
      print("No file")
   
   return contents

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