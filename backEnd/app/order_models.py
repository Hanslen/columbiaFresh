from manage import db
import datetime

class OrderContainsRecipe(db.Model):
    __tablename__ = 'order_contain_recipes'
    oid = db.Column(db.Integer, db.ForeignKey('order.oid'), primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    recipe_price = db.Column(db.DECIMAL)

    @staticmethod
    def getOrderRecipe(oid):
        temp = OrderContainsRecipe.query.filter(OrderContainsRecipe.oid == oid).all()
        if temp is None:
            print("The order does not exist!")
            return None
        else:
            return temp

    def __init__(self, oid, rid, quantity, price):
        self.oid = oid
        self.rid = rid
        self.quantity = quantity
        self.recipe_price = price

class Order(db.Model):
    __tablename__ = 'order'
    oid = db.Column(db.Integer, nullable=False, primary_key=True)
    orderPlaceDate = db.Column(db.DateTime, nullable=False)
    shipTo = db.Column(db.String(45))
    deliveredDate = db.Column(db.DateTime)
    img = db.Column(db.Text)
    soldBy = db.Column(db.String(45))
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False)

    def __init__(self, uid):
        self.orderPlaceDate = datetime.datetime.now()
        self.uid = uid

    @staticmethod
    def get_orders_by_user(uid):
        temp = Order.query.filter(Order.uid == uid).all()
        if temp is None:
            print("The user does not exist!")
            return None
        else:
            return temp


