from app import app
from flask import request, jsonify
import re
from ..search_models import Recipe, Recipe_category, Recipe_in_cate, Customer_like_recipe
from ..search_models import Ingredient, Ingredient_in_recipe
from ..models import Customer


@app.route('/getRecipe', methods=['POST'])
def GetRecipe():
    try:
        # read the posted values from the UI
        content = request.json

        rid = content['rid']
        uid = content['uid']

        recipe_content = Recipe.get_recipe(rid)
        recipe_cate_ids = Recipe_in_cate.get_recipe_cate(rid)

        categories = []
        for recipe_cate_id in recipe_cate_ids:
            temp_category = Recipe_category.get_recipe_category(recipe_cate_id.rcid)
            categories.append(temp_category.rcname)

        directions_string = recipe_content.directions.split("#")
        directions = []
        for item in directions_string:
            if len(item) > 0:
                directions.append(item)

        ingredient_json = GetIngredients(rid)

        author_user_info = Customer.get_customer_info(recipe_content.uid)

        if uid is None or len(uid) == 0:
            json = {
                "rid": rid,
                "title": recipe_content.title,
                "img": recipe_content.img,
                "likes": recipe_content.likes,
                "isLiked": False,
                "tags": categories,
                "aid": recipe_content.uid,
                "avatar": author_user_info.img,
                "author": author_user_info.uname,
                "description": recipe_content.description,
                "calorie": recipe_content.calories,
                "preption": recipe_content.preptime,
                "ingredients": ingredient_json,
                "directions": directions,
                "notes": recipe_content.notes
            }
            return jsonify(json)


        isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)

        json = {
            "rid" : rid,
            "title" : recipe_content.title,
            "img" : recipe_content.img,
            "likes" : recipe_content.likes,
            "isLiked" : isLiked,
            "tags" : categories,
            "aid" : uid,
            "avatar" : author_user_info.img,
            "author" : author_user_info.uname,
            "description" : recipe_content.description,
            "calorie" : recipe_content.calories,
            "preption" : recipe_content.preptime,
            "ingredients" : ingredient_json,
            "directions" : directions,
            "notes" : recipe_content.notes
        }
        return jsonify(json)

    except Exception as e:
        print (e)
        return jsonify({"status" : "Fail","info": str(e)})


@app.route('/likeRecipe', methods=['POST'])
def Like_recipe():
    try:
        content = request.json
        rid = content['rid']
        uid = content['uid']
        curLike = content['like']

        if curLike.lower() == "false":
            curLike = False
        elif curLike.lower() == "true":
            curLike = True
        else:
            curLike = ""


        isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
        recipe_content = Recipe.get_recipe(rid)

        if isLiked and not curLike:
            if Customer_like_recipe.remove_customer_like(uid, rid):
                isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
                if isLiked == curLike:
                    state = "success"
                    message = "The record is modified!"
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return jsonify(json)
                else:
                    state = "fail"
                    message = "The like record is not consistent."
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return jsonify(json)
        elif not isLiked and curLike:
            if Customer_like_recipe.add_customer_like(uid, rid):
                isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
                if isLiked == curLike:
                    state = "success"
                    message = "The record is modified!"
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return jsonify(json)
                else:
                    state = "fail"
                    message = "The like record is not consistent."
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return jsonify(json)
        else:
            state = "fail"
            message = "The like record can't be modified!"
            likes = recipe_content.likes
            json = {
                "state" : state,
                "message" : message,
                "likes" : likes,
                "isLiked" : isLiked
            }
            return jsonify(json)

    except Exception as e:
        print(e)
        return jsonify({"state": "fail", "info": str(e)})


@app.route('/addToCart', methods=['GET'])
def AddRecipeToCart():
    try:
        return None
    except Exception as e:
        print(e)
        return jsonify({"state": "fail", "message": str(e)})



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