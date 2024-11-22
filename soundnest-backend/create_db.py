from api import app, db
from users import *
from studios import *
from product import *
from tags import *
from transaction import *
from productTags import *
from track import *
from trade_offer import *
from keys import *
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
  "username": [
    "johndoe123", "janesmith456", "mikebrown789", "emilyjones321", "davidclark654",
    "alexstone987", "lucyking123", "charliefox456", "sophiablue789", "georgemoon321",
    "isabellawhite654", "olivergreen789", "chloesilver987", "jackblack321", "gracegold123"
  ],
  "email": [
    "johndoe@example.com", "janesmith@example.com", "mikebrown@example.com", "emilyjones@example.com", "davidclark@example.com",
    "alexstone@example.com", "lucyking@example.com", "charliefox@example.com", "sophiablue@example.com", "georgemoon@example.com",
    "isabellawhite@example.com", "olivergreen@example.com", "chloesilver@example.com", "jackblack@example.com", "gracegold@example.com"
  ],
  "name": [
    "John", "Jane", "Mike", "Emily", "David",
    "Alex", "Lucy", "Charlie", "Sophia", "George",
    "Isabella", "Oliver", "Chloe", "Jack", "Grace"
  ],
  "surname": [
    "Doe", "Smith", "Brown", "Jones", "Clark",
    "Stone", "King", "Fox", "Blue", "Moon",
    "White", "Green", "Silver", "Black", "Gold"
  ],
  "bio": [
    "Hi! I'm a huge fan of electronic and ambient music and joined SoundNest to discover unique soundscapes. I love creating and sharing playlists with friends.",
    "DJ based in NYC here. I use SoundNest to dig up underground techno and synthwave tracks for my sets. Always looking to discover fresh sounds!",
    "Classical pianist exploring SoundNest to find some ambient and jazz pieces that inspire my arrangements. Music really fuels my creativity.",
    "Independent filmmaker looking for unique, experimental, and indie tracks to use in my projects. SoundNest has been a great resource for finding hidden gems!",
    "Just a student with a passion for music, especially alternative and punk. SoundNest is my go-to place to find new bands and create playlists.",
    "Music producer here, mostly working with pop tracks. I’m always on SoundNest to find fresh beats and remix ideas, especially in electronic and hip-hop.",
    "Professional guitarist, exploring indie rock and blues on SoundNest. Love using this app to find inspiring tracks and potential collabs.",
    "Big fan of lo-fi and chillwave here! I love curating relaxing playlists on SoundNest and sharing them with friends. It’s the perfect vibe.",
    "Vocalist in the R&B and soul scene. SoundNest helps me find collaborators and discover fresh, soulful tracks to expand my playlist.",
    "Producer with a love for reggae and dubstep! SoundNest has been great for staying updated on trending sounds and building reggae-inspired mixes.",
    "Indie artist always looking for new sounds! I use SoundNest to find up-and-coming artists and craft unique playlists for my community.",
    "Aspiring EDM producer, and SoundNest is my main tool for finding new house and techno tracks to remix and share with my listeners.",
    "Acoustic guitarist and songwriter. I use SoundNest to find mellow, acoustic tunes that inspire my songwriting. Love how easy it is to find gems.",
    "DJ in the making and huge music fan, mostly into hip-hop and experimental sounds. SoundNest is where I go to keep my mixes fresh and current.",
    "Composer exploring SoundNest for unique lo-fi and ambient tracks to influence my own music. This app is great for finding fresh inspiration."
],
  "password": [
    encrypt_string("P@ssw0rd123"), encrypt_string("S3cur3P@ss"), encrypt_string("Br0wnM1k3!"), encrypt_string("EmilyJ0nes#"), encrypt_string("D@v1dC!ark"),
    encrypt_string("St0nePass987!"), encrypt_string("KingL1ght123"), encrypt_string("F0xCh@rlie456"), encrypt_string("BlueSky789@"), encrypt_string("MoonSt@r321"),
    encrypt_string("Wh1t3Bella!"), encrypt_string("GreenOl1v3r#"), encrypt_string("S1lv3rChl0e!"), encrypt_string("Bl@ckJ@ck321"), encrypt_string("GoldGr@ce!")
  ],
  "credits": [
    50.0, 20.0, 10.0, 0.0, 35.0,
    40.0, 25.0, 15.0, 30.0, 45.0,
    60.0, 20.0, 50.0, 35.0, 25.0
  ],
  "avatar_dir": [
    "1.png", "2.png", "3.png", "4.png", "5.png",
    "/", "/", "/", "/", "/",
    "/", "/", "/", "/", "/"
  ],
  "is_admin": [
    True, False, False, False, False,
    False, False, False, False, False,
    False, False, False, False, False
  ]
}

