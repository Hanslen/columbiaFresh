from manage import app, db

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

    @staticmethod
    def get_all():
        return Ingredient.query.all()

    def show_in_order(self):
        return {
            "id": self.iid,
            "img": "need to add in db",
            "title": self.iname,
            "price": self.orderPrice
	    }

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

    def __init__(self, iid, rid, quantity):
        self.iid = iid
        self.rid = rid
        self.quantity = quantity

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

    @staticmethod
    def add(rid, iname, quantity):
        iid = Ingredient.query.filter_by(iname=iname).first().iid
        new_relation = Ingredient_in_recipe(iid, rid, quantity)
        app.logger.info('add new ingredient and recipe relationship')
        db.session.add(new_relation)
        db.session.commit()


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
    isDeleted = db.Column(db.Integer)

    def __init__(self, content, dire, uid):
        self.title=content['title'],
        self.img=content['img'],
        self.likes=0,
        self.notes=content['notes'],
        self.description=content['description'],
        self.directions=dire,
        self.uid=uid

    def find_cat(self):
        cats = Recipe_in_cate.query.filter(Recipe_in_cate.rid == self.rid).all()
        result = set()
        for cat in cats:
            temp = Recipe_category.query.filter(Recipe_category.rcid == cat.rcid).first()
            result.add(temp.rcname)
        return result

    def has_tag(self, tag):
        pool = self.find_cat()
        if tag in pool:
            return True
        else: return False

    @staticmethod
    def get_recipe(rid):
        temp = Recipe.query.filter(Recipe.rid == rid).first()
        if temp is None or temp.isDeleted == 1:
           print("The object does not exist!")
           return None
        else:
            return temp

    @staticmethod
    def get_top_5_hot_recipes():
        recipes = Recipe.query.order_by(Recipe.likes.desc()).all()
        recipesName = []
        for recipe in recipes:
            if recipe.isDeleted == 1:
                continue
            recipesName.append(recipe.title)
            if len(recipesName) > 5:
                break
        return recipesName

    @staticmethod
    def get_all_recipes():
        return Recipe.query.filter(Recipe.isDeleted == 0).all()

    @staticmethod
    def create_recipe(recipe):
        app.logger.info(recipe.rid)
        db.session.add(recipe)
        db.session.commit()
        return recipe.rid

    @staticmethod
    def get_recipe_in_order(oid):
        result = Recipe.query.filter(Recipe.order.any(oid=oid)).all()
        return result

    @staticmethod
    def get_recipe_by_uid(uid):
        result = Recipe.query.filter(Recipe.uid == uid).filter(Recipe.isDeleted == 0).all()
        return result

    def __repr__(self):
        return '<Recipe: rid:{}, uid:{}, title:{}>'.format(self.rid, self.uid, self.title)


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

    @staticmethod
    def get_id_by_name(rcname):
        temp = Recipe_category.query.filter(Recipe_category.rcname == rcname).first()
        if temp is None:
            print("The object does not exist!")
        else:
            return temp

    @staticmethod
    def get_all():
        return Recipe_category.query.with_entities(Recipe_category.rcname).all()


class Recipe_in_cate(db.Model):
    __tablename__ = 'recipe_in_cate'
    rid = db.Column(db.Integer, db.ForeignKey('recipe.rid'), primary_key=True)
    rcid = db.Column(db.Integer, db.ForeignKey('recipe_category.rcid'), primary_key=True,)

    def __init__(self, rid, cid):
        self.rid = rid
        self.rcid = cid

    @staticmethod
    def get_recipe_cate(rid):
        temp = Recipe_in_cate.query.filter(Recipe_in_cate.rid == rid).all()
        if temp is None:
           print("The object does not exist!")
        else:
            return temp

    @staticmethod
    def add(rid, cid):
        temp = Recipe_in_cate(rid, cid)
        db.session.add(temp)
        db.session.commit()

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
            recipe_content = Recipe.get_recipe(rid)
            prevLikes = recipe_content.likes
            curLikes = prevLikes - 1
            recipe_content.likes = curLikes
            db.session.commit()
            updated_recipe_content = Recipe.get_recipe(rid)
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

    @staticmethod
    def get_user_liked_recipes(uid):
        temp = Customer_like_recipe.query.filter(Customer_like_recipe.uid == uid).all()
        if temp is None:
            return None
        else:
            return temp

    def __init__(self, uid, rid, datetime):
        self.uid = uid
        self.rid = rid
        self.liked_time = datetime
