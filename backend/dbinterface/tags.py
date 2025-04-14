import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE
import dbinterface

def add_tag(DB_ADDRESS: str, name: str) -> None:
  """
  Adds a new tag
  """
  action = "add tag"
  query = "INSERT INTO tags (name) VALUES ('{}');".format(name)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def update_tag(DB_ADDRESS: str, id, new_name: str) -> None:
  """
  Updates a tag
  """
  action = "update tag"
  query = "UPDATE tags SET name = '{}' WHERE id = {};".format(new_name, id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def delete_tag(DB_ADDRESS: str, id) -> None:
  """
  Deletes a tag
  """
  action = "delete tag"
  query = "DELETE FROM tags WHERE id = {};".format(id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)
