from app import app, db
from flask import request, jsonify
from ..models import Customer

@app.route('/settings/basic', methods=['GET'])
def get_info():
    uid = request.args.get('userId')
    customer = Customer.query.filter(Customer.uid == uid).first()
    result = {
        "firstname": None,
        "lastname": None,
        "gender": None,
        "email": None,
        "introduction": None
    }
    if customer is not None:
        result["firstname"] =  customer.firstname,
        result["lastname"] = customer.lastname,
        result["gender"] = customer.gender,
        result["email"] = customer.email,
        result["introduction"] = customer.introduction

    return jsonify(result)


@app.route('/settings/address', methods=['GET'])
def get_address():
    uid = request.args.get('userId')
    customer = Customer.query.filter(Customer.uid == uid).first()
    result = {
        "streetAdress1": None,
        "streetAddress2": None,
        "city": None,
        "state_province_region": None,
        "zipCode": None
    }

    if customer is not None:
        result["streetAdress1"] = customer.streetAddress1
        result["streetAddress2"] = customer.streetAddress2
        result["city"] = customer.city
        result["state_province_region"] = customer.state_province_region
        result["zipCode"] = customer.zipCode

    return jsonify(result)


@app.route('/settings/getcredit', methods=['POST'])
def get_credit():
    content = request.json
    token = content['token']
    (result, customer) = Customer.verify_token(token)
    if result is False:
        return jsonify({"success": False, "msg": "Token Error"})

    result = {
        "cardName": None,
        "cardNumber": None,
        "expirationMonth": None,
        "expirationYear": None,
        "cvv": None
    }

    if customer is not None:
        result["cardName"] = customer.cardName
        result["cardNumber"] = customer.cardNumber
        result["expirationMonth"] = customer.expirationMonth
        result["expirationYear"] = customer.expirationYear
        result["cvv"] = customer.CVV

    return jsonify(result)


