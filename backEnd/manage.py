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

@manager.command
def test_confirm():
    from app.models import Customer
    Customer.verify_confirm_token("eyJhbGciOiJIUzI1NiIsImlhdCI6MTUxOTE2Nzc0OSwiZXhwIjoxNTE5MTcxMzQ5fQ.eyJpZCI6MTB9.B-_ph9YcSX2PUJHGnmwzKepZMhHRLtM2TMu38GvAqN0")

@manager.option('-m', '--msg', dest='msg_val', default='world')
def hello_world(msg_val):
    print ('hello ' + msg_val)

@manager.command
def test_db_connect():
    from app.models import Customer
    try:
        Customer_john = Customer(uname='john', email='john@columbia.edu', password='123')
        app.logger.info(Customer_john.password_hash)
        db.session.add(Customer_john)
        db.session.commit()

    except Exception as e:
        print (e)

@manager.command
def query_all():
    from app.models import Customer
    print(Customer.query.filter_by(uname='john').first())

if __name__ == "__main__":
    manager.run()
