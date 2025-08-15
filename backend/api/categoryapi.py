from flask import Blueprint, request, jsonify
import traceback

from appconfig import *
import dbinterface
import helper

categoryapi = Blueprint('categoryapi', __name__)

@categoryapi.route('/categories', methods=['GET', 'POST', 'PUT', 'DELETE'])
def category_info():

  if request.method == 'GET':
    """
    Gets all categories, returns a list of objects
    """
    try:
      res = dbinterface.general.get_all(DB_ADDRESS, "categories") # a list
      if not res:
        return jsonify([]), 200
      res_obj = [{"id": r[0], "name": r[1], "icon_file_name": r[2]} for r in res]
      return jsonify(res_obj), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching categories.")
      
  elif request.method == 'POST':
    """
    Adds a category
    """
    try:
      name = request.args.get('name')
      icon_file_name = request.args.get('icon_file_name') if request.args.get('icon_file_name') else ""
      if not name:
        return helper.handle_response_400("Missing 'name' parameter.")
      dbinterface.categories.add_category(DB_ADDRESS, [ name, icon_file_name ])
      return jsonify({"message": "Added one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while adding the new category.")
  elif request.method == 'PUT':
    """
    Replaces a category (updates all fields of a category)
    """
    try:
      fields = ['id', 'name', 'icon_file_name']
      values = []
      for f in fields:
        v = request.args.get(f)
        if (not v and f == 'icon_file_name'): # handle empty params
          values.append("")
        elif not v: # handle invalid params
          return helper.handle_response_400(f"Missing '{f}' parameter.")
        else:
          values.append(v)
      dbinterface.categories.replace_record(DB_ADDRESS, values)
      return jsonify({"message": "Updated one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the category.")













@categoryapi.route('/categories/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_category(id):
  if (request.method == 'GET'):
    """
    Gets an category
    """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'categories', id)
      if res is None:
        return helper.handle_response_404("category not found.")
      else:
        return jsonify({"id": res[0], "name": res[1], "unit": res[2]}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the category.")
  
  
  elif request.method == 'DELETE':
    """
    Deletes an category,
    also removes the category if it exists in any recipe
    """
    try:
      if (id == 1): # keep the "uncategorized" category
        return jsonify({"message": ""}), 200
      # delete the category
      dbinterface.categories.delete_category(DB_ADDRESS, id)
      # update recipes
      records_to_topdate = dbinterface.general.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'categories', id)
      if not records_to_topdate:
        return jsonify({"message": "Deleted one category."}), 200
      for each in records_to_topdate:
        recipe_id = each[0]
        old_content = dbinterface.general.get_one_column_by_id(DB_ADDRESS, 'recipes', 'categories', recipe_id)[0]
        if old_content is None:
          continue
        old_content = helper.str_to_list(old_content)
        old_content = [row for row in old_content if str(id) not in row]
        if (len(old_content) == 0):
          old_content = ["1"] # "uncategorized"
        new_content = helper.list_to_str(old_content)
        dbinterface.recipes.update_recipe(DB_ADDRESS, recipe_id, 'categories', new_content)
      return jsonify({"message": "Deleted one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the category.")

  elif request.method == 'PUT':
    """
    Updates a scpecific column of an category
    """
    try:
      new_content = request.args.get('content')
      column = request.args.get('column')
      if not new_content:
        return helper.handle_response_400("Missing 'content' parameter.")
      if not column:
        return helper.handle_response_400("Missing 'column' parameter.")
      dbinterface.categories.update_category(DB_ADDRESS, column, new_content, id)
      return jsonify({"message": "Updated one category."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the category.")


@categoryapi.route('/categories/name/<string:name>', methods=['GET'])
def handle_existing_category_by_name(name):
  if (request.method == 'GET'):
    """
    Gets an category
    """
    try:
      res = dbinterface.general.get_one_by_name(DB_ADDRESS, 'categories', name)
      if res is None:
        return helper.handle_response_404("category not found.")
      else:
        return jsonify({"id": res[0], "name": res[1], "unit": res[2]}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the category.")