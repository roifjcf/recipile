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



def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData



conn = sqlite3.connect(DB_ADDRESS)
cur = conn.cursor()

# cur.execute("DROP TABLE IF EXISTS recipes;")
# cur.execute("DROP TABLE IF EXISTS tags;")
# cur.execute("DROP TABLE IF EXISTS categories;")
# cur.execute("DROP TABLE IF EXISTS ingredients;")

conn.commit()
conn.close()

dbinterface.general.db_init(DB_ADDRESS)

# dummy_ingredients = [
#     ['salmon', 'gram'],
#     ['salt', ''],
#     ['udon', 'gram'],
#     ['tofu', '']
#     ]

dummy_categories = [
    ["Uncategorized",""]
    ]

# dummy_categories = [
#     ["Uncategorized",""],
#     ["category 1",""],
#     ["category 2",""],
#     ["category 3",""],
#     ]

# dummy_tags = [
#     "fried",
#     "non-fried",
#     "seal food"
#     ]

# dummy_recipes = [
#     [
#     "fibsh", 
#     "[['1', 200], ['2', 0]]", 
#     "['preheat the oven at 200deg', 'bake for 20 mins, turn halfway through cooking']",
#     "https://www.google.com/",
#     "2025-04-06",
#     0,
#     1,
#     20,
#     "what a deal",
#     "['2']",
#     "['1', '3']",
#     "seal",
#     convertToBinaryData("./seal.jpg"),
#     ],
#     [
#     "f1bsh", 
#     "[['1', 200], ['2', 0]]", 
#     "['preheat the oven at 200deg', 'bake for 20 mins, turn halfway through cooking']",
#     "https://www.google.com/",
#     "2025-04-06",
#     0,
#     1,
#     20,
#     "what a deal",
#     "['2']",
#     "['1']",
#     "",
#     None
#     ],
#     [
#     "fibsh123", 
#     "[['1', 200], ['2', 0]]", 
#     "['preheat the oven at 200deg', 'bake for 20 mins, turn halfway through cooking']",
#     "https://www.google.com/",
#     "2025-04-06",
#     0,
#     1,
#     20,
#     "what a deal",
#     "['2']",
#     "['1']",
#     "",
#     None
#     ],
#     [
#     "udon", 
#     "[['3', 200], ['4', 0]]", 
#     "['boil for 10 mins']",
#     "https://www.google.com/",
#     "2025-04-14",
#     0,
#     1,
#     15,
#     "what a deal",
#     "['3']",
#     "['2']",
#     "",
#     None
#     ]
# ]


for cat in dummy_categories:
    dbinterface.categories.add_category(DB_ADDRESS, cat)
# for tag in dummy_tags:
#     dbinterface.tags.add_tag(DB_ADDRESS, tag)
# for ingre in dummy_ingredients:
#     dbinterface.ingredients.add_ingredient(DB_ADDRESS, ingre)
# for recipe in dummy_recipes:
#     dbinterface.recipes.add_recipe(DB_ADDRESS, recipe)
# print(dbinterface.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'tags', 'fried'))
################################################


@app.route("/")
def setup():
    return "Hello, World!"

if __name__ == "__main__":
	app.run(debug=True)