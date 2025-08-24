import os
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

def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData


# create folder if not exists
os.makedirs(DB_FOLDER_PATH, exist_ok=True)
conn = sqlite3.connect(DB_ADDRESS)
cur = conn.cursor()

# cur.execute("DROP TABLE IF EXISTS recipes;")
# cur.execute("DROP TABLE IF EXISTS tags;")
# cur.execute("DROP TABLE IF EXISTS categories;")
# cur.execute("DROP TABLE IF EXISTS ingredients;")

conn.commit()
conn.close()

dbinterface.general.db_init(DB_ADDRESS)

default_categories = [
    ["Uncategorized",""]
]

for cat in default_categories:
    dbinterface.categories.add_category(DB_ADDRESS, cat)

@app.route("/")
def setup():
    return "Hello, World!"

if __name__ == "__main__":
	app.run(debug=True)