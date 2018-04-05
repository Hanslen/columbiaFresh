from app import app, db
from ...models import Customer
from ...auth import check_token

@app.route('/settings/update/basic', methods=['POST'])
@check_token
def update_info(customer, content):
    try:
        customer.firstname = content['firstname']
        customer.lastname = content['lastname']
        customer.gender = content['gender']
        customer.introduction = content['introduction']

        db.session.commit()

        return ('Successfully update basic info', True)

    except Exception as e:
        print(e)
        return (str(e), False)

@app.route('/settings/update/password', methods=['POST'])
@check_token
def update_password(customer, content):
    if (customer.check_password_hash(content['oldPassword']) is False):
        return ("Password Error", False)

    customer.password = content['newPassword']
    db.session.commit()

    return ("Successfully change password.", True)

@app.route('/settings/update/address', methods=['POST'])
@check_token
def update_address(customer, content):
    customer.streetAddress1 = content['streetAddress1']
    customer.streetAddress2 = content['streetAddress2']
    customer.city = content['city']
    customer.state_province_region = content['state_province_region']
    customer.zipCode = content['zipCode']
    db.session.commit()

    return ("Successfully update address.", True)


@app.route('/settings/update/credit', methods=['POST'])
@check_token
def update_credit(customer, content):
    customer.cardName = content['cardName']
    customer.cardNumber = content['cardNumber']
    customer.expirationMonth = content['expirationMonth']
    customer.expirationYear = content['expirationYear']
    customer.CVV = content['CVV']

    return ("Successfully update credit card info.", True)