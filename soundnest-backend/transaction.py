from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from app_def import *
from users import *
from product import *
import datetime

#instruction
#1. Make a new file
#2. Make a model
#3. Make fields
#4. Make args
#5. Make singular class
#6. Make plural class
#7. Add resource

class TransactionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_user = db.Column(db.Integer, db.ForeignKey(UserModel.id))
    id_product = db.Column(db.Integer, db.ForeignKey(ProductModel.id))
    date = db.Column(db.DateTime, default=datetime.datetime.now())

    def __repr__(self):
        return f"{self.id_product}"

transactionFields = {
    "id":fields.Integer,
    "id_user":fields.Integer,
    "id_product":fields.Integer,
    "date":fields.DateTime,
}

transaction_args = reqparse.RequestParser()
transaction_args.add_argument("id_user", required=True, help="User id cannot be blank")
transaction_args.add_argument("id_product", required=True, help="Name cannot be blank")

class Transactions(Resource):
    @marshal_with(transactionFields)
    def get(self):
        Transactions = TransactionModel.query.all()
        return Transactions
    
    @marshal_with(transactionFields)
    def post(self):
        args = transaction_args.parse_args()

        if TransactionModel.query.filter_by(id_user=args["id_user"], id_product=args["id_product"]).first():
            print("Duplicated item found. Ignoring...")
            return "Item already belongs to a user", 201
        transaction = TransactionModel(id_user=args["id_user"], id_product=args["id_product"])
        
        db.session.add(transaction)
        db.session.commit()
        return "Transaction was successfully added.", 201

class Transaction(Resource):
    @marshal_with(transactionFields)

    def get(self, id):
        transaction = TransactionModel.query.filter_by(id=id).first()
        if not transaction:
            abort(404, "User not found")
        return transaction
    
    @marshal_with(transactionFields)
    def patch(self, id):
        args = transaction_args.parse_args()
        transaction = TransactionModel.query.filter_by(id=id).first()
        if not transaction:
            abort(404, "User not found")
        transaction.id_user = args["id_user"]
        transaction.name = args["name"]
        transaction.desc = args["desc"]
        db.session.commit()
        return transaction #todo
    
    @marshal_with(transactionFields)
    def delete(self, id):
        transaction = TransactionModel.query.filter_by(id=id).first()
        if not transaction:
            abort(404, "User not found")
        db.session.delete(transaction)
        db.session.commit()
        Transactions = TransactionModel.query.all()
        return Transactions, 204