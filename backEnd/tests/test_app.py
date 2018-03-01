import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'app')))
<<<<<<< HEAD
print (os.path.abspath(os.curdir))
=======
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
# print (sys.path)

>>>>>>> 464dd2b05341e01b6eb39d8d2ec0adf29738a803
from app import app
import unittest
from flask import request

class SetUpTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = app.test_client()

    def test_hello_world(self):
        rv = self.app.get('/')
        # print(rv.data)
        assert(b"Hello World!" in rv.data)

if __name__ == '__main__':
    unittest.main()
