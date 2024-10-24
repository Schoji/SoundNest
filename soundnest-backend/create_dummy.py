from api import app, db
from users import *
from studios import *
from product import *
from transaction import *

users = {
  "username": ["johndoe123", "janesmith456", "mikebrown789", "emilyjones321", "davidclark654"],
  "email": ["johndoe@example.com", "janesmith@example.com", "mikebrown@example.com", "emilyjones@example.com", "davidclark@example.com"],
  "name": ["John", "Jane", "Mike", "Emily", "David"],
  "surname": ["Doe", "Smith", "Brown", "Jones", "Clark"],
  "password": ["P@ssw0rd123", "S3cur3P@ss", "Br0wnM1k3!", "EmilyJ0nes#", "D@v1dC!ark"],
  "credits": [50.0, 20.0, 10.0, 0.0, 35.0],
  "is_admin": [True, False, False, False, False]
}

studios = {
  "id_user": [1, 2, 3, 4, 5],
  "name": ["Sunset Productions", "Pixel Perfect", "Blue Wave Studios", "Golden Reel Films", "Crimson Lens"],
  "desc": [
    "A creative studio specializing in short films and documentaries.",
    "Graphic design and animation studio with a focus on modern visuals.",
    "Produces stunning visual content for commercials and web series.",
    "Film production company known for award-winning indie movies.",
    "Photography and videography studio offering custom shoots."
  ]
}

products = {
  "id_studio": [1, 2, 3, 4, 5],
  "album": ["Echoes of Time", "Digital Dreams", "Oceanic Vibes", "Golden Horizon", "Crimson Soundscape"],
  "artist": ["The Timekeepers", "Synthwave Stars", "Aqua Flow", "The Golden Crew", "Crimson Beats"],
  "desc": [
    "A nostalgic journey through time with mellow, electronic beats.",
    "Futuristic soundscapes blending synths and electronic rhythms.",
    "Relaxing ocean-themed tracks inspired by nature and the sea.",
    "An upbeat collection of indie hits with cinematic undertones.",
    "A deep, bass-heavy album perfect for ambient and chill sessions."
  ],
  "price": [19.99, 15.50, 22.00, 18.75, 20.99],
  "amount": [50, 30, 75, 40, 60],
}

transactions = {
  "id_user": [1, 2, 3, 4, 5, 1],
  "id_product": [1, 2, 3, 4, 5, 4],
  "amount": [2, 1, 3, 1, 4, 1],
}

with app.app_context():
    db.drop_all()
    db.create_all()
    for i in range(len(users[str(list(users.keys())[0])])):
        username = users["username"][i]
        email = users["email"][i]
        name = users["name"][i]
        surname = users["surname"][i]
        password = users["password"][i]
        credits = users["credits"][i]
        is_admin = users["is_admin"][i]
        user = UserModel(username=username, email=email, name=name, surname=surname, password=password, credits=credits, is_admin=is_admin)
        db.session.add(user)
        db.session.commit()

    for i in range(len(studios[str(list(studios.keys())[0])])):
        id_user = studios["id_user"][i]
        name = studios["name"][i]
        desc = studios["desc"][i]
        studio = StudioModel(id_user=id_user, name=name, desc=desc)
        db.session.add(studio)
        db.session.commit()
    
    for i in range(len(products[str(list(products.keys())[0])])):
        id_studio = products["id_studio"][i]
        album = products["album"][i]
        desc = products["desc"][i]
        artist = products["artist"][i]
        price = products["price"][i]
        amount = products["amount"][i]
        product = ProductModel(id_studio=id_studio, desc=desc, artist=artist, album=album, price=price, amount=amount)
        db.session.add(product)
        db.session.commit()
    
    for i in range(len(transactions[str(list(transactions.keys())[0])])):
        id_user = transactions["id_user"][i]
        id_product = transactions["id_product"][i]
        amount = transactions["amount"][i]
        date = datetime.datetime.now()
        transaction = TransactionModel(id_user=id_user, id_product=id_product, amount=amount, date = date)
        db.session.add(transaction)
        db.session.commit()
