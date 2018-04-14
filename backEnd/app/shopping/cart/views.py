from app import app
from ...auth import check_token
from ...cart_models import Cart

@app.route('/addToCart', methods=['POST'])
@check_token
def AddRecipeToCart(customer, content):
    try:
        uid = str(customer.uid)
        rid = content['rid']

        valid, quantity = Cart.CheckIfCartItemExists(uid, rid)
        if valid:
            if Cart.ModifyRecordContent(uid, rid, quantity, "add"):
                json = {
                    'state': 'success',
                    'message': 'Modified the record quantity...'
                }
                return (json, True)
            else:
                json = {
                    'state': 'fail',
                    'message': 'Internal Error...'
                }
                return (json, False)
        else:
            if Cart.AddRecord(uid, rid, 1):
                json = {
                    'state': 'success',
                    'message': 'Added a record with quantity 1...'
                }
                return (json, True)
            else:
                json = {
                    'state': 'fail',
                    'message': 'Internal Error...'
                }
                return (json, False)
    except Exception as e:
        return (str(e), False)

