from manage import app, db
from flask import url_for, jsonify

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
    uid = db.Column(db.Integer, db.ForeignKey('Customer.uid'))

    @staticmethod
    def get_recipe(rid):
        temp = Recipe.query.filter(Recipe.rid == rid).first()
        if temp is None:
           print("The object does not exist!")
        else:
            return temp

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
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True)
    rcid = db.Column(db.Integer, db.ForeignKey('Recipe_category.rcid'), primary_key=True,)

    @staticmethod
    def get_recipe_cate(rid):
        temp = Recipe_in_cate.query.filter(Recipe_in_cate.rid == rid).all()
        if temp is None:
           print("The object does not exist!")
        else:
            return temp

class Customer_like_recipe(db.Model):
    __tablename__ = 'customer_like_recipe'
    uid = db.Column(db.Integer, db.ForeignKey('Customer.uid'), primary_key=True,)
    rid = db.Column(db.Integer, db.ForeignKey('Recipe.rid'), primary_key=True,)
    liked_time = db.Column(db.DateTime, nullable=False)

    @staticmethod
    def get_if_customer_likes(uid, rid):
        temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid).\
            filter(Customer_like_recipe.rid == rid).first()
        if temp is None:
           return False
        else:
            return True