from api import app, db
from users import *
from studios import *
from product import *
from transaction import *
from track import *
import os
import shutil
import hashlib

def encrypt_string(hash_string):
  sha_signature = \
  hashlib.sha256(hash_string.encode()).hexdigest()
  sha_signature2 = \
  hashlib.sha256(sha_signature.encode()).hexdigest()
  return sha_signature2

UPLOAD_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "Uploads/"))
DUMMY_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "Dummy_uploads/"))

print("Deleting upload folder...")
try:
  shutil.rmtree(UPLOAD_FOLDER)
except:
  print("Failed to delete Upload folder")
print("Copying Dummy_uploads into Uploads..")
shutil.copytree(DUMMY_FOLDER, UPLOAD_FOLDER)
print("Copying done.")

users = {
  "username": ["johndoe123", "janesmith456", "mikebrown789", "emilyjones321", "davidclark654"],
  "email": ["johndoe@example.com", "janesmith@example.com", "mikebrown@example.com", "emilyjones@example.com", "davidclark@example.com"],
  "name": ["John", "Jane", "Mike", "Emily", "David"],
  "surname": ["Doe", "Smith", "Brown", "Jones", "Clark"],
  "password": [encrypt_string("P@ssw0rd123"), encrypt_string("S3cur3P@ss"), encrypt_string("Br0wnM1k3!"), encrypt_string("EmilyJ0nes#"), encrypt_string("D@v1dC!ark")],
  "credits": [50.0, 20.0, 10.0, 0.0, 35.0],
  "avatar_dir": ["1.png", "2.png", "3.png", "4.png", "5.png"],
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
  ],
  "studio_dir": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
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
  "item_path": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
}

transactions = {
  "id_user": [1, 2, 3, 4, 5, 1],
  "id_product": [1, 2, 3, 4, 5, 4],
}

tracks = {
  "id_product": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
              4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
              5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
              
  "name": [
    "Timekeeper", "Echoes in the Dark", "Passing Moments", "Clockwork Dreams", "Timeless Journey", 
    "Whispers of the Past", "Seconds Apart", "The Final Tick", "Sands of Time", "Endless Loop",
    
    "Digital Dawn", "Code Pulse", "Circuit Runner", "Electric Heartbeat", "Neon Reflections",
    "Tech Wave", "Future Streams", "Binary Sunset", "Dream Matrix", "Final Byte",
    
    "Tidal Thoughts", "Deep Blue", "Underwater Echo", "Calm Currents", "Seaside Serenity", 
    "Waves of Wonder", "Abyssal Glow", "Mystic Tides", "Coral Dreams", "Sapphire Horizon",
    
    "Golden Sunrise", "Sunset on the Horizon", "Eternal Gleam", "Golden Sands", "Brilliance of Light", 
    "Dawn of a New Day", "Radiant Waves", "Amber Glow", "Golden Trails", "The Final Sunset",
    
    "Crimson Dawn", "Blood Moon", "Velvet Skies", "Mystic Shadows", "Echoes of the Night",
    "Midnight Pulse", "Dark Reflections", "Ruby Dreams", "Falling Ember", "Scarlet Horizon"
  ],
  
  "producer": [
    "A. Baker", "L. Sterling", "J. Carter", "A. Baker", "M. Novak",
    "D. Williams", "R. Lee", "C. Daniels", "A. Baker", "J. Carter",
    
    "N. Fields", "C. Carter", "M. Rivers", "N. Fields", "T. Burns",
    "J. Collins", "A. Silver", "L. Carter", "C. Carter", "N. Fields",
    
    "S. Waters", "O. Cruz", "N. Brooks", "S. Waters", "B. James",
    "D. Marin", "A. Garcia", "J. Lane", "S. Waters", "O. Cruz",
    
    "M. Shaw", "L. Riley", "G. Turner", "M. Shaw", "P. Knight",
    "D. Wells", "C. Fox", "A. Cole", "L. Riley", "G. Turner",
    
    "R. Hayes", "K. Martin", "A. Gray", "R. Hayes", "L. Bell",
    "M. Diaz", "K. Davis", "P. Russell", "R. Hayes", "A. Gray"
  ],
  
  "length": [
    245, 210, 198, 227, 305,
    188, 234, 199, 245, 220,
    
    260, 195, 185, 240, 230,
    210, 223, 190, 215, 205,
    
    225, 195, 235, 210, 240,
    230, 220, 215, 245, 200,
    
    250, 200, 220, 245, 210,
    233, 215, 204, 250, 240,
    
    220, 240, 195, 225, 210,
    230, 200, 190, 250, 205
  ]
}

with app.app_context():
    print("Deleting all records...")
    db.drop_all()
    print("Creating db...")
    db.create_all()
    for i in range(len(users[str(list(users.keys())[0])])):
        username = users["username"][i]
        email = users["email"][i]
        name = users["name"][i]
        surname = users["surname"][i]
        password = users["password"][i]
        credits = users["credits"][i]
        avatar_dir = users["avatar_dir"][i]
        is_admin = users["is_admin"][i]
        user = UserModel(username=username, email=email, name=name, surname=surname, password=password, credits=credits, avatar_dir=avatar_dir, is_admin=is_admin)
        db.session.add(user)
        db.session.commit()

    for i in range(len(studios[str(list(studios.keys())[0])])):
        id_user = studios["id_user"][i]
        name = studios["name"][i]
        desc = studios["desc"][i]
        studio_dir = studios["studio_dir"][i]
        studio = StudioModel(id_user=id_user, name=name, desc=desc, studio_dir=studio_dir)
        db.session.add(studio)
        db.session.commit()
    
    for i in range(len(products[str(list(products.keys())[0])])):
        id_studio = products["id_studio"][i]
        album = products["album"][i]
        desc = products["desc"][i]
        artist = products["artist"][i]
        price = products["price"][i]
        item_path = products["item_path"][i]
        product = ProductModel(id_studio=id_studio, desc=desc, artist=artist, album=album, price=price, item_path=item_path)
        db.session.add(product)
        db.session.commit()
    
    for i in range(len(transactions[str(list(transactions.keys())[0])])):
        id_user = transactions["id_user"][i]
        id_product = transactions["id_product"][i]
        date = datetime.datetime.now()
        transaction = TransactionModel(id_user=id_user, id_product=id_product, date = date)
        db.session.add(transaction)
        db.session.commit()

    for i in range(len(tracks[str(list(tracks.keys())[0])])):
        id_product = tracks["id_product"][i]
        name = tracks["name"][i]
        producer = tracks["producer"][i]
        length = tracks["length"][i]
        track = TrackModel(id_product = id_product, name = name, producer = producer, length = length)
        db.session.add(track)
        db.session.commit()
print("Done.")