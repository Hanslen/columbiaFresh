from app import app
from ...auth import check_token
from ...cart_models import Cart
from ...search_models import Recipe, Ingredient_in_recipe, Ingredient

@app.route('/recipe/increasenum', methods=['POST'])
@check_token
def IncreaseNum(customer, content):
    try:

        # Cart.ModifyRecordContent(customer.uid, int(content['rid']), quantity, 'add')
        return ("yeah", True)

    except Exception as e:
        return (str(e), False)

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

@app.route('/shoppingCart', methods=['POST'])
@check_token
def getCart(customer, content):
    try:
        uid = str(customer.uid)
        if uid != content['uid']:
            error = "Inconsistent user identifier!"
            return (str(error), False)

        else:
            recipes = Cart.getCartRecipe(uid)
            recipe_list = []
            if recipes is not None:
                for recipe_in in recipes:
                    item = {}
                    recipe = Recipe.get_recipe(recipe_in.rid)
                    ingredients_list = Ingredient_in_recipe.get_ingredients_in_recipe(recipe_in.rid)

                    recipe_price = 0
                    for ingr_in in ingredients_list:
                        temp = Ingredient.get_ingredient(ingr_in.iid)
                        recipe_price += ingr_in.quantity * temp.orderPrice

                    item["img"]= recipe.img,

                    item["price"] = recipe_price
                    item["number"] =  recipe_in.quantity
                    item["id"] = recipe.rid
                    item["title"] = recipe.title
                    recipe_list.append(item)
                    ingr_list = []
                    for ingr_in in ingredients_list:
                        temp = Ingredient.get_ingredient(ingr_in.iid)
                        info = temp.show_in_order()
                        info['number'] = ingr_in.quantity
                        ingr_list.append(info)

                    item["ingredient"] = ingr_list
            return (recipe_list, True)
    except Exception as e:
        return (str(e), False)

