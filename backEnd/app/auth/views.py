from app import app, db
from flask import request, jsonify
import datetime
from ..models import Customer
from ..email import send_mail
from ..auth import return_format

# need to create cart
@app.route('/register', methods=['POST'])
@return_format
def register():
    try:
        # read the posted values from the UI
        content = request.json
        # mush use password rather than password_hash, otherwise it won't save the hash value
        if Customer.check_duplicate(content['email']):
            return ("Email duplicated!", False)

        customer = Customer(uname=content['name'],
                            email=content['email'],
                            password=content['pwd'],
                            registered_on=datetime.datetime.now()
                            )
        print (content)
        db.session.add(customer)
        db.session.commit()


        token = customer.generate_confirm_token(expires_in=3600*24)
        return (token, True)

    except Exception as e:
        print(e)
        return (str(e), False)


@app.route('/register/confirm_url', methods=['POST'])
@return_format
def register_confirm_url():
    try:
        # read the posted values from the UI
        content = request.json
        email = content['email']
        url = content['url']
        print(email, type(email))
        send_mail.send(email, u'Please confirm your account', url)
        return ("Please check you email to confirm ^_^", True)

    except Exception as e:
        return (str(e), False)


@app.route('/confirm/<token>', methods=['POST','GET'])
@return_format
def confirm_email(token):
    try:
        msg, success = Customer.verify_confirm_token(token)
        return (msg, success)

    except Exception as e:
        return (str(e), False)


@app.route('/login', methods=['POST'])
@return_format
def login():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer.query.filter(Customer.email == content['email']).first()
        if(customer is None):
            return ("Email does not exist", False)
        if(customer.check_password_hash(content['password'])):
            login_token = str(customer.generate_token())
            result = {
                "uid": customer.uid,
                "token": login_token,
                "email": customer.email,
                "img": customer.img,
                "uname": customer.uname
            }
            return (result, True)
        return ("Password is not correct", False)

    except Exception as e:
        print (e)
        return (str(e), False)