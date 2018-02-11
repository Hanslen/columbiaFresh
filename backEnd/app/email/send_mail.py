from flask.ext.mail import Message
from app import mail

def send(addr, title, user, token):
    try:
        msg = Message(title,
                      sender="Columbia Fresh",
                      recipients=[addr])
        msg.body = 'Hi, {}\n your token is {}'.format(user, token)
        mail.send(msg)
    except Exception as e:
        print (e)

