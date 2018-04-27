from app import app
from ..auth import check_token
from ..models import Customer

@app.route('/settings/basic', methods=['POST'])
@check_token
def get_info(customer, content):
    result = {
        "firstname": None,
        "lastname": None,
        "gender": None,
        "email": None,
        "icon": customer.img,
        "introduction": customer.introduction,
        "userName": customer.uname
    }

    if customer.uid == int(content['userId']):
        result["firstname"] = customer.firstname,
        result["lastname"] = customer.lastname,
        result["gender"] = customer.gender,
        result["email"] = customer.email
    else:
        user = Customer.query(Customer.id == int(content['userId'])).first()
        result["icon"] = user.img,
        result["introduction"] = user.introduction,
        result["userName"] = user.uname

    return (result, True)


@app.route('/settings/address', methods=['POST'])
@check_token
def get_address(customer, content):

    if customer.uid == int(content['userId']):
        result = {
            "streetAddress1": customer.streetAddress1,
            "streetAddress2": customer.streetAddress2,
            "city": customer.city,
            "state_province_region": customer.state_province_region,
            "zipCode": customer.zipCode
        }

        return (result, True)
    else:
        return ("customer id not match", False)


@app.route('/settings/getcredit', methods=['POST'])
@check_token
def get_credit(customer, content):

    result = {
        "cardName": None,
        "cardNumber": None,
        "expirationMonth": None,
        "expirationYear": None,
        "cvv": None
    }

    if customer.uid == int(content['userId']):
        result["cardName"] = customer.cardName
        result["cardNumber"] = customer.cardNumber
        result["expirationMonth"] = customer.expirationMonth
        result["expirationYear"] = customer.expirationYear
        result["cvv"] = customer.CVV

        return (result, True)
    else:
        return ("customer id not match", False)


