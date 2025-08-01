import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE
import dbinterface

def add_category(DB_ADDRESS: str, category: list) -> None:
  """
  Adds a new category
  """
  action = "add category"
  query = """
            INSERT INTO categories
            (name, icon_file_name)
            VALUES
            (?, ?)
            ;
            """
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (
    category[0], # name
    category[1], # icon_file_name
  ))

def update_category(DB_ADDRESS: str, id, column: str, content) -> None:
  """
  Updates a category
  """
  action = "update category"
  query = "UPDATE categories SET {} = ? WHERE id = ?;".format(column)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (content, id))

def delete_category(DB_ADDRESS: str, id):
  """
  Deletes a category
  """
  action = "delete category"
  query = "DELETE FROM categories WHERE id = {};".format(id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def replace_record(DB_ADDRESS: str, new_category: list):
  """
  Replaces a record
  """
  action = "replace(update all fields of) a category"
  query = query = """
            REPLACE INTO categories
            (id, name, icon_file_name) VALUES (?, ?, ?);
            """
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (
    new_category[0], # id
    new_category[1], # name
    new_category[2], # icon_file_name
  ))