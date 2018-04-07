from app import app
from ..auth import check_token

@app.route('/addToCart', methods=['GET'])
@check_token
def AddRecipeToCart():
    try:
        return None
    except Exception as e:
        print(e)
        return ({"state": "fail", "message": str(e)}, False)

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