from manage import app, db
from flask import url_for, jsonify
from .models import Customer

class Ingredient(db.Model):
    __tablename__ = 'ingredient'
    iid = db.Column(db.Integer, primary_key=True, index=True)
    iname = db.Column(db.String(100), nullable=False)
    recipeMetric = db.Column(db.String(100), nullable=False)
    orderPrice = db.Column(db.Float, nullable=False)
    shouldConvert = db.Column(db.Boolean, nullable=False)

    @staticmethod
    def get_ingredient(iid):
        temp = Ingredient.query.filter(Ingredient.iid == iid).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

class Ingredient_in_cate(db.Model):
    __tablename__ = 'ingredient_in_cate'
    iid = db.Column(db.Integer, db.ForeignKey('ingredient.iid'), primary_key=True)
    icid = db.Column(db.Integer, db.ForeignKey('ingredient_category.icid'), primary_key=True)

    @staticmethod
    def get_ingredient_category_id(iid):
        temp = Ingredient_in_cate.query.filter(Ingredient_in_cate.iid == iid).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

class Ingredient_category(db.Model):
    __tablename__ = 'ingredient_category'
    icid = db.Column(db.Integer, primary_key=True, index=True)
    icname = db.Column(db.String(45), nullable=False)

    @staticmethod
    def get_ingredient_category(icid):
        temp = Ingredient_category.query.filter(Ingredient_category.icid == icid).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

class Ingredient_in_recipe(db.Model):
    __tablename__ = 'ingredient_in_recipe'
    iid = db.Column(db.Integer, db.ForeignKey('ingredient.iid'), primary_key=True)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    quantity = db.Column(db.Float, nullable=False)

    @staticmethod
    def get_quantity_in_recipe(iid, rid):
        temp = Ingredient_in_recipe.query.filter(Ingredient_in_recipe.iid == iid). \
            filter(Ingredient_in_recipe.rid == rid).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

    @staticmethod
    def get_ingredients_in_recipe(rid):
        temp = Ingredient_in_recipe.query.filter(Ingredient_in_recipe.rid == rid).all()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp


class Recipe(db.Model):
    __tablename__ = 'recipe'
    rid = db.Column(db.Integer, primary_key=True, index = True)
    title = db.Column(db.String(45), nullable=False)
    img = db.Column(db.Text)
    likes = db.Column(db.Integer, default=0)
    description = db.Column(db.String(300))
    calories = db.Column(db.Integer)
    notes = db.Column(db.String(100))
    directions = db.Column(db.Text)
    preptime = db.Column(db.Integer)
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'))

    @staticmethod
    def get_recipe(rid):
        temp = Recipe.query.filter(Recipe.rid == rid).first()
        if temp is None:
           print("The object does not exist!")
        else:
            return temp

    @staticmethod
    def get_top_5_hot_recipes():
        recipes_id = Recipe.query.order_by(Recipe.likes.desc()).limit(5).all()
        recipesName = []
        for recipe_id in recipes_id:
            recipesName.append(recipe_id.title)
        return recipesName

    @staticmethod
    def get_all_recipes():
        return Recipe.query.all()


class Recipe_category(db.Model):
    __tablename__ = 'recipe_category'
    rcid = db.Column(db.Integer, primary_key=True, index=True)
    rcname = db.Column(db.String(45),nullable=False)

    @staticmethod
    def get_recipe_category(rcid):
        temp = Recipe_category.query.filter(Recipe_category.rcid == rcid).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

class Recipe_in_cate(db.Model):
    __tablename__ = 'recipe_in_cate'
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    rcid = db.Column(db.Integer, db.ForeignKey('recipe_category.rcid'), primary_key=True,)

    @staticmethod
    def get_recipe_cate(rid):
        temp = Recipe_in_cate.query.filter(Recipe_in_cate.rid == rid).all()
        if temp is None:
           print("The object does not exist!")
        else:
            return temp

class Customer_like_recipe(db.Model):
    __tablename__ = 'customer_like_recipe'
    uid = db.Column(db.Integer, db.ForeignKey('customer.uid'), primary_key=True,)
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True,)
    liked_time = db.Column(db.DateTime, nullable=False)

    @staticmethod
    def get_if_customer_likes(uid, rid):
        temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid).\
            filter(Customer_like_recipe.rid == rid).first()
        if temp is None:
           return False
        else:
            return True

    @staticmethod
    def remove_customer_like(uid, rid):
        temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid). \
            filter(Customer_like_recipe.rid == rid).first()
        if temp is None:
            print("The record doesn't exist!")
            return False
        else:
            delRecord = temp
            db.session.delete(delRecord)
            temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid).\
                filter(Customer_like_recipe.rid == rid).first()
            recipe_content = Recipe.get_recipe(rid).first()
            prevLikes = recipe_content.likes
            curLikes = prevLikes - 1
            recipe_content.likes = curLikes
            db.session.commit()
            updated_recipe_content = Recipe.get_recipe(rid).first()
            if temp is None and updated_recipe_content.likes == (prevLikes - 1):
                return True
            else:
                return False

    @staticmethod
    def add_customer_like(uid, rid):
        temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid). \
            filter(Customer_like_recipe.rid == rid).first()
        if temp:
            print("The record exists!")
            return False
        else:
            import time
            curTime = time.strftime('%Y-%m-%d %H:%M:%S')
            addRecord = Customer_like_recipe(uid, rid, curTime)
            db.session.add(addRecord)
            temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid). \
                filter(Customer_like_recipe.rid == rid).first()
            recipe_content = Recipe.get_recipe(rid)
            prevLikes = recipe_content.likes
            curLikes = prevLikes + 1
            recipe_content.likes = curLikes
            db.session.commit()
            updated_recipe_content = Recipe.get_recipe(rid)
            if temp and updated_recipe_content.likes == (prevLikes + 1):
                return True
            else:
                return False

    # @staticmethod
    def __init__(self, uid, rid, datetime):
        self.uid = uid
        self.rid = rid
        self.liked_time = datetime
