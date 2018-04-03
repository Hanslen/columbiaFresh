from app import db

class Issue(db.Model):
    __tablename__ = 'issue'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False, index=True)

class OrderContainItems():
    __tablename__ = 'order_contain_items'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
    iid = db.Column(db.Integer, db.ForeignKey('ingredient.uid'), nullable=False, primary_key=True, index= True)

class Order():
    __tablename__ = 'order'
    oid = db.Column(db.Integer, nullable=False, primary_key=True)
    order_time = db.Column(db.DateTime, nullable=False)
