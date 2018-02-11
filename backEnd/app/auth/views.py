from app import app, db
from flask import request, jsonify
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
        send_mail.send(customer.email, u'please confirm your account', customer, token)
        return jsonify({"info": "success"})

    except Exception as e:
        print (e)
        return jsonify({"info" : "fail"})


@app.route('/signin', methods=['POST','GET'])
def signin():
    try:
        # read the posted values from the UI
        content = request.json
        customer = Customer(cname=content['name'], email=content['email'], password=content['pwd'])
        db.session.add(customer)
        db.session.commit()
        app.logger.info(customer.id)
        return jsonify({"id": customer.id})

    except Exception as e:
        print (e)
        return jsonify({"id" : None})