from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from studios import *
from product import *
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

class TrackModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_product = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    name = db.Column(db.String(80), nullable=False)
    producer = db.Column(db.String(80), nullable=False)
    length = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Hello, I'm a song."

trackFields = {
    "id":fields.Integer,
    "id_product":fields.Integer,
    "name":fields.String,
    "producer":fields.String,
    "length": fields.Integer
}

track_args = reqparse.RequestParser()
track_args.add_argument("id_product", type=str, required=True, help="Name cannot be blank")
track_args.add_argument("name", type=str, required=True, help="Studio description")
track_args.add_argument("producer", type=str, required=True, help="Studio description")
track_args.add_argument("length", type=int, required=True, help="Studio description")


class Tracks(Resource):
    @marshal_with(trackFields)
    def get(self):
        tracks = TrackModel.query.all()
        for track in tracks:
            if not track:
                return 404, "Track not found in database."
        return tracks
    
    @marshal_with(trackFields)
    def post(self):
        args = track_args.parse_args()
        track = TrackModel(id_product=args["id_product"], name=args["name"], producer=args["producer"], length=args["length"])
        db.session.add(track)
        db.session.commit()
        return track, 201

class Track(Resource):
    @marshal_with(trackFields)

    def get(self, id):
        track = TrackModel.query.filter_by(id=id).first()
        if not track:
                abort(404, "Track not found..")
        return track
    
    @marshal_with(trackFields)
    def patch(self, id):
        args = track_args.parse_args()
        track = TrackModel.query.filter_by(id=id).first()

        if not track:
            return 404, "Track not found in database."

        if args["id_product"]:
            track.id_product = args["id_product"]

        if args["name"]:
            track.name = args["name"]

        if args["producer"]:
            track.producer = args["producer"]

        if args["length"]:
            track.length = args["length"]

        db.session.commit()
        return track
    
    @marshal_with(trackFields)
    def delete(self, id):
        track = TrackModel.query.filter_by(id=id).first()
        if not track:
            abort(404, "Track not found.")
        db.session.delete(track)
        db.session.commit()
        Products = TrackModel.query.all()
        return Products, 204

class ProductTracks(Resource):
    @marshal_with(trackFields)

    def get(self, id_product):
        tracks = TrackModel.query.filter_by(id_product = id_product).all()
        if not tracks:
                abort(404, "Tracks not found..")
        return tracks
    