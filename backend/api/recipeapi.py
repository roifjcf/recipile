from flask import Blueprint, request, jsonify
import traceback

from appconfig import *
import dbinterface
import helper

recipeapi = Blueprint('recipeapi', __name__)

def get_res_obj(res):
  """
  Converts a fetched sql record to an object
  """
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
              "tags": helper.str_to_list(res[11])
            }
  return res_obj


@recipeapi.route('/recipes', methods=['GET', 'POST'])
def recipe_info():
  if request.method == 'GET':
    """
    Gets all recipes, returns a list of objects
    """
    try:
      res = dbinterface.general.get_all(DB_ADDRESS, "recipes") # a list
      if not res:
        return helper.handle_response_404("Recipes not found.")
      res_obj = [get_res_obj(r) for r in res]
      return jsonify(res_obj), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching recipes.")
    
  elif request.method == 'POST':
    """
    Adds a new recipe
    """
    try:
      fields = [
                'name', 'ingredients', 'steps', 'external_links', 'created',
                'pinned', 'serving', 'prep_time', 'notes', 'categories', 'tags'
      ]
      values = []
      for f in fields:
        v = request.args.get(f)
        if not v:
          return helper.handle_response_400(f"Missing '{v}' parameter.")
        values.append(v)
      dbinterface.recipes.add_recipe(DB_ADDRESS, values)
      # dbinterface.recipes.add_recipe(DB_ADDRESS, [
      #   request.args.get('name'),
      #   request.args.get('ingredients'),
      #   request.args.get('steps'),
      #   request.args.get('external_links'),
      #   request.args.get('created'),
      #   request.args.get('pinned'),
      #   request.args.get('serving'),
      #   request.args.get('prep_time'),
      #   request.args.get('notes'),
      #   request.args.get('categories'),
      #   request.args.get('tags')
      # ])
      return jsonify({"message": "Added one recipe."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while adding the new recipe.")
    



@recipeapi.route('/recipes/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_recipe(id):
  if request.method == 'GET':
    """
    Gets a recipe
    """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'recipes', id)
      if res is None:
        return helper.handle_response_404("Recipe not found.")
      else:
        return jsonify(get_res_obj(res)), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the recipe.")
    
  elif request.method == 'DELETE':
    """
    Deletes a recipe
    """
    try:
      dbinterface.recipes.delete_recipe(DB_ADDRESS, id)
      return jsonify({"message": "Deleted one recipe."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the recipe.")
    
  elif request.method == 'PUT':
    """
    Updates a recipe
    """
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
      return helper.handle_response_500("An error occurred while updating the recipe.")

