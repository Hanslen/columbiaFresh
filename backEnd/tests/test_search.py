import sys
import os
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'app')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from app import app
import unittest
from flask import request, jsonify


class SearchTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = app.test_client()

    def test_search_with_empty_string(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=&&page=1&&perPage=10')
        self.assertTrue(rv.status_code is 200)

    def test_search_with_arbitrary_string(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=lalala&&page=1&&perPage=10')
        self.assertTrue(rv.status_code is 200)

    def test_search_with_overflowing_requesting(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=lalala&&page=100&&perPage=10000')
        self.assertFalse(rv.status_code is 200)

    def test_get_hot_menu(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/hotMenu')
        self.assertIn(b'menu', rv.data)

    def test_get_page_numer_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/page?query=lalala&&perPage=10000')
        self.assertTrue(rv.status_code is 200)

    def test_get_page_numer_abnormal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/page?query=lalala&&perPage=0')
        self.assertFalse(rv.status_code is 200)

    def test_get_rank_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('rank?query=&&page=1&&perPage=10')
        self.assertTrue(rv.status_code is 200)

    def test_get_rank_abnormal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('rank?query=&&page=100&&perPage=100000')
        self.assertFalse(rv.status_code is 200)

if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [SearchTest("test_search_with_empty_string"),
             SearchTest("test_search_with_arbitrary_string"),
             SearchTest("test_search_with_overflowing_requesting"),
             SearchTest("test_get_hot_menu"),
             SearchTest("test_get_page_numer_normal"),
             SearchTest("test_get_page_numer_abnormal"),
             SearchTest("test_get_rank_normal"),
             SearchTest("test_get_rank_abnormal")
             ]
    suite.addTests(tests)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)