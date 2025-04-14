import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE
import dbinterface

def add_ingredient(DB_ADDRESS: str, ingredient: list) -> None:
  """
  Adds a new ingredient
  """
  action = "add ingredient"
  query = "INSERT INTO ingredients (name, unit) VALUES (?, ?);"
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (ingredient[0], ingredient[1]))

def update_ingredient(DB_ADDRESS: str, column: str, new_value: str, id) -> None:
  """
  Updates an ingredient
  """
  action = "update ingredient"
  query = "UPDATE ingredients SET {} = '{}' WHERE id = {};".format(column, new_value, id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def delete_ingredient(DB_ADDRESS: str, id):
  """
  Deletes an ingredient
  """
  action = "delete ingredient"
  query = "DELETE FROM ingredients WHERE id = {};".format(id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

