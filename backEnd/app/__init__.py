# encoding=utf-8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345@localhost/ase'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

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