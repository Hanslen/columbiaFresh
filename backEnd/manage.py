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
    from app.email import send_mail
    send_mail.send("dingyi0116@gmail.com", u'please confirm your account', "ding", "1234")


@manager.option('-m', '--msg', dest='msg_val', default='world')
def hello_world(msg_val):
    print ('hello ' + msg_val)


@manager.command
def init_db():
    from app.models import Customer
    try:
        db.drop_all()
        db.create_all()
        Customer_john = Customer(cname='john', email='john@columbia.edu', password='123')
        app.logger.info(Customer_john.password_hash)
        db.session.add(Customer_john)
        db.session.commit()

    except Exception as e:
        print (e)

@manager.command
def query_all():
    from app.models import Customer
    print(Customer.query.filter_by(cname='john').first())

if __name__ == "__main__":
    manager.run()