from flask import Flask
from flask_cors import CORS
import sqlite3

import dbinterface.general
import dbinterface.categories
import dbinterface.ingredients
import dbinterface.recipes
import dbinterface.tags
from appconfig import *
import api.recipeapi as recipeapi
import api.tagapi as tagapi
import api.categoryapi as categoryapi
import api.ingredientapi as ingredientapi


################################################
# app init
app = Flask(__name__)
CORS(app)
app.register_blueprint(recipeapi.recipeapi)
app.register_blueprint(tagapi.tagapi)
app.register_blueprint(categoryapi.categoryapi)
app.register_blueprint(ingredientapi.ingredientapi)
################################################
# debug

conn = sqlite3.connect(DB_ADDRESS)
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS recipes;")
cur.execute("DROP TABLE IF EXISTS tags;")
cur.execute("DROP TABLE IF EXISTS categories;")
cur.execute("DROP TABLE IF EXISTS ingredients;")


conn.commit()
conn.close()


dbinterface.general.db_init(DB_ADDRESS)

# dummy_categories = [ "cat1", "cat2" ]
# dummy_tags = [ "fried", "non-fried" ]
# dummy_recipes = [
#     [
#     "fibsh", "['salmon 200g', 'some salt']", "['preheat the oven at 200deg', 'bake for 20 mins, turn halfway through cooking']",
#     "https://www.google.com/", "2025-04-06", 0, 1, 20, "what a deal", "['cat1']", "['non-fried']"
#     ],
#     [
#     "udon", "['udon 200g', 'udon soup base']", "['boil', 'boil', 'boilllllllll']",
#     "https://www.google.com/", "2025-04-05", 0, 1, 10, "what a deal", "['cat1']", "['non-fried']"
#     ],
#     [
#     "souththern fried chicken", "['i don\'t know']", "['i will never make it on my own']",
#     "https://www.google.com/", "2025-04-04", 0, 1, 10, "yum yum", "['cat2']", "['fried', 'friied']"
#     ],
#     [
#     "kfc fried chicken", "['i don\'t know']", "['i will never make it on my own']",
#     "https://www.google.com/", "2025-04-07", 0, 1, 10, "nom nom", "['cat2']", "['fried']"
#     ]
# ]

dummy_ingredients = [['salmon', 'gram'], ['salt', '']]
dummy_categories = [ "cat1", "nya2" ]
dummy_tags = [ "fried", "non-fried" ]

dummy_recipes = [
    [
    "fibsh", 
    "[['1', 200], ['2', 0]]", 
    "['preheat the oven at 200deg', 'bake for 20 mins, turn halfway through cooking']",
    "https://www.google.com/",
    "2025-04-06",
    0,
    1,
    20,
    "what a deal",
    "['1']",
    "['1']"
    ]
]


for cat in dummy_categories:
    dbinterface.categories.add_category(DB_ADDRESS, cat)
for tag in dummy_tags:
    dbinterface.tags.add_tag(DB_ADDRESS, tag)
for ingre in dummy_ingredients:
    dbinterface.ingredients.add_ingredient(DB_ADDRESS, ingre)
for recipe in dummy_recipes:
    dbinterface.recipes.add_recipe(DB_ADDRESS, recipe)
# print(dbinterface.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'tags', 'fried'))
################################################


@app.route("/")
def setup():
    return "Hello, World!"

if __name__ == "__main__":
	app.run(debug=True)