# encoding=utf-8
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345@localhost/ase'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
auth = Blueprint('auth', __name__)
db = SQLAlchemy(app)
# secrete key need to move into a local configure file
app.config['SECRET_KEY'] = "\xb1\xc6x\x97\xf3\x87\x8a\xf1P<\x82\x8c\x89{^\xa22\xab'\xa5\xefMN\x83"
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'columbiafresh2018@gmail.com',
    MAIL_PASSWORD = 'amazingproduct',
    MAIL_DEFAULT_SENDER = 'Columbia Fresh <columbiafresh2018@gmail.com>'
))
mail = Mail(app)

from app import models, views
from app.auth import views