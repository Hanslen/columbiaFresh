from app import app
from flask import request, jsonify
from collections import defaultdict
import re
import math
from fuzzywuzzy import fuzz
from ..search_models import Recipe, Recipe_category, Recipe_in_cate
from ..search_models import Ingredient, Ingredient_in_recipe
from ..models import Customer
from ..auth import return_format


@app.route('/hotMenu', methods=['GET'])
@return_format
def Get_hot_menu():
    try:
        hotMenus = Recipe.get_top_5_hot_recipes()
        json = {
            "menus" : hotMenus
        }
        return (json, True)
    except Exception as e:
        print(e)
        return (str(e), False)

@app.route('/rank', methods=['GET'])
@return_format
def Get_Ranked_menu():
    try:
        page_id = request.args.get('page')
        page_id = int(page_id)
        perPage = int(request.args.get('perPage'))
        recipes = Recipe.get_recipes_by_rank()
        recipes_truncated = []
        start = perPage * (page_id - 1)
        if start > len(recipes):
            return ("Doesn't contain the required number of records", False)
        count = 0
        for recipe in recipes:
            author = Customer.get_customer_info(recipe.uid)
            json = {
                "rid": recipe.rid,
                "url": "/recipe/" + str(recipe.rid),
                "imgurl": recipe.img,
                "title": recipe.title,
                "author": author.uname,
                "likes": recipe.likes,
                "ingredients": GetIngredients(recipe.rid)
            }
            if start <= count:
                recipes_truncated.append(json)
                if len(recipes_truncated) >= perPage:
                    break
            count += 1
            if len(recipes_truncated) >= perPage:
                break
        json = {
            "recipes" : recipes_truncated
        }
        return (json, True)
    except Exception as e:
        print(e)
        return (str(e), False)

@app.route('/page', methods=['GET'])
@return_format
def Get_Search_Results_Pages():
    try:
        query = str(request.args.get('query'))
        perPage = int(request.args.get('perPage'))
        if perPage == 0:
            return ("Bad perPage parameter", False)
        total_recipes_number = len(Recipe.get_all_recipes())
        total_pages = math.ceil(total_recipes_number / perPage)
        json = {
            'pages' : total_pages
        }
        return (json, True)
    except Exception as e:
        print(e)
        return (str(e), False)


@app.route('/search', methods=['GET'])
@return_format
def Search_recipe():
    try:
        query = str(request.args.get('query'))
        query = ProcessSentence(query)
        page_id = request.args.get('page')
        page_id = int(page_id)
        perPage = int(request.args.get('perPage'))
        recipes_truncated = []
        score_recipe, recipe_length = GetScoredRecipes(query)
        sorted_score = sorted(score_recipe, reverse=True)
        start = perPage * (page_id - 1)
        if start > recipe_length:
            return ("Doesn't contain the required number of records", False)
        count = 0
        for key in sorted_score:
            item = score_recipe[key]
            for id in item.keys():
                recipe = Recipe.get_recipe(id)
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
                    if len(recipes_truncated) >= perPage:
                        break
                count += 1
            if len(recipes_truncated) >= perPage:
                break
        json = {
            "recipes" : recipes_truncated
        }
        return (json, True)
    except Exception as e:
        print(e)
        return (str(e), False)



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
            output = {
                "name" : iname,
                "quantity" : str(quantity)
            }
        else:
            output = {
                "name" : iname,
                "quantity" : str(quantity) + " " + recipeMetric
            }
        ingredient_json.append(output)

    return ingredient_json

def GetScoredRecipes(query):
    all_recipes = Recipe.get_all_recipes()
    score_recipe = defaultdict()
    for recipe in all_recipes:
        rid = recipe.rid
        category_ids = Recipe_in_cate.get_recipe_cate(rid)
        author = Customer.get_customer_info(recipe.uid)
        combined_content = recipe.title + " " + author.uname
        for category_id in category_ids:
            category = Recipe_category.get_recipe_category(category_id.rcid)
            temp = category.rcname.split("-")
            temp = ' '.join(temp)
            combined_content += " " + temp
        score = fuzz.partial_ratio(query.lower(), combined_content.lower())
        if score not in score_recipe.keys():
            score_recipe[score] = defaultdict()
        score_recipe[score][recipe.rid] = recipe.title
    return score_recipe, len(all_recipes)