studios = {
  "id_user": [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  "name": [
    "Sunset Productions", "Pixel Perfect", "Blue Wave Studios", "Golden Reel Films", "Crimson Lens",
    "Echo Valley Studio", "Digital Horizons", "Nebula Narratives", "Silver Screen Creations", "Emerald Filmworks",
    "Dreamscape Media", "Aurora Visuals", "Mystic Frames", "Opal Productions", "Infinity Imagery"
  ],
  "desc": [
    "A creative studio specializing in short films and documentaries.",
    "Graphic design and animation studio with a focus on modern visuals.",
    "Produces stunning visual content for commercials and web series.",
    "Film production company known for award-winning indie movies.",
    "Photography and videography studio offering custom shoots.",
    "Studio focusing on audio production and sound design.",
    "Animation studio bringing futuristic concepts to life.",
    "Storytelling studio creating immersive narrative experiences.",
    "Film and media company with a classic cinema style.",
    "Collaborative team creating vibrant travel films.",
    "Visual effects studio crafting magical movie moments.",
    "Artistic visual content studio specializing in nature films.",
    "Professional photography studio with a vintage aesthetic.",
    "Production company for documentaries and historical films.",
    "Creative space for digital content and modern storytelling."
  ],
  "studio_dir": [
    "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
    "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
    "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"
  ]
}

products = {
  "id_studio": [
    1, 2, 3, 4, 5, 
    1, 2, 3, 4, 5, 
    1, 2, 3, 4, 5
  ],
  "album": [
    "Echoes of Time", "Digital Dreams", "Oceanic Vibes", "Golden Horizon", "Crimson Soundscape",
    "Celestial Melodies", "Urban Escape", "Mystic Waters", "Sunlit Shadows", "Velvet Night",
    "Lunar Resonance", "Electric Pulse", "Eternal Shores", "Bright Lights", "Silent Echo"
  ],
  "artist": [
    "The Timekeepers", "Synthwave Stars", "Aqua Flow", "The Golden Crew", "Crimson Beats",
    "Starfall Symphony", "City Waves", "Deep Current", "Golden Sunsets", "Nocturnal Flow",
    "Moonlight Muse", "Electro Groove", "Waveform", "Neon Pulse", "Echo Collective"
  ],
  "desc": [
    "A nostalgic journey through time with mellow, electronic beats.",
    "Futuristic soundscapes blending synths and electronic rhythms.",
    "Relaxing ocean-themed tracks inspired by nature and the sea.",
    "An upbeat collection of indie hits with cinematic undertones.",
    "A deep, bass-heavy album perfect for ambient and chill sessions.",
    "Ambient sounds inspired by the stars and cosmic dreams.",
    "Escape to the city with modern electronic beats.",
    "Explore the depths of the ocean with tranquil melodies.",
    "Sun-soaked tunes for a relaxed day outdoors.",
    "Smooth, jazzy beats for a night-time experience.",
    "Resonant melodies inspired by the mysteries of the moon.",
    "A dynamic mix of electric beats and synth waves.",
    "Ocean-inspired tracks for a refreshing experience.",
    "High-energy anthems for the bright lights of the city.",
    "Ethereal soundscapes that echo in the silence."
  ],
  "price": [
    19.99, 15.50, 22.00, 18.75, 20.99,
    21.50, 17.00, 19.75, 16.80, 18.00,
    23.45, 14.99, 20.25, 22.10, 19.60
  ],
  "item_path": [
    "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
    "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
    "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"
  ]
}

transactions = {
  "id_user": [
    1, 2, 3, 4, 5, 1, 
    6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15
  ],
  "id_product": [
    1, 2, 3, 4, 5, 4, 
    6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15
  ],
}

tracks = {
  "id_product": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
              2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
              4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
              5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
              6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
              7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
              8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
              9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
              10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
              11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
              12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
              13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
              14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
              15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
              
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
    "Midnight Pulse", "Dark Reflections", "Ruby Dreams", "Falling Ember", "Scarlet Horizon",

    "Timeless Rhythm", "Fading Lights", "Moment of Clarity", "Echoes Through Time", "Whispers in the Wind",
    "Electric Dreams", "Reflections in the Dark", "Chasing Shadows", "The Final Countdown", "Dawn of Tomorrow",
    
    "Neon Pulse", "Code Breaker", "Data Stream", "Virtual Heartbeat", "Future Lights",
    "Silent Connection", "Binary Waves", "Neon Glow", "Synth Reverie", "Techno Soul",
    
    "Abyssal Waves", "Crystal Waters", "Ocean Breeze", "Mystic Currents", "Deep Dive",
    "Golden Hour", "Sunset Serenade", "Golden Horizon", "Twilight Journey", "Sundown Symphony",
    
    "Silver Sands", "Infinite Tides", "Sunrise Journey", "Calm Horizon", "Midnight Shore",
    "Echoes of the Sea", "Whispers from the Ocean", "Beneath the Waves", "Ocean’s Breath", "Ripple Effect",
    
    "Golden Sunbeam", "Amber Horizon", "Dawn of the Waves", "Moonlit Waters", "Dancing Tides",
    "Electric Pulse", "Cyber Dreams", "Virtual Horizons", "Neon Skies", "Hacker's Anthem",
    
    "Digital Future", "Synthetica", "Virtual Escape", "Cybernetic Journey", "Pulse of Tomorrow",
    "Retro Future", "Neon Memories", "Plastic Heart", "Electric Sky", "Parallel Dreams",
    
    "Waves of Neon", "Electric Ocean", "Starry Sky", "Neon Visions", "Hyperdrive",
    "Sunset Reflection", "Golden Mirage", "Radiant Skies", "Shining Light", "Amber Waves",
    
    "Endless Horizon", "Celestial Waves", "Silent Drift", "Golden Tide", "Sunset Ritual",
    "Crimson Tide", "Violet Skies", "Scarlet Storm", "Midnight Sunrise", "Darkened Dawn",
    
    "Fading Echoes", "Velvet Moon", "Ruby Nights", "Scarlet Shores", "Burning Sunset",
    "Midnight Eclipse", "Twilight Reflections", "Shadows of the Night", "Crimson Heart", "Storm of Echoes",
    
    "Crimson Echo", "Burning Horizon", "Scarlet Pulse", "Shadowed Lights", "Echo of the Red Sky",
    "Virtual Reality", "Dreams of the Future", "Sunset Dreams", "Chasing Dreams", "Electric Embrace",
  ],
  
  "producer": [
    "Aaron Baker", "Lydia Sterling", "James Carter", "Aiden Baker", "Mason Novak", 
    "David Williams", "Rebecca Lee", "Carter Daniels", "Anna Baker", "Jason Carter",

    "Nate Fields", "Chris Carter", "Mason Rivers", "Nina Fields", "Travis Burns",
    "John Collins", "Alfred Silver", "Lily Carter", "Catherine Carter", "Nina Fields",

    "Samantha Waters", "Oscar Cruz", "Nathan Brooks", "Sally Waters", "Brenda James",
    "Derrick Marin", "Anastasia Garcia", "Joseph Lane", "Sally Waters", "Oscar Cruz",

    "Michael Shaw", "Liam Riley", "George Turner", "Matthew Shaw", "Patrick Knight",
    "Dylan Wells", "Chloe Fox", "Alfred Cole", "Lillian Riley", "Gavin Turner",

    "Riley Hayes", "Kara Martin", "Adam Gray", "Rachel Hayes", "Lena Bell",
    "Mia Diaz", "Kyle Davis", "Paul Russell", "Ronald Hayes", "Alex Gray",

    "Adam Simmons", "Beth Summers", "Mason Frost", "Emily Parker", "Charlie Hill",
    "Steven Peterson", "Nadia Sanders", "Daniel Turner", "Leah Greene", "Paul Jacobs",

    "Rex Turner", "Shannon Jacobs", "Hayley Blake", "Jack Wilkins", "Vera Warren",
    "Paula Robinson", "Ben Chapman", "Melvin Scott", "Fiona Matthews", "James Morris",

    "Winston Foster", "Lila Jacobs", "Derek Wallace", "Tara Ferguson", "Phillip Hunter",
    "Ethan Bennett", "Jessica Hunt", "Grant Carson", "Brianna Walker", "Tiffany Ford",

    "Heather Dorsey", "Riley Sharp", "Felicia Montgomery", "Sandra Fisher", "David Brooks",
    "Brittany Campbell", "Trevor Marshall", "Kyle Oliver", "Lucy Perry", "Vince Reynolds",

    "Ryan Foster", "Aidan Mason", "Blair Allen", "Madeline Cooper", "Sophie Gilbert",
    "Jared Chapman", "Thomas Gray", "Dylan Lewis", "Sophia Warren", "Carla Mitchell",

    "Mason Ross", "Riley Marshall", "Paula Clark", "Valeria Miller", "Freddy Morris",
    "Lenny Howard", "Diana Hall", "Jon Stevens", "Bill Richardson", "Holly Simmons",

    "Cory Brooks", "Gary Fisher", "Paula James", "Toby Edwards", "Megan Reed",
    "Dylan Stevens", "Stella Sullivan", "Benny Howard", "Felicia Bailey", "Lance Craig",

    "Cynthia Greene", "Aaron Young", "Travis Mason", "Paula Thomas", "Holly Cooper",
    "Matthew Alexander", "Jules Douglas", "Lana Barrett", "Kenny Knight", "Ronnie Powers",

    "Seth Waller", "David Scott", "Joan Ellis", "Brad Griffin", "Vera Hunter",
    "Peter Taylor", "Clarence Lawson", "Maggie Grant", "Richard Evans", "Lydia Palmer",

    "Hannah Turner", "Sarah Jenkins", "Ryan Webb", "Terry Moore", "Benny Adams",
    "Mason Price", "Freddy Reid", "Sandra Brooks", "Jack Harvey", "Toby Simpson",

    "Aidan Nichols", "Catherine Wright", "Phillip Campbell", "Julia Robinson", "Landon West",
    "Kenny Hawkins", "Douglas Holt", "Megan Ellis", "Terry Maxwell", "Sophia Jenkins",

    "Rex Cole", "Briana James", "Harry Miller", "Francis Dixon", "Mason Thornton",
    "Johnny Marshall", "Lindsey Parsons", "Travis Kent", "Victor Allen", "Brittany Clark"
],
  
  "length": [
    215, 205, 210, 190, 240,
    225, 235, 220, 200, 255,
    
    210, 250, 215, 220, 230,
    240, 230, 215, 245, 195,
    
    205, 225, 215, 210, 250,
    225, 200, 230, 245, 220,
    
    205, 240, 210, 195, 220,
    250, 230, 215, 225, 210,
    
    240, 205, 250, 215, 230,
    220, 240, 210, 225, 195,
    
    245, 205, 250, 220, 210,
    230, 220, 245, 200, 215,
    
    230, 195, 240, 210, 250,
    225, 245, 215, 205, 220,
    
    250, 210, 220, 200, 230,
    240, 220, 210, 205, 230,
    
    215, 245, 210, 220, 230,
    240, 250, 205, 225, 210,
    
    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,
    
    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,

    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,

    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,
    
    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,

    215, 230, 220, 200, 225,
    240, 205, 250, 215, 220,
]
}
tags =  [
    "Electronic", "Synthwave", "Ambient", "Pop", "Indie",
    "Rock", "Hip-hop", "Trap", "Classical", "Jazz",
    "Experimental", "Chillwave", "House", "Techno", "Dubstep",
    "Funk", "Disco", "Reggae", "Blues", "Soul",
    "R&B", "Acoustic", "Alternative", "Folk", "Industrial",
    "Trance", "Progressive", "Drum and Bass", "Lo-fi", "Hardcore",
    "Metal", "Punk"
  ]
