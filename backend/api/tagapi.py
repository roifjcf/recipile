from flask import Blueprint, request, jsonify
import traceback

from appconfig import *
import dbinterface
import helper

tagapi = Blueprint('tagapi', __name__)

@tagapi.route('/tags', methods=['GET', 'POST'])
def tag_info():
  if request.method == 'GET':
    """
    Gets all tags, returns a list of objects
    """
    try:
      res = dbinterface.general.get_all(DB_ADDRESS, "tags") # a list
      if not res:
        return helper.handle_response_404("Tags not found.")
      res_obj = [{"id": r[0], "name": r[1]} for r in res]
      return jsonify(res_obj), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching tags.")

  elif request.method == 'POST':
    """
    Adds a tag
    """
    try:
      name = request.args.get('name')
      if not name:
        return helper.handle_response_400("Missing 'name' parameter.")
      dbinterface.tags.add_tag(DB_ADDRESS, name)
      return jsonify({"message": "Added one tag."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while adding the new tag.")

    



@tagapi.route('/tags/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def handle_existing_tag(id):
  if (request.method == 'GET'):
    """
    Gets a tag
    """
    try:
      res = dbinterface.general.get_one_by_id(DB_ADDRESS, 'tags', id)
      if res is None:
        return helper.handle_response_404("Tag not found.")
      else:
        return jsonify({"id": res[0], "name": res[1]}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while fetching the tag.")
  
  
  elif request.method == 'DELETE':
    """
    Deletes a tag, also removes the tag if it exists in any recipe
    """
    try:
      records_to_topdate = dbinterface.general.get_multiple_by_keyword(DB_ADDRESS, 'recipes', 'tags', id)
      if not records_to_topdate:
        return helper.handle_response_404("Records not found")
      dbinterface.tags.delete_tag(DB_ADDRESS, id)
      for each in records_to_topdate:
        recipe_id = each[0]
        old_content = dbinterface.general.get_one_column_by_id(DB_ADDRESS, 'recipes', 'tags', recipe_id)[0]
        old_content = helper.str_to_list(old_content)
        old_content.remove(str(id))
        new_content = helper.list_to_str(old_content)
        dbinterface.recipes.update_recipe(DB_ADDRESS, recipe_id, 'tags', new_content)

      return jsonify({"message": "Deleted one tag."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while deleting the tag.")
  
  
  elif request.method == 'PUT':
    """
    Updates a tag
    """
    try:
      new_content = request.args.get('content')
      if not new_content:
        return helper.handle_response_400("Missing 'content' parameter.")
      dbinterface.tags.update_tag(DB_ADDRESS, id, new_content)
      return jsonify({"message": "Updated one tag."}), 200
    except Exception as e:
      return helper.handle_response_500("An error occurred while updating the tag.")