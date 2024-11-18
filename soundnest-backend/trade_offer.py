from flask_restful import Resource, reqparse, fields, marshal_with, abort
from app_def import *
from users import *
from product import *
from transaction import *
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

def getProductPic(path):
    if path == "/":
        return None
    image_path = UPLOAD_FOLDER + "/products/" + path
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('ascii')

def getUserPic(path):
    if path == "/":
        return None
    image_path = UPLOAD_FOLDER + "/avatars/" + path
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('ascii')

class TradeOfferModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trade_id = db.Column(db.String(80))
    date = db.Column(db.DateTime)
    id_sender = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_receiver = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_item_sent = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    id_item_received = db.Column(db.ForeignKey(ProductModel.id))

    def __repr__(self):
        return f"<TradeOfferModel> id: {self.id}, trade_id: {self.trade_id}, date: {self.date}, id_sender: {self.id_sender}, id_receiver: {self.id_receiver}, id_item_sent: {self.id_item_sent}, id_item_received: {self.id_item_received}."

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

class TradeHistoryModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trade_id = db.Column(db.String(80))
    date = db.Column(db.DateTime)
    id_sender = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_receiver = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_item_sent = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    id_item_received = db.Column(db.ForeignKey(ProductModel.id))


class getTradeToken(Resource):
    def get(self):
        while True:
            gen_uuid = uuid.uuid1()
            tradeOffers = TradeOfferModel.query.all()
            tradeOffersFromHistory = TradeHistoryModel.query.all()
            for tradeOffer in tradeOffers:
                if tradeOffer.trade_id == gen_uuid:
                    print("Duplicate UUID detected.")
                    continue
            for tradeOffer in tradeOffersFromHistory:
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
    
class getUserTradeoffers(Resource):
    def get(self, id_user):
        user = UserModel.query.filter_by(id=id_user).first()
        tradeoffers = TradeOfferModel.query.filter_by(id_receiver=id_user).all()

        result = []
        trade_ids = []

        if not tradeoffers:
            return "Trade offers not found", 404
        
        for tradeoffer in tradeoffers:
            if (tradeoffer.trade_id not in trade_ids):
                trade_ids.append(tradeoffer.trade_id)
        trade_dict = {}
        for trade in trade_ids:
            offers = TradeOfferModel.query.filter_by(trade_id = trade)
            sent_items = []
            received_items = []
            userid = 0
            for offer in offers:
                userid = offer.id_sender
                if (offer.id_item_sent != 0):
                    item = ProductModel.query.filter_by(id = offer.id_item_sent).first()
                    data = getProductPic(item.item_path)
                    sent_items.append({
                        "id": item.id,
                        "album": item.album,
                        "artist": item.artist,
                        "picture": data
                    })
                
                if (offer.id_item_received != 0):
                    item = ProductModel.query.filter_by(id = offer.id_item_received).first()
                    data = getProductPic(item.item_path)
                    received_items.append({
                        "id": item.id,
                        "album": item.album,
                        "artist": item.artist,
                        "picture": data
                    })
            user = UserModel.query.filter_by(id = userid).first()
            trade_dict = {
                "trade_id": trade,
                "date": str(offers[0].date),
                "user" : {
                    "id": user.id,
                    "name": user.name,
                    "surname": user.surname,
                    "pic": getUserPic(user.avatar_dir)
                },
                "received_items": received_items,
                "sent_items": sent_items,
            }
            result.append(trade_dict)
            trade_dict = {}
        return result
    
class ExchangeProducts(Resource):
    def get(self, trade_id):
        tradeOffer= TradeOfferModel.query.filter_by(trade_id = trade_id).all()
        for offer in tradeOffer:
            user1 = offer.id_sender
            user2 = offer.id_receiver

            #remove from sender, assign to receiver
            if offer.id_item_sent:
                transaction = TransactionModel.query.filter_by(id_user = user1, id_product = offer.id_item_sent).first()
                transaction.id_user = user2
                
            if offer.id_item_received:
                transaction = TransactionModel.query.filter_by(id_user = user2, id_product = offer.id_item_received).first()
                transaction.id_user = user1
        
        for offer in tradeOffer:
            db.session.add(TradeHistoryModel(
                trade_id=offer.trade_id,
                date=offer.date,
                id_sender=offer.id_sender,
                id_receiver=offer.id_receiver,
                id_item_sent=offer.id_item_sent,
                id_item_received=offer.id_item_received
                ))
            db.session.delete(offer)
        db.session.commit()
        
        #validate other trade offers
        all_offers = TradeOfferModel.query.all()
        for offer in all_offers:
            if offer.id_item_sent:
                transaction = TransactionModel.query.filter_by(id_user = offer.id_sender, id_product = offer.id_item_sent).first()
                if transaction == None:
                    other_offers_with_same_id = TradeOfferModel.query.filter_by(trade_id = offer.trade_id).all()
                    print(other_offers_with_same_id)
                    for invalid_offer in other_offers_with_same_id:
                        print("Trade no. ", offer.trade_id, " is no longer valid. Deleting.")
                        db.session.delete(invalid_offer)
                    db.session.commit()
                    
            

            if offer.id_item_received:
                transaction = TransactionModel.query.filter_by(id_user = offer.id_receiver, id_product = offer.id_item_received).first()
                if transaction == None:
                    other_offers_with_same_id = TradeOfferModel.query.filter_by(trade_id = offer.trade_id).all()
                    for invalid_offer in other_offers_with_same_id:
                        print("Trade no. ", offer.trade_id, " is no longer valid. Deleting.")
                        db.session.delete(invalid_offer)
                    db.session.commit()
                    
        db.session.commit()
        
        
    def delete(self, trade_id):
        trades = TradeOfferModel.query.filter_by(trade_id=trade_id).all()
        for trade in trades:
            db.session.delete(trade)
        
        db.session.commit()
        return "Trade offer was deleted successfully.", 201

class getUserTradeoffersHistory(Resource):
    def get(self, id_user):
        user = UserModel.query.filter_by(id=id_user).first()
        tradeoffers = TradeOfferModel.query.filter_by(id_receiver=id_user).all()

        result = []
        trade_ids = []

        if not tradeoffers:
            return "Trade offers not found", 404
        
        for tradeoffer in tradeoffers:
            if (tradeoffer.trade_id not in trade_ids):
                trade_ids.append(tradeoffer.trade_id)
        trade_dict = {}
        for trade in trade_ids:
            offers = TradeOfferModel.query.filter_by(trade_id = trade)
            sent_items = []
            received_items = []
            userid = 0
            for offer in offers:
                userid = offer.id_sender
                if (offer.id_item_sent != 0):
                    item = ProductModel.query.filter_by(id = offer.id_item_sent).first()
                    data = getProductPic(item.item_path)
                    sent_items.append({
                        "id": item.id,
                        "album": item.album,
                        "artist": item.artist,
                        "picture": data
                    })
                
                if (offer.id_item_received != 0):
                    item = ProductModel.query.filter_by(id = offer.id_item_received).first()
                    data = getProductPic(item.item_path)
                    received_items.append({
                        "id": item.id,
                        "album": item.album,
                        "artist": item.artist,
                        "picture": data
                    })
            user = UserModel.query.filter_by(id = userid).first()
            trade_dict = {
                "trade_id": trade,
                "date": str(offers[0].date),
                "user" : {
                    "id": user.id,
                    "name": user.name,
                    "surname": user.surname,
                    "pic": getUserPic(user.avatar_dir)
                },
                "received_items": received_items,
                "sent_items": sent_items,
            }
            result.append(trade_dict)
            trade_dict = {}
        return result