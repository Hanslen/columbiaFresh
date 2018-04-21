from app import app, db
from flask import jsonify, make_response
import os, sys
from ...search_models import Recipe
from ...search_models import Recipe_in_cate, Recipe_category, Ingredient, Ingredient_in_recipe
from ...auth import check_token, return_format


# need an API to tell fron-end about the recipe categories and ingredient list.
@app.route('/getRecipeTags', methods=['GET'])
@return_format
def get_recipe_category():
    try:
        result = []
        categories = Recipe_category.get_all()
        for cate in categories:
            result.append(cate.rcname)
        return (result, True)

    except Exception as e:
        return (str(e), False)


@app.route('/getIngredients', methods=['GET'])
@return_format
def get_ingredients():
    try:
        result = []
        ingredients = Ingredient.get_all()
        for ingr in ingredients:
            if ingr.isUserCreated is False:
                result.append([ingr.iname, ingr.recipeMetric])

        return (result, True)

    except Exception as e:
        return (str(e), False)

@app.route('/createRecipe', methods=['POST'])
@check_token
def create_recipe(customer, content):
    try:
        dire = process_directions(content['directions'])
        recipe = Recipe(content, dire, int(customer.uid))
        rid = Recipe.create_recipe(recipe)

        # add categories relationship record
        categories = content['tag']
        for category in categories:
            cid = Recipe_category.get_id_by_name(category).rcid
            Recipe_in_cate.add(rid, cid)

        # add ingredients relationship record
        ingredients = content['ingredients']
        pool = set()
        ingredients = Ingredient.get_all()

        for ingr in ingredients:
            if ingr.isUserCreated is False:
                pool.add(ingr.iname)

        add_ingr = content['ingredients']
        for ingredient in add_ingr:
            iname = ingredient[0]
            quantity = ingredient[1]
            if iname in pool:
                Ingredient_in_recipe.add(rid=rid, iname=iname, quantity=quantity)

            else:
                new_ingr = Ingredient(name=ingredient[0], isUserCreated=True, recipeMetric=ingredient[2])
                db.session.add(new_ingr)
                db.session.commit()
                Ingredient_in_recipe.add(rid=rid, iname=ingredient[0], quantity=ingredient[1])
        return ("Successfully create recipe ^_^", True)


    except Exception as e:

        exc_type, exc_obj, exc_tb = sys.exc_info()

        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]

        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))

        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)


def process_directions(steps):
    str = '###'
    return str.join(steps)






