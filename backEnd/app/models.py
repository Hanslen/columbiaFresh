from manage import app, db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import check_password_hash,generate_password_hash
import datetime
from flask import url_for

class Customer(db.Model):
    __tablename__ = 'customer'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=True, unique=True)
    uname = db.Column(db.String(64), index=True)
    confirmed = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(128), nullable=True)
    registered_on = datetime.datetime.now()
    confirmed_on = db.Column(db.DateTime, nullable=False)

    def generate_confirm_token(self, expires_in=3600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expires_in)
        print (self.id)
        data = s.dumps({'id': self.id})
        confirm_url = url_for('confirm_email', token=data, _external=True)
        return confirm_url

    @staticmethod
    def verify_confirm_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
            confirm_id = data.get('id')
            customer = Customer.query.filter(Customer.id == confirm_id).first()

            print (customer)
            if (customer is not None):
                if(customer.confirmed is False):
                    customer.confirmed = True
                    customer.confirmed_on = datetime.datetime.now()
                    return 'Success'
                else: return 'Already confirm'

            else: return 'Fail'

        except BaseException as e:
            print (e)
            return e

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

