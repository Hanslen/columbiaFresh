from app import app, db
from flask import request, jsonify
from ..models import Customer

@app.route('/settings/basic', methods=['POST'])
def get_info():
    content = request.json
    token = content['token']
    uid = content['userId']
    (verify, customer) = Customer.verify_token(token)

    result = {
        "firstname": None,
        "lastname": None,
        "gender": None,
        "email": None,
        "introduction": None,
        "userName": None
    }

    if verify is True:
        print("token is correct")
        result["introduction"] = customer.introduction
        result["userName"] = customer.uname
        print(customer.uid, type(customer.uid))
        print(uid, type(uid))
        if customer.uid == int(uid):
            result["firstname"] = customer.firstname,
            result["lastname"] = customer.lastname,
            result["gender"] = customer.gender,
            result["email"] = customer.email

    return jsonify(result)


@app.route('/settings/address', methods=['POST'])
def get_address():
    content = request.json
    token = content['token']
    uid = content['userId']
    (verify, customer) = Customer.verify_token(token)

    result = {
        "streetAdress1": None,
        "streetAddress2": None,
        "city": None,
        "state_province_region": None,
        "zipCode": None
    }


    if verify is True:
        print("token correct")

        if customer.uid == int(uid):
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
    (verify, customer) = Customer.verify_token(token)
    if verify is False:
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


