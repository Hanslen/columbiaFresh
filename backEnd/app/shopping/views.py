from app import app, db
from ..auth import check_token
from ..order_models import Order, OrderContainsRecipe
from ..search_models import Recipe, Ingredient_in_recipe, Ingredient
from ..cart_models import Cart
import pprint

@app.route('/orders', methods=['POST'])
@check_token
def GetUserOrders(customer, content):
    try:
        uid = customer.uid
        if uid != int(content['userId']):
            error = "Inconsistent user identifier!"
            return (str(error), False)
        else:
            orders = Order.get_orders_by_user(customer.uid)
            orders_Info = []
            if orders is not None:
                for order in orders:
                    recipes = OrderContainsRecipe.getOrderRecipe(order.oid)
                    # print("order.oid:{}".format(order.oid))
                    # print(recipes)
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
    for recipe in recipes:
        price += recipe.recipe_price * recipe.quantity

    return "{}".format(price)

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
            order = Order.query.filter(Order.oid == int(oid)).first()
            recipes = OrderContainsRecipe.getOrderRecipe(oid)
            if recipes is not None:
                for recipe_in in recipes:
                    recipe = Recipe.get_recipe(recipe_in.rid)
                    # Contents of ingredients should be added
                    ingredients = []
                    ingredients_list = Ingredient_in_recipe.get_ingredients_in_recipe(recipe_in.rid)
                    for ingr_in in ingredients_list:
                        item = Ingredient.get_ingredient(ingr_in.iid)
                        if item.isUserCreated is True:
                            continue
                        info = item.show_in_order()
                        info['number'] = ingr_in.quantity
                        ingredients.append(info)

                    temp_json = {
                        "recipeId": recipe.rid,
                        "img" : recipe.img,
                        "title" : recipe.title,
                        "price" : str(recipe_in.recipe_price * recipe_in.quantity),
                        "number" : recipe_in.quantity,
                        "ingredient" : ingredients
                    }
                    items.append(temp_json)
            json = {
                "date" : order.orderPlaceDate,
                "msg" : items
            }
            return (json, True)

    except Exception as e:
        return (str(e), False)



@app.route('/placeOrder', methods=['POST'])
@check_token
def placeOrder(customer, content):
    try:
        uid = str(customer.uid)
        if uid != content['uid']:
            error = "Inconsistent user identifier!"
            return (str(error), False)
        else:
            recipes = Cart.getCartRecipe(uid)
            if recipes is None:
                return ("Nothing in your cart!", False)
            else:
                order = Order(uid)
                db.session.add(order)
                db.session.commit()

                for recipe_in in recipes:
                    recipe = Recipe.get_recipe(recipe_in.rid)
                    # print("recipe_name:{}, recipe_id:{}".format(recipe.title, recipe.rid))
                    ingredients_list = Ingredient_in_recipe.get_ingredients_in_recipe(recipe_in.rid)
                    # print(ingredients_list)
                    recipe_price = 0
                    for ingr_in in ingredients_list:
                        item = Ingredient.get_ingredient(ingr_in.iid)
                        if item.isUserCreated is True:
                            continue
                        recipe_price += ingr_in.quantity * item.orderPrice

                    relation = OrderContainsRecipe(oid=order.oid, rid=recipe.rid, quantity=recipe_in.quantity, price=recipe_price)
                    db.session.add(relation)
                    db.session.commit()

                for recipe_in in recipes:
                    db.session.delete(recipe_in)
                    db.session.commit()
                json = {
                    "orderId": order.oid,
                    "message": "Issue order successfully ^_^"
                }
                return(json, True)

    except Exception as e:
        return (str(e), False)


