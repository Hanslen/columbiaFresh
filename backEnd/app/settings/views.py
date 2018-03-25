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

