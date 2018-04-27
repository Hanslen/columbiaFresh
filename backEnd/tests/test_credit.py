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



    def test_credit_card_update(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
            rv = self.app.post('/settings/update/credit', data=json.dumps(dict(
            userId=38,
            token=data['token'],
            streetAddress1='350 Manhattan Ave',
            streetAddress2='',
            city='New York City',
            state_province_region='NY',
            zipCode='10026')),
            content_type='application/json')

        assert (b'Success' in rv.data)

        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("credit card length not checked!")

if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [SetUpTest("test_credit")]
    suite.addTests(tests)

    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
    # suite = unittest.TestLoader().loadTestsFromTestCase(ContactsAndroidTests)
    # unittest.TextTestRunner(verbosity=2).run(suite)

