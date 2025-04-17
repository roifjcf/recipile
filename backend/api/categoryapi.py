from flask import Blueprint, request, jsonify
import traceback

from appconfig import *
import dbinterface
import helper

categoryapi = Blueprint('categoryapi', __name__)

@categoryapi.route('/categories', methods=['GET', 'POST'])
def category_info():
  if request.method == 'GET':
    """
    Gets all categories, returns a list of objects
    """
    try:
      res = dbinterface.general.get_all(DB_ADDRESS, "categories") # a list
      if not res:
        return jsonify([]), 200
        # return helper.handle_response_404("Categories not found.")
      res_obj = [{"id": r[0], "name": r[1]} for r in res]
      return jsonify(res_obj), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching categories.")
  
  elif request.method == 'POST':
    """
    Adds a new category
    """
    try:
      name = request.args.get('name')
      if not name:
        return helper.handle_response_400("Missing 'name' parameter.")
      dbinterface.categories.add_category(DB_ADDRESS, name)
      return jsonify({"message": "Added one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while adding the new category.")





@categoryapi.route('/categories/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_category(id):
  if request.method == 'GET':
    """
    Gets a category
    """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'categories', id)
      if res is None:
        return helper.handle_response_404("Category not found.")
      else:
        return jsonify({"id": res[0], "name": res[1]}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the category.")
    
  elif request.method == 'DELETE':
    """
    Deletes a category, also removes the category if it exists in any recipe
    """
    try:
      # delete the ingredient
      dbinterface.categories.delete_category(DB_ADDRESS, id)
      # update recipes
      records_to_topdate = dbinterface.general.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'categories', id)
      if not records_to_topdate:
        return jsonify({"message": "Deleted one ingredient."}), 200
      for each in records_to_topdate:
        recipe_id = each[0]
        old_content = dbinterface.general.get_one_column_by_id(DB_ADDRESS, 'recipes', 'categories', recipe_id)[0]
        old_content = helper.str_to_list(old_content)
        old_content.remove(str(id))
        new_content = helper.list_to_str(old_content)
        dbinterface.recipes.update_recipe(DB_ADDRESS, recipe_id, 'categories', new_content)
      return jsonify({"message": "Deleted one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the category.")
    
  elif request.method == 'PUT':
    """
    Updates a category
    """
    try:
      new_content = request.args.get('content')
      if not new_content:
        return helper.handle_response_400("Missing 'content' parameter.")
      dbinterface.categories.update_category(DB_ADDRESS, id, new_content)
      return jsonify({"message": "Updated one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the category.")
