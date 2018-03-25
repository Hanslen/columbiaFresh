from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from app import app, db

manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)
manager.add_command("server",
        Server(host="0.0.0.0", port=5000, use_debugger=True))

@manager.command
def test_send_email():
    from app.models import Customer
    from app.email import send_mail
    customer = Customer(uname='dingyi', email='dingyi0116@gmail.com', password='12345')
    db.session.add(customer)
    db.session.commit()
    token = customer.generate_confirm_token(expires_in=3600)
    send_mail.send(customer.email, u'please confirm your account', token)


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

if __name__ == "__main__":
    manager.run()
