from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from app import app, db 

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)
manager.add_command("server",
        Server(host="0.0.0.0", port=5000, use_debugger=True))

@manager.command
def query_customer_id():
    from app.models import Customer
    customer = Customer.get_customer_info_by_email('ding1@gmail.com')
    print(customer.uid)

@manager.option('-m', '--msg', dest='msg_val', default='world')
def hello_world(msg_val):
    print ('hello ' + msg_val)

@manager.command
def add_user():
    from app.models import Customer
    try:
        for i in range(5):
            Customer_john = Customer(uname='ding'+str(i), email='ding'+str(i)+'@gmail.com', password='12345678')
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
    customer = Customer.query.filter_by(uname='ding1').first()

@manager.command
def test_like_recipe():
    from app.search_models import Recipe, Customer_like_recipe
    recipe = Recipe.query.all()
    print(recipe)
    lis = Customer_like_recipe.query.all()
    print(lis)

if __name__ == "__main__":
    manager.run()
