import unittest
from app import app
import json

class IdentifyTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = app.test_client()

    def test_id_identify(self):
        with open('local.json', 'r') as f:
            data = json.load(f)

        rv = self.app.post('/shoppingCart', data=json.dumps(dict(
            uid=3,
            token=data['token'])),
            content_type='application/json')
            # self.app.get('/path-to-request', query_string=dict(arg1='data1', arg2='data2', ...))
        self.assertTrue(b'Inconsistent' in rv.data)

        rv = self.app.post('/shoppingCart', data=json.dumps(dict(
            uid=38,
            token=data['token'])),
                               content_type='application/json')
        self.assertTrue(b'img' in rv.data)


if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [IdentifyTest("test_identity")
             ]
    suite.addTests(tests)

    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
    # suite = unittest.TestLoader().loadTestsFromTestCase(ContactsAndroidTests)
    # unittest.TextTestRunner

