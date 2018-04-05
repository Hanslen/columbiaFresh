from app import app
from flask import request, jsonify
from ...search_models import Recipe
from ...search_models import Recipe_in_cate, Recipe_category, Ingredient, Ingredient_in_recipe
from ...auth import check_token

# need an API to tell fron-end about the recipe categories and ingredient list.

@app.route('/getRecipeTags', methods=['GET'])
def get_recipe_category():
    result = []
    categories = Recipe_category.get_all()
    for cate in categories:
        result.append(cate.rcname)

    return jsonify({"tags":result})

@app.route('/getIngredients', methods=['GET'])
def get_ingredients():
    result = []
    ingredients = Ingredient.get_all()
    for ingr in ingredients:
        result.append([ingr.iname, ingr.recipeMetric])

    return jsonify({"ingredients":result})

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
        for ingredient in ingredients:
            iname = ingredient[0]
            quantity = ingredient[1]
            Ingredient_in_recipe.add(rid=rid, iname=iname, quantity=quantity)

        return ("Successfully create recipe.", True)

    except Exception as e:
        print(e)
        return (str(e), False)

def process_directions(steps):
    str = '###'
    return str.join(steps)






