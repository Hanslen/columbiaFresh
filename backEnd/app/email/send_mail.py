from flask.ext.mail import Message
from app import mail

def send(to, subject, token):
    try:
        msg = Message(
            subject,
            recipients=[to],
            sender="Columbia Fresh",
            html=token
        )
        mail.send(msg)
    except Exception as e:
        print (e)
