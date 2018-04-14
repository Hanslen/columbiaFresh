from app import app
from ..auth import check_token
from ..order_models import Order, OrderContainsRecipe
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
        if uid != content['userId']:
            error = "Inconsistent user identifier!"
            return (str(error), False)
        else:
            orders = Order.get_orders_by_user(customer.uid)
            orders_Info = []
            if orders is not None:
                for order in orders:
                    recipes = OrderContainsRecipe.getOrderRecipe(order.oid)
                    if recipes is not None:
                        first_recipe = Recipe.get_recipe(recipes[0].rid)
                        # Total price should be added
                        temp_json = {
                            "orderPlaceDate" : str(order.orderPlaceDate),
                            "totalPrice" : calculate_price(recipes),
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

def calculate_price(recipes):
    price = 0
    return price

@app.route('/getorder', methods=['POST'])
@check_token
def GetEachOrderContent(customer, content):
    try:
        uid = str(customer.uid)
        if uid != content['userId']:
            error = "Inconsistent user identifier!"
            return (error, False)
        else:
            oid = content['orderId']
            items = []
            recipes = OrderContainsRecipe.getOrderRecipe(oid)
            if recipes is not None:
                for recipe_in in recipes:
                    recipe = Recipe.get_recipe(recipe_in.rid)
                    # Contents of ingredients should be added
                    ingredients = []
                    ingredients_list = Ingredient_in_recipe.get_ingredients_in_recipe(recipe_in.rid)
                    for ingr_in in ingredients_list:
                        item = Ingredient.get_ingredient(ingr_in.iid)
                        info = item.show_in_order()
                        info['number'] = ingr_in.quantity
                        ingredients.append(info)

                    temp_json = {
                        "recipeId": recipe.rid,
                        "img" : recipe.img,
                        "title" : recipe.title,
                        # Total price should be added
                        "price" : "0",
                        "number" : recipe_in.quantity,
                        "item" : ingredients
                    }
                    items.append(temp_json)
            json = {
                "msg" : items
            }
            return (json, True)

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