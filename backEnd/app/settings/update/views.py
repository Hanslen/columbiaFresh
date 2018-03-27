from app import app, db
from flask import request, jsonify
from ...models import Customer

# {
#     userId: string,
#     token: string,
#     firstname: string,
#     lastname: string,
#     gender: int,
#     email: string,
#     introduction: string
# }

@app.route('/settings/update/basic', methods=['POST'])
def update_info():
    try:
        # read the posted values from the UI
        content = request.json
        token = content['token']
        (result, customer) = Customer.verify_token(token)
        if result is False:
            return jsonify({"success": False, "info": "Token Error"})

        customer.firstname = content['firstname']
        customer.lastname = content['lastname']
        customer.gender = content['gender']
        customer.introduction = content['introduction']

        db.session.commit()

        return jsonify({"success": True, "msg": "Success."})

    except Exception as e:
        print(e)
        return jsonify({"success": False, "msg": str(e)})

@app.route('/settings/update/password', methods=['POST'])
def update_password():
    content = request.json
    token = content['token']
    (result, customer) = Customer.verify_token(token)
    if result is False:
        return jsonify({"success": False, "msg": "Token Error"})
    if (customer.check_password_hash(content['oldPassword']) is False):
        return jsonify({"success": False, "msg": "Password Error"})
    customer.password = content['newPassword']
    db.session.commit()
    return jsonify({"success":True, "msg": "Successfully change password."})

@app.route('/settings/update/address', methods=['POST'])
def update_address():
    content = request.json
    token = content['token']
    (result, customer) = Customer.verify_token(token)
    if result is False:
        return jsonify({"success": False, "msg": "Token Error"})

    customer.streetAddress1 = content['streetAddress1']
    customer.streetAddress2 = content['streetAddress2']
    customer.city = content['city']
    customer.state_province_region = content['state_province_region']
    customer.zipCode = content['zipCode']
    db.session.commit()

    return jsonify({"success":True, "msg": "Successfully update address."})


@app.route('/settings/update/credit', methods=['POST'])
def update_credit():
    content = request.json
    token = content['token']
    (result, customer) = Customer.verify_token(token)

    if result is False:
        return jsonify({"success": False, "msg": "Token Error"})

    customer.cardNumber = content['cardNumber']
    customer.expirationMonth = content['expirationMonth']
    customer.expirationYear = content['expirationYear']
    customer.cvv = content['CVV']

    return jsonify(result)