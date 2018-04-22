from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from app import app, db 

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)
manager.add_command("server",
        Server(host="0.0.0.0", port=5000, use_debugger=True), default=True)

@manager.command
def query_customer_id():
    from app.models import Customer
    customer = Customer.get_customer_info_by_email('chenjiaheyeah@gmail.com')
    print(customer.uid)

@manager.option('-m', '--msg', dest='msg_val', default='world')
def hello_world(msg_val):
    print ('hello ' + msg_val)

@manager.command
def add_user():
    from app.models import Customer
    try:
        for i in range(1):
            Customer_john = Customer(uname='test'+str(i), email='test'+str(i)+'@gmail.com', password='12345678')
            app.logger.info(Customer_john.uname)
            db.session.add(Customer_john)
            db.session.commit()

    except Exception as e:
        print (e)

@manager.command
def delete_user():
    from app.models import Customer
    try:
        customer = Customer.query.filter(Customer.email == 'chenjiaheyeah@gmail.com').first()
        print(customer.email)
        db.session.delete(customer)
        db.session.commit()

    except Exception as e:
        print (e)


@manager.command
def query_user():
    from app.models import Customer
    customer = Customer.query.all()
    print(customer)

@manager.command
def query():
    from app.search_models import Recipe
    from app.cart_models import Cart
    lis = Recipe.query.all()
    for temp in lis:
        print(temp.title)
        print(temp.isDeleted)
        if temp.isDeleted == 1:
            temp.isDeleted = False
    print(Cart.query.all())

@manager.command
def create_order():
    from app.order_models import Order
    order = Order(uid=16)
    app.logger.info(order.oid)
    db.session.add(order)
    db.session.commit()

@manager.command
def query_order():
    # order oid = 1, created by uid=16
    # [<Recipe: rid:6, uid:3>, <Recipe: rid:7, uid:4>]

    from app.order_models import Order
    from app.search_models import Recipe
    order = Order.get_orders_by_user(uid=16)[0]
    recipe = Recipe.get_recipe(7)
    order.contains.append(recipe)
    db.session.add(order)
    db.session.commit()
    result = Recipe.get_recipe_in_order(1)
    print(result)

if __name__ == "__main__":
    manager.run()
