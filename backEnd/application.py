from flask import Flask
from app import app as application

@application.route("/")        # Change your route statements
def hello():
	return "Hello World!"
# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.

    application.debug = True
    application.run(host='0.0.0.0', port=8000)