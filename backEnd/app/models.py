from manage import app, db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import check_password_hash,generate_password_hash
import datetime
from flask import url_for, jsonify

class Customer(db.Model):
    __tablename__ = 'customer'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=True, unique=True)
    uname = db.Column(db.String(64), index=True)
    confirmed = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(128), nullable=True)
    registered_on = datetime.datetime.now()
    confirmed_on = db.Column(db.DateTime, nullable=False)

    def generate_confirm_token(self, expires_in=3600*24):
        return self.generate_token(expires_in)


    def generate_token(self, expires_in=3600*30):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expires_in)
        data = s.dumps({'id': self.uid})
        return data

# need to merge with verify_token
    @staticmethod
    def verify_confirm_token(token):
        try:
            s = Serializer(app.config['SECRET_KEY'])
            print(s)
            data = s.loads(token)
            confirm_id = data.get('id')
            customer = Customer.query.filter(Customer.uid == confirm_id).first()

            if (customer is not None):
                if(customer.confirmed is False):
                    customer.confirmed = True
                    customer.confirmed_on = datetime.datetime.now()
                return jsonify({"status":"Success", "info": customer.uid})

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
            customer = Customer.query.filter(Customer.uid == confirm_id).first()

            if (customer is not None):
                jsonify({"status": "Success", "info": customer.uid})
            else:
                jsonify({"status": "Fail", "info": "No such customer!"})

        except Exception as e:
            jsonify({"status": "Fail", "info": str(e)})  # invalid token

    #could not read password
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    def check_password_hash(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<Customer {}--{}>'.format(self.uname, self.email)


class LoginInfo(db.Model):
    __tablename__ = 'login_info'
    uid = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(150), nullable=False)
    expired = db.Column(db.DateTime, nullable=False)