product_tags = {
  "id_product": [
    1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4,
    5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8,
    9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12,
    13, 13, 13, 14, 14, 14, 15, 15, 15
  ],

  "id_tag": [
    4, 1, 5, 3, 2, 6, 1, 4, 2, 5, 3, 7,
    2, 4, 8, 6, 1, 9, 7, 3, 10, 8, 4, 2,
    9, 5, 3, 10, 7, 6, 11, 8, 4, 12, 1, 9,
    13, 5, 2, 14, 10, 4, 15, 7, 6
  ]
}
tradeoffers = {
    "trade_id": [
        "af54865c-a372-11ef-b724-b42e998b3572",
        "b829365c-a372-11ef-a9e0-b42e998b3572",
        "b829365c-a372-11ef-a9e0-b42e998b3572",
        "b829365c-a372-11ef-a9e0-b42e998b3572",
        "bd7f76e4-a372-11ef-a5e0-b42e998b3572",
        "bd7f76e4-a372-11ef-a5e0-b42e998b3572"
    ],
    "id_sender": [2, 2, 2, 2, 2, 2],
    "id_receiver": [1, 1, 1, 1, 1, 1],
    "id_item_sent": [2, 2, None, None, None, None],
    "id_item_received": [None, None, 1, 4, 1, 4]
}
key = AppKey()
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
        bio = users["bio"][i]
        user = UserModel(username=username, email=email, name=name, surname=surname, password=password, bio=bio, credits=credits, avatar_dir=avatar_dir, is_admin=is_admin)
        db.session.add(user)
        db.session.commit()
    print("Users added.")

    for user in UserModel.query.all():
      sn_key = KeyModel(id_user = user.id, key = key.generate(user.id))
      db.session.add(sn_key)
    db.session.commit()
    print("Keys added.")

    for i in range(len(studios[str(list(studios.keys())[0])])):
        id_user = studios["id_user"][i]
        name = studios["name"][i]
        desc = studios["desc"][i]
        studio_dir = studios["studio_dir"][i]
        studio = StudioModel(id_user=id_user, name=name, desc=desc, studio_dir=studio_dir)
        db.session.add(studio)
        db.session.commit()
    print("Studios added.")
    
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
    print("Products added.")
    
    for i in range(len(transactions[str(list(transactions.keys())[0])])):
        id_user = transactions["id_user"][i]
        id_product = transactions["id_product"][i]
        date = datetime.now()
        transaction = TransactionModel(id_user=id_user, id_product=id_product, date = date)
        db.session.add(transaction)
        db.session.commit()
    print("Transactions added.")

    for i in range(len(tracks[str(list(tracks.keys())[0])])):
        id_product = tracks["id_product"][i]
        name = tracks["name"][i]
        producer = tracks["producer"][i]
        length = tracks["length"][i]
        track = TrackModel(id_product = id_product, name = name, producer = producer, length = length)
        db.session.add(track)
        db.session.commit()
    print("Tracks added.")

    for tag in tags:
       tag = TagsModel(tag_name = str(tag))
       db.session.add(tag)
       db.session.commit()
    print("Tags added.")
    
    for i in range(len(product_tags[str(list(product_tags.keys())[0])])):
        id_product = product_tags["id_product"][i]
        id_tag = product_tags["id_tag"][i]
        product_tag = ProductTagsModel(id_product = id_product, id_tag = id_tag)
        db.session.add(product_tag)
        db.session.commit()
    print("Product/Tags added.")

    for i in range(len(tradeoffers[str(list(tradeoffers.keys())[0])])):

        trade_id = tradeoffers["trade_id"][i]
        id_sender = tradeoffers["id_sender"][i]
        id_receiver = tradeoffers["id_receiver"][i]
        id_item_sent = tradeoffers["id_item_sent"][i]
        id_item_received = tradeoffers["id_item_received"][i]
        date = datetime.now()
        
        trade_offer = TradeOfferModel(trade_id = trade_id, id_sender = id_sender, id_receiver = id_receiver, id_item_sent = id_item_sent, id_item_received = id_item_received, date = date)
        
        db.session.add(trade_offer)
        db.session.commit()
    print("Trade offers added.")
print("Done.")