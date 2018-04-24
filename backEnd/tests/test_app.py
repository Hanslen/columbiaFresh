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
        rv = self.app.post('/login',data=json.dumps(dict(
            email='dingyi0116@gmail.com',
            password='12345678')),
            content_type='application/json')

        test = json.loads(rv.data)
        with open('local.json', 'w') as f:
            json.dump(test, f)

        assert (b'email' in rv.data)

    def test_get_recipe_tags(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/getRecipeTags')
        # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        self.assertTrue(rv.status_code is 200)

    def test_shopping_cart(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/shoppingCart', data=json.dumps(dict(
            uid=38,
            token=data['token'])),
            content_type='application/json')
        # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        self.assertTrue(rv.status_code is 200)

    def test_orders(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/orders', data=json.dumps(dict(
            userId=38,
            token=data['token'])),
            content_type='application/json')
        # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        self.assertTrue(rv.status_code is 200)

    def test_id_identify(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/shoppingCart', data=json.dumps(dict(
            uid=3,
            token=data['token'])),
            content_type='application/json')
        # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        assert (b'Inconsistent' in rv.data)

    def test_update_address(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/settings/update/address', data=json.dumps(dict(
            userId=4,
            token=data['token'],
            streetAddress1='350 Manhattan Ave',
            streetAddress2='',
            city='New York City',
            state_province_region='NY',
            zipCode='10026')),
            content_type='application/json')

        assert (b'Success' in rv.data)

    def test_search(self):
        rv = self.app.get('/hotMenu')
        # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        self.assertTrue(rv.status_code is 200)

    # def test_update_password(self):
    #     rv = self.app.post('/settings/update/password', data=json.dumps(dict(
    #         userId=4,
    #         token="eyJhbGciOiJIUzI1NiIsImlhdCI6MTUyMjE3OTc2OCwiZXhwIjoxNTIyMjg3NzY4fQ.eyJpZCI6NH0.lkCiNs_VsOLMVSK9mMFoOokGzB31IrsyI4Ls_atmADk",
    #         oldPassword='123456789',
    #         newPassword='12345678')),
    #     content_type='application/json')
    #
    #     print(rv.data)
    #     assert (b'Success' in rv.data)

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