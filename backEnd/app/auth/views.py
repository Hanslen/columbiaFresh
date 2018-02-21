from app import app, db
from flask import request, flash, jsonify
from ..models import Customer
from ..email import send_mail

@app.route('/register', methods=['POST','GET'])
def register():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer(cname=content['name'], email=content['email'], password=content['pwd'])
        db.session.add(customer)
        db.session.commit()
        token = customer.generate_confirm_token(expires_in=3600)
        send_mail.send(customer.email, u'please confirm your account', token)
        return jsonify({"token": token})

    except Exception as e:
        print (e)
        return jsonify({"info" : "fail"})

@app.route('/confirm/<token>')
def confirm_email(token):
    try:
        return jsonify({"info": str(Customer.verify_confirm_token(token))})
    except Exception as e:
        return jsonify({"info": str(e)})

@app.route('/signin', methods=['POST','GET'])
def signin():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer.query.filter(Customer.email == content['email']).first()
        if(customer is None):
            return jsonify({"error" : "Email does not exist"})

        if(customer.check_password_hash(content['password'])):
            return jsonify({"name": customer.cname})

        return jsonify({"error": "Password is not correct"})

    except Exception as e:
        print (e)
        return jsonify({"error" : str(e)})