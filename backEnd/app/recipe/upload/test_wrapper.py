from app import app
from ...auth import check_token

@app.route('/test_wrapper', methods=['POST'])
@check_token
def test_wrapper(customer, content):
    try:
        result = {
            "email": None,
            "token": content['token']
        }
        result["firstname"] = customer.email
        return (result, True)

    except Exception as e:
        return (str(e), False)
