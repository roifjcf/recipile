import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE
import dbinterface

def add_recipe(DB_ADDRESS: str, recipe: list ) -> None:
  """
  Adds a recipe
  """
  action = "add recipe"
  query = """
            INSERT INTO recipes
            (name, ingredients, steps, external_links, created,
            pinned, serving, prep_time, notes, categories, tags)
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ;
            """
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (
    recipe[0], # name
    recipe[1], # ingredients
    recipe[2], # steps
    recipe[3], # external_links
    recipe[4], # created
    recipe[5], # pinned
    recipe[6], # serving
    recipe[7], # prep_time
    recipe[8], # notes
    recipe[9], # categories
    recipe[10] #tags
  ))


def update_recipe(DB_ADDRESS: str, id, column: str, content) -> None:
  """
  Updates a recipe
  """
  action = "update recipe"
  query = "UPDATE recipes SET {} = ? WHERE id = ?;".format(column)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (content, id))

def delete_recipe(DB_ADDRESS: str, id) -> None:
  """
  Deletes a recipe
  """
  action = "delete recipe"
  query = "DELETE FROM recipes WHERE id={};".format(id)
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action)

def replace_record(DB_ADDRESS: str, new_recipe: list):
  """
  Replaces a record
  """
  action = "replace(update all fields of) a recipe"
  query = query = """
            REPLACE INTO recipes
            (id, name, ingredients, steps, external_links, created,
            pinned, serving, prep_time, notes, categories, tags)
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ;
            """
  dbinterface.general.execute_query_no_return(DB_ADDRESS, query, action, (
    new_recipe[0], # id
    new_recipe[1], # name
    new_recipe[2], # ingredients
    new_recipe[3], # steps
    new_recipe[4], # external_links
    new_recipe[5], # created
    new_recipe[6], # pinned
    new_recipe[7], # serving
    new_recipe[8], # prep_time
    new_recipe[9], # notes
    new_recipe[10], # categories
    new_recipe[11] #tags
  ))