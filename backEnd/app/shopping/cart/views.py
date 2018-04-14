from app import app
from ...auth import check_token

@app.route('/addToCart', methods=['POST'])
@check_token
def AddRecipeToCart(customer, content):
    try:
        uid = str(customer.uid)
        rid = content['rid']
        quantity = content['quantity']

        json = {
            'state' : 'success',
            'message' : 'this is a message.'
        }
        return (json, True)
    except Exception as e:
        return (str(e), False)

