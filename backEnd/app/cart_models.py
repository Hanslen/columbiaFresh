from manage import db

class Cart(db.Model):
    __tablename__ = 'cart'
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, uid, rid, quantity):
        self.uid = uid
        self.rid = rid
        self.quantity = quantity
