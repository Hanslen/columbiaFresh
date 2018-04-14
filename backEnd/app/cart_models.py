from manage import db

class Cart(db.Model):
    __tablename__ = 'cart'
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    @staticmethod
    def GetCartContent(uid, rid):
        temp = Cart.query.filter(Cart.uid == uid). \
            filter(Cart.rid == rid).first()
        if temp is None:
            return None
        else:
            return temp

    @staticmethod
    def CheckIfCartItemExists(uid, rid):
        temp = Cart.GetCartContent(uid, rid)
        if temp is not None:
            return True, temp.quantity
        else:
            return False, 0

    @staticmethod
    def ModifyRecordContent(uid, rid, quantity, string):
        temp = Cart.GetCartContent(uid, rid)
        if temp is None:
            return False
        else:
            if temp.quantity != quantity:
                return False
            else:
                prev_quantity = temp.quantity
                if string in "add":
                    cur_quantity = prev_quantity + 1
                elif string in "deduct":
                    cur_quantity = prev_quantity - 1
                else:
                    return False
                temp.quantity = cur_quantity
                db.session.commit()
                test_temp = Cart.GetCartContent(uid, rid)
                if test_temp is not None:
                    if string in "add" and test_temp.quantity == quantity + 1:
                        return True
                    elif string in "deduct" and test_temp.quantity == quantity - 1:
                        return True
                    else:
                        return False
                else:
                    print("hhhhh")
                    return False

    @staticmethod
    def AddRecord(uid, rid, quantity):
        addRecord = Cart(uid, rid, quantity)
        db.session.add(addRecord)
        temp = Cart.GetCartContent(uid, rid)
        if temp is not None and temp.quantity == quantity:
            return True
        else:
            return False

    def __init__(self, uid, rid, quantity):
        self.uid = uid
        self.rid = rid
        self.quantity = quantity
