from app import app
from flask import request, jsonify
from collections import defaultdict
import difflib
import re
from ..search_models import Recipe, Recipe_category, Recipe_in_cate, Customer_like_recipe
from ..models import Customer


@app.route('/getRecipe', methods=['POST'])
def getRecipe():
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

        # To be added
        ingredients = []

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
                "ingredients": ingredients,
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
            "ingredients" : ingredients,
            "directions" : directions,
            "notes" : recipe_content.notes
        }
        return jsonify(json)

    except Exception as e:
        print (e)
        return jsonify({"status" : "Fail","info": str(e)})


@app.route('/likeRecipe', methods=['POST'])
def like_recipe():
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
        return jsonify({"status": "Fail", "info": str(e)})

@app.route('/hotMenu', methods=['GET'])
def get_hot_menu():
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
def search_recipe():
    try:
        query = str(request.args.get('query'))
        query = processSentence(query)
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
            ## ingredients should be added
            json = {
                "rid" : recipe.rid,
                "url" : "/recipe/" + str(recipe.rid),
                "imgurl" : recipe.img,
                "title" : recipe.title,
                "author" : author.uname,
                "likes" : recipe.likes,
                "ingredients" : []
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

def processSentence(input):
    return re.sub('[!#$%&\'*+,;.^_`|~:]+', '', input)
