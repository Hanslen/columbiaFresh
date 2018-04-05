from app import app
from flask import request, jsonify
from collections import defaultdict
import difflib
import re
from ...search_models import Recipe
from ...search_models import Recipe_in_cate, Recipe_category, Ingredient, Ingredient_in_recipe
from ...models import Customer

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
def create_recipe():
    try:
        content = request.json
        token = content['token']
        (result, customer) = Customer.verify_token(token)

        if result is False:
            return jsonify({"success": False, "msg": "Token Error"})

        dire = process_directions(content['directions'])

        recipe = Recipe(title=content['title'],
                        img=content['img'],
                        likes=0,
                        notes=content['notes'],
                        description=content['description'],
                        directions=dire,
                        uid=customer.uid
                        )

        rid = Recipe.create_recipe(recipe)

        # add categories relationship record
        categories = content['tag']
        for category in categories:
            Recipe_in_cate.add(rid, category)

        # add ingredients relationship record
        ingredients = content['ingredients']
        for ingredient in ingredients:
            iname = ingredient[0]
            quantity = ingredient[1]
            Ingredient_in_recipe.add(rid=rid, iname=iname, quantity=quantity)

        return jsonify({
            "success": True,
            "msg": "Successfully create recipe."
                       })

    except Exception as e:
        print(e)
        return jsonify({"success": False, "info": str(e)})

def process_directions(steps):
    str = '###'
    return str.join(steps)






