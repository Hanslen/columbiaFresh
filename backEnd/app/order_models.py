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
    __tablename__ = 'order_contain_recipes'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.uid'), nullable=False, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    @staticmethod
    def getOrderRecipe(oid):
        temp = OrderContainItems.query.filter(OrderContainItems.oid == oid).all()
        if temp is None:
            print("The order does not exist!")
            return None
        else:
            return temp


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
