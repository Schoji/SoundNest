from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from users import *
import random
from datetime import datetime
class AppKey():
    def generate(self, id_user):
    #Key format: SNAAAAA-BBBBBBB-CCCCCCC
    #First segment starts with SN followed by id_user with leading 0 to have exactly 5 digits. (i.e. for id_user = 2 ? part1 = SN00002)
    #Second segment encapsulates the date of generated key in a format "YYY*MMDD" YYY* - it truncates the first digit of a year (i.e 2024 -> 024)
    #Third segments generate 6 random numbers. First, Third and Fifth digits' sum modulo first digit is a checksum at the end of a segment.
    #(i.e. 6191093 is valid, because 6 + 9 + 0 = 15, checksum = 3, 15 % 6 = 3).
    #Key is in a format: part1-part2-part3
        segment_size = 7
        digit_amount = len(str(id_user))
        prefix = "SN"
        empty = ""
        part1 = prefix + empty.zfill(segment_size - 2 - digit_amount) + str(id_user)

        part2 = ""
        today = datetime.now()
        part2 = str(today.year)[1:] + f"{today.month:02d}" + f"{today.day:02d}"

        checksum = 1
        while (True):
            part3 = str(random.randint(1, 9))
            for i in range(1, segment_size - 1):
                a = random.randint(0, 9)
                part3 += str(a)
            
            checksum = (int(part3[0]) + int(part3[2]) + int(part3[4])) % int(part3[0])
            if (checksum == 0): continue
            break
        
        part3 += str(checksum)

        return part1 + "-" + part2 + "-" + part3
    def verify(self, part3):
        print(part3)
        if (int(part3[0]) + int(part3[2]) + int(part3[4])) % int(part3[0]):
            return True
        return False
key = AppKey()

class KeyModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    key = db.Column(db.String(80), unique=True, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now()) 

    def __repr__(self):
        return f"Key(id = {self.id}, key = {self.key}, date = {self.date})"
    
keyFields = {
    "id":fields.Integer,
    "id_user": fields.Integer,
    "key":fields.String,
    "date": fields.DateTime,
}

class Keys(Resource):
    @marshal_with(keyFields)
    def get(self):
        keys = KeyModel.query.all()
        return keys, 200
    
class Key(Resource):
    @marshal_with(keyFields)
    def get(self, id):
        key = KeyModel.query.filter_by(id = id)
        return key, 200
    
class getLicenseKey(Resource):
    def get(self, id_user):
        return key.generate(id_user), 200

class assignLicenseKey(Resource):
    def get(self, id_user, key1):
        Key = AppKey()
        part3 = list(key1.split("-")[2])
        if (Key.verify(part3) == False):
            print("Checksum not passed.")
            return "Invalid key.", 404
        
        key = KeyModel(key=key1, id_user = id_user)
        user = UserModel.query.filter_by(id = id_user).first()
        user.credits += 50
        db.session.add(key)
        db.session.commit()
        return 201
