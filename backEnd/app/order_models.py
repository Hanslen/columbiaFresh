from manage import db
import datetime

class OrderContainsRecipe(db.Model):
    __tablename__ = 'order_contain_recipes'
    oid = db.Column( db.Integer, db.ForeignKey('order.oid'), primary_key=True)
    rid = db.Column('rid', db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column('quantity', db.Integer, nullable=False)\
    # need to add an item recipe price

    @staticmethod
    def getOrderRecipe(oid):
        temp = OrderContainsRecipe.query.filter(OrderContainsRecipe.oid == oid).all()
        if temp is None:
            print("The order does not exist!")
            return None
        else:
            return temp

class Order(db.Model):
    __tablename__ = 'order'
    oid = db.Column(db.Integer, nullable=False, primary_key=True)
    orderPlaceDate = db.Column(db.DateTime, nullable=False)
    shipTo = db.Column(db.String(45))
    deliveredDate = db.Column(db.DateTime)
    img = db.Column(db.Text)
    soldBy = db.Column(db.String(45))
    isCheckedOut = db.Column(db.Boolean, nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False)

    def __init__(self, uid):
        self.orderPlaceDate = datetime.datetime.now()
        self.uid = uid
        self.isCheckedOut = False

    @staticmethod
    def get_orders_by_user(uid):
        temp = Order.query.filter(Order.uid == uid).all()
        if temp is None:
            print("The user does not exist!")
            return None
        else:
            return temp

class CartContainsRecipes(db.Model):
    __tablename__ = "cart_contains_recipe"
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False, primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
