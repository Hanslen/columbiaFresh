from app import app, db
from flask import request, flash, jsonify
import datetime
from ..models import Customer
from ..email import send_mail

@app.route('/register', methods=['POST','GET'])
def register():
    try:
        # read the posted values from the UI
        content = request.json
        print (content)
        # mush use password rather than password_hash, otherwise it won't save the hash value
        customer = Customer(uname=content['name'],
                            email=content['email'],
                            password=content['pwd'],
                            registered_on=datetime.datetime.now()
                            )
        print (content)
        db.session.add(customer)
        db.session.commit()
        token = customer.generate_confirm_token(expires_in=3600*24)
        return jsonify({"status": "Success", "token": str(token)})

    except Exception as e:
        print (e)
        return jsonify({"status" : "Fail","info": str(e)})

@app.route('/register/confirm_url', methods=['POST','GET'])
def register_confirm_url():
    try:
        # read the posted values from the UI
        content = request.json
        email = content['email']
        url = content['url']

        send_mail.send(email, u'please confirm your account', url)
        return jsonify({"status":"Success", "info" : ""})

    except Exception as e:
        print (e)
        return jsonify({"status":"Fail", "info" : str(e)})


@app.route('/confirm/<token>', methods=['POST','GET'])
def confirm_email(token):
    try:
        return Customer.verify_confirm_token(token)

    except Exception as e:
        return jsonify({"status":"Fail", "info": str(e)})


@app.route('/login', methods=['POST','GET'])
def login():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer.query.filter(Customer.email == content['email']).first()
        if(customer is None):
            return jsonify({"status" : "Fail", "info" : "Email does not exist"})
        if(customer.check_password_hash(content['password'])):
            login_token = customer.generate_token()
            print(login_token)
            return jsonify({"status": "Success",
                            "info": {
                                "uid": customer.uid,
                                "token": login_token,
                                "email": customer.email,
                                "img": customer.img,
                                "uname": customer.uname
                                }
                            })

        return jsonify({"status": "Fail", "info": "Password is not correct"})

    except Exception as e:
        print (e)
        return jsonify({"status": "Fail", "info": str(e)})