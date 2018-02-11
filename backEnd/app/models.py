from manage import app, db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import check_password_hash,generate_password_hash

class Customer(db.Model):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), nullable=True, unique=True)
    cname = db.Column(db.String(64), index=True)
    confirmed = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(128), nullable=True)

    #could not read
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    def check_password_hash(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirm_token(self, expires_in=3600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expires_in)
        data = s.dumps({'confirm_id': self.id})
        return data

    def verify_confirm_token(self, token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)

        except BaseException as e:
            print (e)
            return False

        if data.get('confirm_id') is not self.id:
            return False

        self.is_confirmed = True
        db.session.add(self)
        db.session.commit()
        return True

    def __repr__(self):
        return '<Customer {}--{}>'.format(self.cname, self.email)