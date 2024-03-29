from app import app, db
from flask import request
import re
from ..search_models import Recipe, Recipe_category, Recipe_in_cate, Customer_like_recipe
from ..search_models import Ingredient, Ingredient_in_recipe
from ..models import Customer
from ..cart_models import Cart
from ..auth import check_token, return_format
import os, sys

@app.route('/myrecipe/folder', methods=['POST'])
@check_token
def GetRecipeFolder(customer, content):
    try:
        lis = Recipe.get_recipe_by_uid(int(content['userId']))

        result = []
        for recipe in lis:
            if recipe.has_tag(content['tag']) is True:
                json = {}
                json['id'] = recipe.rid
                json['title'] = recipe.title
                json['src'] = recipe.img
                result.append(json)
        return (result, True)


    except Exception as e:

        exc_type, exc_obj, exc_tb = sys.exc_info()

        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]

        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))

        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)


@app.route('/myrecipe/tags', methods=['POST'])
@check_token
def GetRecipeTags(customer, content):
    try:
        json = {}
        my_recipes = Recipe.get_recipe_by_uid(int(content['userId']))
        tags = set()
        for recipe in my_recipes:
            cate = recipe.find_cat()
            for item in cate:
                tags.add(item)
        json['tags'] = list(tags)
        return (json, True)

    except Exception as e:
        print (e)
        return (str(e), False)


@app.route('/getRecipe', methods=['POST'])
@return_format
def GetRecipe():
    try:
        # read the posted values from the UI
        content = request.json
        rid = str(content['rid'])
        uid = str(content['uid'])

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
                "rid": str(rid),
                "title": recipe_content.title,
                "img": recipe_content.img,
                "likes": recipe_content.likes,
                "isLiked": False,
                "tags": categories,
                "aid": author_user_info.uid,
                "avatar": author_user_info.img,
                "author": author_user_info.uname,
                "description": recipe_content.description,
                "calorie": recipe_content.calories,
                "preptime": recipe_content.preptime,
                "ingredients": ingredient_json,
                "directions": directions,
                "notes": recipe_content.notes
            }
            return (json, True)


        isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)

        json = {
            "rid" : str(rid),
            "title" : recipe_content.title,
            "img" : recipe_content.img,
            "likes" : recipe_content.likes,
            "isLiked" : isLiked,
            "tags" : categories,
            "aid" : author_user_info.uid,
            "avatar" : author_user_info.img,
            "author" : author_user_info.uname,
            "description" : recipe_content.description,
            "calorie" : recipe_content.calories,
            "preptime" : recipe_content.preptime,
            "ingredients" : ingredient_json,
            "directions" : directions,
            "notes" : recipe_content.notes
        }
        return (json, True)


    except Exception as e:

        exc_type, exc_obj, exc_tb = sys.exc_info()

        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]

        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))

        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)


@app.route('/likeRecipe', methods=['POST'])
@check_token
def Like_recipe(customer, content):
    try:
        rid = content['rid']
        uid = str(customer.uid)
        curLike = str(content['like'])

        if curLike.lower() == "false":
            curLike = False
        elif curLike.lower() == "true":
            curLike = True
        else:
            curLike = ""

        isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
        recipe_content = Recipe.get_recipe(rid)

        if isLiked and curLike:
            if Customer_like_recipe.remove_customer_like(uid, rid):
                isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
                if isLiked != curLike:
                    state = "success"
                    message = "The record is modified!"
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return (json, True)
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
                    return (json, False)
        elif not isLiked and not curLike:
            if Customer_like_recipe.add_customer_like(uid, rid):
                isLiked = Customer_like_recipe.get_if_customer_likes(uid, rid)
                if isLiked != curLike:
                    state = "success"
                    message = "The record is modified!"
                    likes = Recipe.get_recipe(rid).likes
                    json = {
                        "state": state,
                        "message": message,
                        "likes": likes,
                        "isLiked": isLiked
                    }
                    return (json, True)
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
                    return (json, False)
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
            return (json, False)


    except Exception as e:

        exc_type, exc_obj, exc_tb = sys.exc_info()

        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]

        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))

        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)


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

@app.route('/deleteRecipe', methods=['POST'])
@check_token
def delete_recipe(customer, content):
    try:
        rid = int(content['rid'])
        recipe = Recipe.get_recipe(rid)
        recipe_in_cart = Cart.query.filter(Cart.rid == rid).all()
        print(recipe_in_cart)
        for to_del_recipe in recipe_in_cart:
            print("to_del_recipe_in_cart:{}".format(recipe_in_cart))
            db.session.delete(to_del_recipe)
            db.session.commit()

        recipe_in_list = Customer_like_recipe.query.filter(Customer_like_recipe.rid == rid).all()
        for to_del_recipe in recipe_in_list:
            print("to_del_recipe_in_favorite_list:{}".format(to_del_recipe))
            db.session.delete(to_del_recipe)
            db.session.commit()
        recipe.isDeleted = True
        return ('Delete your recipe successfully!', True)

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print("exc_type:{}, fname:{}, line:{}".format(exc_type, fname, exc_tb.tb_lineno))
        return ("exc_type:{}, fname:{}, line:{}, error:{}".format(exc_type, fname, exc_tb.tb_lineno, e), False)
