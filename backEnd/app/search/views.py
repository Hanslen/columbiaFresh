from app import app
from flask import request, jsonify
from collections import defaultdict
import difflib
import re
from ..search_models import Recipe
from ..search_models import Ingredient, Ingredient_in_recipe
from ..models import Customer


@app.route('/hotMenu', methods=['GET'])
def Get_hot_menu():
    try:
        hotMenus = Recipe.get_top_5_hot_recipes()
        json = {
            "menus" : hotMenus
        }
        return jsonify(json)
    except Exception as e:
        print(e)
        return jsonify({"status": "Fail", "info": str(e)})


@app.route('/search', methods=['GET'])
def Search_recipe():
    try:
        query = str(request.args.get('query'))
        query = ProcessSentence(query)
        page_id = request.args.get('page')
        page_id = int(page_id)
        all_recipes = Recipe.get_all_recipes()
        recipes_truncated = []
        score_recipe = defaultdict()
        for recipe in all_recipes:
            score = difflib.SequenceMatcher(a=query.lower(), b=recipe.title.lower()).ratio()
            score_recipe[score] = defaultdict()
            score_recipe[score]["id"] = recipe.rid
            score_recipe[score]["title"] = recipe.title
        sorted_score = sorted(score_recipe, reverse=True)
        start = 20 * (page_id - 1)
        count = 0
        for key in sorted_score:
            item = score_recipe[key]
            recipe = Recipe.get_recipe(item["id"])
            author = Customer.get_customer_info(recipe.uid)
            json = {
                "rid" : recipe.rid,
                "url" : "/recipe/" + str(recipe.rid),
                "imgurl" : recipe.img,
                "title" : recipe.title,
                "author" : author.uname,
                "likes" : recipe.likes,
                "ingredients" : GetIngredients(recipe.rid)
            }
            if start <= count:
                recipes_truncated.append(json)
            count += 1
        json = {
            "recipes" : recipes_truncated
        }
        return jsonify(json)
    except Exception as e:
        print(e)
        return jsonify({"status": "Fail", "info": str(e)})

def ProcessSentence(input):
    return re.sub('[!#$%&\'*+,;.^_`|~:]+', '', input)

def GetIngredients(rid):
    ingredient_json = []
    ingredients = Ingredient_in_recipe.get_ingredients_in_recipe(rid)

    for ingredient in ingredients:
        output = ""
        iid = ingredient.iid
        quantity = ingredient.quantity
        ingredient_info = Ingredient.get_ingredient(iid)
        iname = ingredient_info.iname
        recipeMetric = ingredient_info.recipeMetric
        if quantity >= 1.0:
            quantity = int(quantity)
            if recipeMetric != "" and quantity > 1:
                recipeMetric += "s"
        if recipeMetric == "":
            output = str(quantity) + " " + iname
        else:
            output = str(quantity) + " " + recipeMetric + " " + iname
        ingredient_json.append(output)

    return ingredient_json
