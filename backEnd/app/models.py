from manage import app, db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import check_password_hash, generate_password_hash
import datetime
from flask import jsonify

class Customer(db.Model):
    __tablename__ = 'customer'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=True, unique=True)
    uname = db.Column(db.String(64), index=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    gender = db.Column(db.Integer)
    introduction = db.Column(db.String(300))
    streetAddress1 = db.Column(db.String(50))
    streetAddress2 = db.Column(db.String(50))
    city = db.Column(db.String(50))
    state_province_region = db.Column(db.String(50))
    zipCode = db.Column(db.String(6))
    cardName = db.Column(db.String(50))
    cardNumber = db.Column(db.String(16))
    CVV = db.Column(db.String(3))
    expirationMonth = db.Column(db.String(2))
    expirationYear = db.Column(db.String(2))
    img = db.Column(db.Text)
    confirmed = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(128), nullable=True)
    registered_on = db.Column(db.DateTime)
    confirmed_on = db.Column(db.DateTime, nullable=False)

    def generate_confirm_token(self, expires_in=3600*24):
        return self.generate_token(expires_in)

    def generate_token(self, expires_in=3600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expires_in)
        data = s.dumps({'id': self.uid})
        u8 = data.decode("utf-8")
        print(u8)
        return u8

# need to merge with verify_token
    @staticmethod
    def verify_confirm_token(token):
        try:
            s = Serializer(app.config['SECRET_KEY'])
            data = s.loads(token)
            confirm_id = data.get('id')
            customer = Customer.query.filter(Customer.uid == confirm_id).first()

            if (customer is not None):
                if(customer.confirmed is False):
                    customer.confirmed = True
                    customer.confirmed_on = datetime.datetime.now()
                return jsonify({"status":"Success",
                                "info": {'uid': customer.uid,
                                         'email': customer.email,
                                         'uname': customer.uname}
                                })

            else:
                return jsonify({"status":"Fail", "info": "No such customer!"})

        except Exception as e:
            return jsonify({"status": "Fail", "info": str(e)})  # invalid token

    # need to use wrapper to make code clear
    @staticmethod
    def verify_token(token):
        try:
            s = Serializer(app.config['SECRET_KEY'])
            data = s.loads(token)
            confirm_id = data.get('id')
            print(confirm_id)
            customer = Customer.query.filter(Customer.uid == confirm_id).first()
            if (customer is not None):
                return (True, customer)
            else:
                return (False, None)

        except Exception as e:
            print(str(e))  # invalid token

    #could not read password
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
        print("password_hash:%s" % self.password_hash)

    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    def check_password_hash(self, password):
        print("password_hash:%s" % self.password_hash)
        print("password:%s" % password)
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<Customer {}--{}>'.format(self.uname, self.email)

    @staticmethod
    def get_customer_info(uid):
        customer = Customer.query.filter(Customer.uid == uid).first()
        if customer is None:
           print("The object does not exist!")
        else:
            return customer

    @staticmethod
    def get_customer_info_by_email(email):
        customer = Customer.query.filter(Customer.email == email).first()
        if customer is None:
            print("The object does not exist!")
        else:
            return customer



class LoginInfo(db.Model):
    __tablename__ = 'login_info'
    uid = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(150), nullable=False)
    expired = db.Column(db.DateTime, nullable=False)

class Issue(db.Model):
    __tablename__ = 'issue'
    oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), nullable=False, index=True)

# class OrderContainItems():
#     __tablename__ = 'order_contain_items'
#     oid = db.Column(db.Integer, db.ForeignKey('order.uid'), nullable=False, primary_key=True)
#     iid = db.Column(db.Integer, db.ForeignKey('ingredient.uid'), nullable=False, primary_key=True, index= True)
#
# class Order():
#     __tablename__ = 'order'
#     oid = db.Column(db.Integer, nullable=False, primary_key=True)
#     order_time = db.Column(db.DateTime, nullable=False)
