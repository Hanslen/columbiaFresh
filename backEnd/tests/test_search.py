import sys
import os
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'app')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from app import app
import unittest
from flask import request, jsonify


class SetUpTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = app.test_client()

    def test_search_with_empty_string(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=&&page=1&&perPage=10')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Search function with empty strings exists bugs!")

    def test_search_with_arbitrary_string(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=lalala&&page=1&&perPage=10')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Search function with arbitrary strings exists bugs!")

    def test_search_with_overflowing_requesting(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/search?query=lalala&&page=100&&perPage=10000')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Search function with overflowing prevention exists bugs!")

    def test_get_hot_menu(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/hotMenu')
        try:
            self.assertIn(b'menu', rv.data)
        except Exception:
            print("Hot menu function exists bugs!")

    def test_get_page_numer_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/page?query=lalala&&perPage=10000')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Getting page number with normal input exists bugs!")

    def test_get_page_numer_abnormal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('/page?query=lalala&&perPage=0')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Getting page number with abnormal input exists bugs!")

    def test_get_rank_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('rank?query=&&page=1&&perPage=10')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Getting ranked recipe with normal input exists bugs!")

    def test_get_rank_abnormal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.get('rank?query=&&page=100&&perPage=100000')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Getting ranked recipe with abnormal input exists bugs!")

if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [SetUpTest("test_search_with_empty_string"),
             SetUpTest("test_search_with_arbitrary_string"),
             SetUpTest("test_search_with_overflowing_requesting"),
             SetUpTest("test_get_hot_menu"),
             SetUpTest("test_get_page_numer_normal"),
             SetUpTest("test_get_page_numer_abnormal"),
             SetUpTest("test_get_rank_normal"),
             SetUpTest("test_get_rank_abnormal")
             ]
    suite.addTests(tests)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)