from flask import Blueprint, request, jsonify
import traceback

from appconfig import *
import dbinterface
import helper

ingredientapi = Blueprint('ingredientapi', __name__)


@ingredientapi.route('/ingredients', methods=['GET', 'POST'])
def ingredient_info():
  if request.method == 'GET':
    """
    Gets all ingredients, returns a list of objects
    """
    try:
      res = dbinterface.general.get_all(DB_ADDRESS, "ingredients") # a list
      if not res:
        return helper.handle_response_404("Ingredients not found.")
      res_obj = [{"id": r[0], "name": r[1], "unit": r[2]} for r in res]
      return jsonify(res_obj), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching ingredients.")
      
  elif request.method == 'POST':
    """
    Adds an ingredient
    """
    try:
      name = request.args.get('name')
      unit = request.args.get('unit')
      if not name:
        return helper.handle_response_400("Missing 'name' parameter.")
      if not unit:
        return helper.handle_response_400("Missing 'unit' parameter.")
      dbinterface.ingredients.add_ingredient(DB_ADDRESS, [ name, unit ])
      return jsonify({"message": "Added one ingredient."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while adding the new ingredient.")




@ingredientapi.route('/ingredients/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_ingredient(id):
  if (request.method == 'GET'):
    """
    Gets an ingredient
    """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'ingredients', id)
      if res is None:
        return helper.handle_response_404("Ingredient not found.")
      else:
        return jsonify({"id": res[0], "name": res[1], "unit": res[2]}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the ingredient.")
  
  
  elif request.method == 'DELETE':
    """
    Deletes an ingredient, also removes the ingredient if it exists in any recipe
    """
    try:
      records_to_topdate = dbinterface.general.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'ingredients', id)
      if not records_to_topdate:
        return helper.handle_response_404("Records not found")
      dbinterface.ingredients.delete_ingredient(DB_ADDRESS, id)
      for each in records_to_topdate:
        recipe_id = each[0]
        old_content = dbinterface.general.get_one_column_by_id(DB_ADDRESS, 'recipes', 'ingredients', recipe_id)[0]
        old_content = helper.str_to_list(old_content)
        old_content = [row for row in old_content if str(id) not in row]
        new_content = helper.list_to_str(old_content)
        dbinterface.recipes.update_recipe(DB_ADDRESS, recipe_id, 'ingredients', new_content)
      return jsonify({"message": "Deleted one ingredient."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the ingredient.")
  
  
  elif request.method == 'PUT':
    """
    Updates an ingredient
    """
    try:
      new_content = request.args.get('content')
      column = request.args.get('column')
      if not new_content:
        return helper.handle_response_400("Missing 'content' parameter.")
      if not column:
        return helper.handle_response_400("Missing 'column' parameter.")
      dbinterface.ingredients.update_ingredient(DB_ADDRESS, column, new_content, id)
      return jsonify({"message": "Updated one ingredient."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the ingredient.")