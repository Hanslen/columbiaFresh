from app import app
from ..auth import check_token
from ..search_models import Customer_like_recipe, Recipe

@app.route('/getfavouritelist', methods=['POST'])
@check_token
def GetFavoriteList(customer, content):
    try:
        uid = content['userId']
        favorite_recipe_list = Customer_like_recipe.get_user_liked_recipes(uid)
        liked_recipe = []
        if favorite_recipe_list is None:
            return ([{}], False)
        else:
            for favorite_recipe in favorite_recipe_list:
                rid = favorite_recipe.rid
                recipe_content = Recipe.get_recipe(rid)
                if recipe_content is not None:
                    json = {
                        'id' : str(rid),
                        'title' : recipe_content.title,
                        'src' : recipe_content.img
                    }
                    liked_recipe.append(json)
                else:
                    continue
        return (liked_recipe, True)
    except Exception as e:
        return (str(e), False)

