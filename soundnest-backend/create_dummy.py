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
  "password": ["P@ssw0rd123", "S3cur3P@ss", "Br0wnM1k3!", "EmilyJ0nes#", "D@v1dC!ark"]
}

with app.app_context():
    for i in range(len(users.items())):
        username = users["username"][i]
        email = users["email"][i]
        name = users["name"][i]
        surname = users["surname"][i]
        password = users["password"][i]
        user = UserModel(username=username, email=email, name=name, surname=surname, password=password)
        db.session.add(user)
        db.session.commit()
