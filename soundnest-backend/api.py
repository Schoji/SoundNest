from users import *
from studios import *
from product import *
from transaction import *
from flask import request, jsonify
import werkzeug
from PIL import Image
#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class UploadProduct(Resource):
   def post(self):
     parse = reqparse.RequestParser()
     parse.add_argument("id", type=int, required=True, help="ID", location="form")
     parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
     args = parse.parse_args()
     Product_file = args['file']
     id = args["id"]
     if ProductModel.query.filter_by(id=id):
        print("Product exists, saving")
        img = Image.open(Product_file)
        basewidth = 300
        wpercent = (basewidth / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((basewidth, hsize))
        product_path = UPLOAD_FOLDER + "/products/" + str(id) + ".jpg"
        img.save(product_path)
        product = ProductModel.query.filter_by(id=id).first()
        product.item_path = product_path
        db.session.commit()

     else:
        print("User not found")


class UploadStudio(Resource):
   def post(self):
     parse = reqparse.RequestParser()
     parse.add_argument("id", type=int, required=True, help="ID", location="form")
     parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
     args = parse.parse_args()
     Avatar_file = args['file']
     id = args["id"]
     if StudioModel.query.filter_by(id=id):
        print("Studio exists, saving")
        img = Image.open(Avatar_file)
        basewidth = 300
        wpercent = (basewidth / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((basewidth, hsize))
        studio_path = UPLOAD_FOLDER + "/studios/" + str(id) + ".jpg"
        img.save(studio_path)
        studio = StudioModel.query.filter_by(id=id).first()
        studio.studio_dir = studio_path
        db.session.commit()

     else:
        print("User not found")

class UploadAvatar(Resource):
   def post(self):
     parse = reqparse.RequestParser()
     parse.add_argument("id", type=int, required=True, help="ID", location="form")
     parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
     args = parse.parse_args()
     Avatar_file = args['file']
     id = args["id"]
     if UserModel.query.filter_by(id=id):
        print("User exists, saving")
        img = Image.open(Avatar_file)
        basewidth = 300
        wpercent = (basewidth / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((basewidth, hsize))
        avatar_path = UPLOAD_FOLDER + "/avatars/" + str(id) + ".jpg"
        img.save(avatar_path)
        user = UserModel.query.filter_by(id=id).first()
        user.avatar_dir = avatar_path
        db.session.commit()

     else:
        print("User not found")

   
class ProductByUser(Resource):
   def get(self, id_user):
      transactions = TransactionModel.query.filter_by(id_user = id_user).all()
      products = []
      for item in transactions:
         product = ProductModel.query.filter_by(id = item.id_product).first()
         product_dict = {
            "id" : product.id,
            "id_studio" : product.id_studio,
            "album" : product.album,
            "artist" : product.artist,
            "desc" : product.desc,
            "price" : product.price,
            "amount" : product.amount,
            "item_path" : product.item_path
         }
         products.append(product_dict)
         # print(products)
      print(products)
      return products

api.add_resource(UploadAvatar, "/api/upload_avatar")
api.add_resource(UploadStudio, "/api/upload_studio")
api.add_resource(UploadProduct, "/api/upload_product")
api.add_resource(Users, "/api/users/")
api.add_resource(User, "/api/users/<int:id>")
api.add_resource(UserCall, "/api/users/<string:username>/<string:password>")
api.add_resource(Studios, "/api/studios/")
api.add_resource(Studio, "/api/studios/<int:id>")
api.add_resource(Products, "/api/products/")
api.add_resource(Product, "/api/product/<int:id>")
api.add_resource(Transactions, "/api/transactions/")
api.add_resource(Transaction, "/api/transaction/<int:id>")
api.add_resource(ProductByUser, "/api/userproducts/<int:id_user>/")
# api.add_resource(Transaction, "/api/transaction/<int:id>/<int:id_user>") // MOŻNA COŚ TAKIEGO ZROBIĆ!!!!!!!!

@app.route("/")
def home():
    all_users = UserModel.query.all()
    print(all_users)
    return "<h1>XDD</h1>"

# @app.route("/upload_avatar", methods=["POST"])
# def upload():
#     if request.method == "POST":
#         if "file" not in request.files:
#             return 400
#         file = request.files["file"]
#         if file.filename == "":
#             return 400
#         if file and allowedFile(file.filename):
#             file.save(UPLOAD_FOLDER + "/" + file.filename + ".jpg")
#             return 201
#     return 400

if __name__ == "__main__":
    app.run(debug=True)