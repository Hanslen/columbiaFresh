from app import app, db
from ...auth import check_token
from ...cart_models import Cart
from ...search_models import Recipe, Ingredient_in_recipe, Ingredient
import sys, os

@app.route('/deleteShoppingCartItem', methods=['POST'])
@check_token
def deleteShoppingCartItem(customer, content):
    try:
        recipe = Cart.getCartRecipeByID(customer.uid, int(content['rid']))
        db.session.delete(recipe)
        db.session.commit()
        return ("yeah", True)

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))

        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)

@app.route('/recipe/increasenum', methods=['POST'])
@check_token
def IncreaseNum(customer, content):
    try:
        recipe_in = Cart.getCartRecipeByID(customer.uid, int(content['rid']))
        Cart.ModifyRecordContent(customer.uid, int(content['rid']), recipe_in.quantity, 'add')
        return ("yeah", True)

    except Exception as e:
        return (str(e), False)

@app.route('/recipe/decreasenum', methods=['POST'])
@check_token
def DecreaseNum(customer, content):
    try:
        recipe_in = Cart.getCartRecipeByID(customer.uid, int(content['rid']))
        Cart.ModifyRecordContent(customer.uid, int(content['rid']), recipe_in.quantity, 'deduct')
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

