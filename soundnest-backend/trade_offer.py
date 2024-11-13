from flask_restful import Resource, reqparse, fields, marshal_with, abort
from app_def import *
from users import *
from product import *
import uuid
import datetime

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class TradeOfferModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trade_id = db.Column(db.String(80))
    date = db.Column(db.DateTime)
    id_sender = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_receiver = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_item_sent = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    id_item_received = db.Column(db.ForeignKey(ProductModel.id))

    def __repr__(self):
        return f"yes"

tradeOfferFields = {
    "id":fields.Integer,
    "trade_id":fields.String,
    "date": fields.DateTime,
    "id_sender": fields.Integer,
    "id_receiver": fields.Integer,
    "id_item_sent": fields.Integer,
    "id_item_received": fields.Integer,
}

tradeOffer_args = reqparse.RequestParser()
tradeOffer_args.add_argument("trade_id", type=str, required=True, help="Name cannot be blank")
tradeOffer_args.add_argument("date", type=str, help="Studio description")
tradeOffer_args.add_argument("id_sender", type=str, help="Studio description")
tradeOffer_args.add_argument("id_receiver", type=str, help="Studio description")
tradeOffer_args.add_argument("id_item_sent", type=str, help="Studio description")
tradeOffer_args.add_argument("id_item_received", type=str, help="Studio description")


class getTradeToken(Resource):
    def get(self):
        while True:
            gen_uuid = uuid.uuid1()
            tradeOffers = TradeOfferModel.query.all()
            for tradeOffer in tradeOffers:
                if tradeOffer.trade_id == gen_uuid:
                    print("Duplicate UUID detected.")
                    continue
            else:
                break

        return {"uuid": str(gen_uuid)}

class TradeOffers(Resource):
    @marshal_with(tradeOfferFields)
    def get(self):
        tradeOffers = TradeOfferModel.query.all()
        for tradeOffer in tradeOffers:
            if not tradeOffer:
                return 404, "tradeOffer not found in database."

        return tradeOffers
    
    @marshal_with(tradeOfferFields)
    def post(self):
        args = tradeOffer_args.parse_args()
        tradeOffer = TradeOfferModel(trade_id=args["trade_id"], date=datetime.datetime.now(), id_sender=args["id_sender"],id_receiver=args["id_receiver"], id_item_sent=args["id_item_sent"], id_item_received=args["id_item_received"])
        
        db.session.add(tradeOffer)
        db.session.commit()
        return tradeOffer, 201

class TradeOffer(Resource):
    @marshal_with(tradeOfferFields)

    def get(self, id):
        tradeOffer= TradeOfferModel.query.filter_by(id=id).first()
        if not tradeOffer:
                abort(404, "tradeOffer not found")
        return tradeOffer
    
    @marshal_with(tradeOfferFields)
    def delete(self, id):
        tradeOffer = TradeOfferModel.query.filter_by(id=id).first()
        if not tradeOffer:
            abort(404, "tradeOffer not found")
        db.session.delete(tradeOffer)
        db.session.commit()
        tradeOffers = TradeOfferModel.query.all()
        return tradeOffers, 204