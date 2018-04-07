from manage import db


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

    @staticmethod
    def getOrders(uid):
        temp = Order.query.filter(Order.uid == uid).all()
        if temp is None:
            print("The user does not exist!")
            return None
        else:
            return temp


class OrderContainItems(db.Model):
    __tablename__ = 'order_contain_items'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)

class CartContainsRecipes(db.Model):
    __tablename__ = "cart_contains_recipe"
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False, primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

#
# class Cart(db.Model):
#     __tablename__ = 'cart'
#     cart_id = db.Column(db.Integer, nullable=False, primary_key=True)
#     uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False)


class Cart(db.Model):
    __bind_key__ = 'cart'
    rid = db.Column(db.Integer, primary_key=True)
