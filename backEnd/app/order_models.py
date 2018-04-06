from manage import app, db
from .models import Customer


class Order():
    __tablename__ = 'order'
    oid = db.Column(db.Integer, nullable=False, primary_key=True)
    orderPlaceDate = db.Column(db.DateTime, nullable=False)
    shipTo = db.Column(db.String(45))
    deliveredDate = db.Column(db.DateTime)
    img = db.Column(db.Text)
    soldBy = db.Column(db.String(45))
    isCheckedOut = db.Column(db.Boolean, nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False)

class OrderContainItems():
    __tablename__ = 'order_contain_items'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
    iid = db.Column(db.Integer, db.ForeignKey('ingredient.uid'), nullable=False, primary_key=True, index= True)