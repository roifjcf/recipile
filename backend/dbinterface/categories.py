import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE
import dbinterface

def add_category(DB_ADDRESS: str, name: str) -> None:
  """
  Adds a new category
  """
  action = "add category"
  query = "INSERT INTO categories (name) VALUES ('{}');".format(name)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def update_category(DB_ADDRESS: str, id, new_name: str) -> None:
  """
  Updates a category
  """
  action = "update category"
  query = "UPDATE categories SET name = '{}' WHERE id = {};".format(new_name, id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def delete_category(DB_ADDRESS: str, id):
  """
  Deletes a category
  """
  action = "delete category"
  query = "DELETE FROM categories WHERE id = {};".format(id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

