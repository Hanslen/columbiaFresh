# encoding=utf-8
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:columbiafresh@ase.c0xcepuws53r.us-east-1.rds.amazonaws.com:3306/Columbia_Fresh'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:12345@localhost/Columbia_Fresh'

app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
auth = Blueprint('auth', __name__)
db = SQLAlchemy(app)

CORS(app)

app.config.from_pyfile('config_file.cfg')

mail = Mail(app)

from app import models, views
from app.auth import views
from app.settings import views
from app.settings.update import views
from app.search import views
