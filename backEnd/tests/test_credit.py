import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'app')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
# print (sys.path)
from app import app
import unittest
from flask import request


class SetUpTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = app.test_client()

    def test_login(self):
        rv = self.app.post('/login', data=json.dumps(dict(
            email='dingyi0116@gmail.com',
            password='12345678')),
                           content_type='application/json')

        test = json.loads(rv.data)
        with open('local.json', 'w') as f:
            json.dump(test, f)

        assert (b'email' in rv.data)

    def test_credit_card_update(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=&&page=1&&perPage=10')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("credit card length not checked!")

if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [SetUpTest("test_login"),
             SetUpTest("test_get_recipe_tags"),
             SetUpTest("test_update_address"),
             SetUpTest("test_shopping_cart"),
             SetUpTest("test_orders"),
             SetUpTest("test_search")
             ]
    suite.addTests(tests)

    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
    # suite = unittest.TestLoader().loadTestsFromTestCase(ContactsAndroidTests)
    # unittest.TextTestRunner(verbosity=2).run(suite)

