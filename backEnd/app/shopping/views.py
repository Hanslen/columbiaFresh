from app import app
from ..auth import check_token
from ..order_models import Order, OrderContainItems
from ..search_models import Recipe, Ingredient_in_recipe, Ingredient

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
            orders = Order.getOrders(customer.uid)
            orders_Info = []
            if orders is not None:
                for order in orders:
                    recipes = OrderContainItems.getOrderRecipe(order.oid)
                    first_recipe = Recipe.get_recipe(int(recipes[0]))
                    if recipes is not None:
                        # Total price should be added
                        temp_json = {
                            "orderPlaceDate" : str(order.orderPlaceDate),
                            "totalPrice" :"",
                            "shipTo" : order.shipTo,
                            "orderID" : order.oid,
                            "deliveredDate" : order.deliveredDate,
                            "soldBy" : order.soldBy,
                            "title" : first_recipe.title,
                            "img" : first_recipe.img
                        }
                        orders_Info.append(temp_json)
            json = {
                "msg" : orders_Info
            }
            return (json, True)
    except Exception as e:
        return (str(e), False)

@app.route('/getorder', methods=['POST'])
@check_token
def GetEachOrderContent(customer, content):
    try:
        uid = str(customer.uid)
        if uid != content['uid']:
            error = "Inconsistent user identifier!"
            return (str(error), False)
        else:
            oid = content['orderId']
            items = []
            recipes = OrderContainItems.getOrderRecipe(int(oid))
            if recipes is not None:
                for recipe in recipes:
                    ingredients = []


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