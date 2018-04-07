from app import app
from ..auth import check_token
from ..order_models import Order

@app.route('/addToCart', methods=['POST'])
@check_token
def AddRecipeToCart(customer, content):
    try:
        uid = str(customer.uid)
        rid = content['rid']
    except Exception as e:
        return (str(e), False)


@app.route('/orders', methods=['POST'])
@check_token
def GetUserOrders(customer, content):
    try:
        uid = str(customer.uid)
        if uid != content['uid']:
            error = "Inconsistent user identifier!"
            return (str(error), False)
        else:
            pass

    except Exception as e:
        return (str(e), False)



# from app.shopping_model import Order
# from ..auth import check_token
#
# @app.route("/order",methods=['POST'])
# @check_token
# def get_order(customer, content):
#     if customer.uid == int(content['id']):
#         order_list = Order.find_order_by_user_id()
#         return (order_list, True)
#
#     return ('Customer id not match', False)