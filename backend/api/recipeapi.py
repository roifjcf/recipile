from flask import Blueprint, request, jsonify
import traceback
import json
import base64

from appconfig import *
import dbinterface
import helper

recipeapi = Blueprint('recipeapi', __name__)

def convertToBinaryData(filename):
  # Converts digital data to binary format
  # https://pynative.com/python-sqlite-blob-insert-and-retrieve-digital-data/
  with open(filename, 'rb') as file:
      blobData = file.read()
  return blobData


def base64_to_binary(s):
  if s == None:
    return
  if s.startswith("data:"):
    s = s.split(",")[1]
  return base64.b64decode(s)

def get_res_obj(res):
  """ Converts a fetched sql record to an object """
  res_obj = {
              "id": res[0],
              "name": res[1],
              "ingredients": helper.str_to_list(res[2]),
              "steps": helper.str_to_list(res[3]),
              "external_links": res[4],
              "created": res[5],
              "pinned": res[6],
              "serving": res[7],
              "prep_time": res[8],
              "notes": res[9],
              "categories": helper.str_to_list(res[10]),
              "tags": helper.str_to_list(res[11]),
              "img_filename": res[12],
              "img_main": base64.b64encode(res[13]).decode("utf-8") if (res[13]) else None
            }
  return res_obj




RECIPE_FIELDS = [
  'id', 'name', 'ingredients', 'steps', 'external_links', 'created',
  'pinned', 'serving', 'prep_time', 'notes', 'categories', 'tags', 'img_filename', 'img_main'
]


def extract_and_validate_data(data, required_fields):
  """Extracts and JSON-serializes list fields, validates presence of all required fields."""
  values = []
  for f in required_fields:
    if f not in data:
      raise ValueError(f"Missing '{f}' parameter.")
    if f == "img_main":
      values.append(base64_to_binary(data[f]))
      continue
    value = json.dumps(data[f]) if isinstance(data[f], list) else data[f]
    values.append(value)
  return values

def extract_and_validate_binary_data(data, required_fields):
  values = []
  for f in required_fields:
    if f not in data:
      raise ValueError(f"Missing '{f}' parameter.")
    value = file.read(data[f])
    values.append(value)
  return values




@recipeapi.route('/recipes', methods=['GET', 'POST', 'PUT'])
def recipe_info():
  try:

    if request.method == 'GET': # Gets all recipes, returns a list of objects
      res = dbinterface.general.get_all(DB_ADDRESS, "recipes") # a list
      data = jsonify([get_res_obj(r) for r in res] if res else [])
      return data, 200

    ###############
    data = request.get_json()
    if request.method == "POST":
      values = extract_and_validate_data(data, RECIPE_FIELDS[1:])
      dbinterface.recipes.add_recipe(DB_ADDRESS, values)
      return jsonify({"message": "Added one recipe."}), 200

    elif request.method == "PUT":
      values = extract_and_validate_data(data, RECIPE_FIELDS)
      dbinterface.recipes.replace_record(DB_ADDRESS, values)
      return jsonify({"message": "Updated one recipe."}), 200

  except ValueError as ve:
    return helper.handle_response_400(str(ve))
  except Exception as e:
    return helper.handle_response_500("An error occurred while processing the request.")
    





@recipeapi.route('/recipes/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_recipe(id):
  if request.method == 'GET':
    """ Gets a recipe """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'recipes', id)
      if res is None:
        return helper.handle_response_404("Recipe not found.")
      else:
        return jsonify(get_res_obj(res)), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the recipe.")
    
  elif request.method == 'DELETE':
    """ Deletes a recipe """
    try:
      dbinterface.recipes.delete_recipe(DB_ADDRESS, id)
      return jsonify({"message": "Deleted one recipe."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the recipe.")
    
  elif request.method == 'PUT':
    """ Updates a scpecific column of a recipe """
    try:
      new_content = request.args.get('content')
      column = request.args.get('column')
      if not new_content:
        return helper.handle_response_400("Missing 'content' parameter.")
      if not column:
        return helper.handle_response_400("Missing 'column' parameter.")

      dbinterface.recipes.update_recipe(DB_ADDRESS, id, request.args.get('column'), request.args.get('content'))
      return jsonify({"message": "Updated one recipe."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the column of the recipe.")
