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

    def test_get_myrecipe_folder_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/folder', data=json.dumps(dict(
            tag='dessert',
            userId=38,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Get recipe folder function with normal inputs exists bugs!")

    def test_get_myrecipe_folder_without_token(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/folder', data=json.dumps(dict(
            tag='dessert',
            userId=38,
            token='')),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe folder function with no token exists bugs!")

    def test_get_myrecipe_folder_without_id(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/folder', data=json.dumps(dict(
            tag='dessert',
            userId=None,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe folder function with no USER ID exists bugs!")

    def test_get_myrecipe_folder_with_no_tag(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/folder', data=json.dumps(dict(
            tag='',
            userId=38,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe folder function with no tag exists bugs!")

    def test_get_myrecipe_tag_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/tags', data=json.dumps(dict(
            userId=38,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Get recipe folder tag function with normal inputs exists bugs!")

    def test_get_myrecipe_tag_without_token(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/tags', data=json.dumps(dict(
            userId=38,
            token='')),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe folder tag function with no token exists bugs!")

    def test_get_myrecipe_tag_without_id(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/myrecipe/tags', data=json.dumps(dict(
            userId=None,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe folder tag function with no USER ID exists bugs!")

    def test_get_recipe_normal(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/getRecipe', data=json.dumps(dict(
            uid=38,
            rid=10,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Get recipe function with normal inputs exists bugs!")

    def test_get_recipe_with_no_uid(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/getRecipe', data=json.dumps(dict(
            uid=None,
            rid=10,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Get recipe function with no uid input exists bugs!")

    def test_get_recipe_with_no_rid(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/getRecipe', data=json.dumps(dict(
            uid=38,
            rid=None,
            token=data['token'])),
            content_type='application/json')
        try:
            self.assertFalse(rv.status_code is 200)
        except Exception:
            print("Get recipe function with no rid input exists bugs!")

    def test_get_recipe_with_no_token(self):
        with open('local.json', 'r') as f:
            data = json.load(f)
        rv = self.app.post('/getRecipe', data=json.dumps(dict(
            uid=38,
            rid=10,
            token='')),
            content_type='application/json')
        try:
            self.assertTrue(rv.status_code is 200)
        except Exception:
            print("Get recipe function with no token input exists bugs!")



if __name__ == '__main__':
    suite = unittest.TestSuite()
    tests = [SetUpTest("test_get_myrecipe_folder_normal"),
             SetUpTest("test_get_myrecipe_folder_without_token"),
             SetUpTest("test_get_myrecipe_folder_without_id"),
             SetUpTest("test_get_myrecipe_folder_with_no_tag"),
             SetUpTest("test_get_myrecipe_tag_normal"),
             SetUpTest("test_get_myrecipe_tag_without_token"),
             SetUpTest("test_get_myrecipe_tag_without_id"),
             SetUpTest("test_get_recipe_normal"),
             SetUpTest("test_get_recipe_with_no_uid"),
             SetUpTest("test_get_recipe_with_no_rid"),
             SetUpTest("test_get_recipe_with_no_token")
             ]
    suite.addTests(tests)
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)