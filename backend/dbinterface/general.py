import sqlite3
from appconfig import DB_SUCCESS_MESSAGE, DB_ERROR_MESSAGE, DB_FAIL_MESSAGE, DB_NOT_FOUND_MESSAGE

def execute_query_no_return(DB_ADDRESS: str, query: str, action: str = "",  params: tuple = ()) -> None:
  """
  A helper function to execute any query with provided parameters.
  It handles connection, execution, and closing resources.
  Returns nothing.
  """
  try:
    conn = sqlite3.connect(DB_ADDRESS)
    cur = conn.cursor()
    cur.execute(query, params)
    conn.commit()
    cur.close()
    # print(DB_SUCCESS_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  except sqlite3.Error as error:
    print(DB_ERROR_MESSAGE.format(error))
    print(DB_FAIL_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  finally:
    if conn:
      conn.close()

def execute_query_fetch_one(DB_ADDRESS: str, query: str, action: str = "",  params: tuple = ()) -> None:
  """
  A helper function to execute any query with provided parameters.
  It handles connection, execution, and closing resources.
  Returns the first matched record.
  """
  res = None
  try:
    conn = sqlite3.connect(DB_ADDRESS)
    cur = conn.cursor()
    cur.execute(query, params)
    res = cur.fetchone()
    conn.commit()
    cur.close()
    # print(DB_SUCCESS_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  except sqlite3.Error as error:
    print(DB_ERROR_MESSAGE.format(error))
    print(DB_FAIL_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  finally:
    if conn:
      conn.close()
    return res
  
def execute_query_fetch_all(DB_ADDRESS: str, query: str, action: str = "",  params: tuple = ()) -> None:
  """
  A helper function to execute any query with provided parameters.
  It handles connection, execution, and closing resources.
  Returns all matched records.
  """
  res = None
  try:
    conn = sqlite3.connect(DB_ADDRESS)
    cur = conn.cursor()
    cur.execute(query, params)
    res = cur.fetchall()
    conn.commit()
    cur.close()
    # print(DB_SUCCESS_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  except sqlite3.Error as error:
    print(DB_ERROR_MESSAGE.format(error))
    print(DB_FAIL_MESSAGE.format(action))  # Print the action (e.g., INSERT)
  finally:
    if conn:
      conn.close()
    return res



########################################################



def db_init(DB_ADDRESS: str) -> None:
  """
  Databse initialization
  Note: the value of column 'name' for each table should be unique!
  """
  action = "initialize the databse"
  query = """
    CREATE TABLE IF NOT EXISTS categories (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT NOT NULL UNIQUE
    );
  """
  execute_query_no_return(DB_ADDRESS, query, action)
  query = """
    CREATE TABLE IF NOT EXISTS tags (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT NOT NULL UNIQUE
    );
  """
  execute_query_no_return(DB_ADDRESS, query, action)

  query = """
    CREATE TABLE IF NOT EXISTS ingredients (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT NOT NULL UNIQUE,
      unit            TEXT DEFAULT ''
    );
  """
  execute_query_no_return(DB_ADDRESS, query, action)

  query = """
    CREATE TABLE IF NOT EXISTS recipes (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT NOT NULL UNIQUE,
      ingredients     TEXT DEFAULT '[]', -- a 2d list, [[ingred_id (foreign key), quantity]]
      steps           TEXT DEFAULT '[]', -- a list of steps (string)
      external_links  TEXT DEFAULT '[]', -- a list of external links (string)
      created         TEXT NOT NULL, -- date of creation
      pinned          INTEGER NOT NULL, -- 0: not pinned, 1: pinned
      serving         INTEGER NOT NULL, -- serving size, at least 1
      prep_time       INTEGER NOT NULL, -- minutes
      notes           TEXT DEFAULT '',
      categories      TEXT NOT NULL, -- a list of category ids (foreign keys)
      tags            TEXT NOT NULL, -- a list og tag ids (foreign keys)
      CHECK (pinned = 0 OR 1 AND serving >= 1 AND prep_time >= 0)
    );
  """
  execute_query_no_return(DB_ADDRESS, query, action)

def get_one_column_by_name(DB_ADDRESS: str, table: str, column: str, name: str):
  """
  Gets a specific column of a record in a table.
  The record is selected by its name (supposed to be unique)
  """
  action = "find the {} of {} from {}".format(column, name, table)
  query = "SELECT {} FROM {} WHERE name = '{}';".format(column, table, name)
  return execute_query_fetch_one(DB_ADDRESS, query, action)

def get_one_column_by_id(DB_ADDRESS: str, table: str, column: str, id):
  """
  Gets a specific column of a record in a table.
  The record is selected by its id
  """
  action = "find the {} of {} from {}".format(column, id, table)
  query = "SELECT {} FROM {} WHERE id = {};".format(column, table, id)
  return execute_query_fetch_one(DB_ADDRESS, query, action)


def get_multiple_by_keyword(DB_ADDRESS: str, table: str, column: str, content: str):
  """
  Gets all records by keyword (partial match)
  """
  action = "find all matched records from {}".format(table)
  query = "SELECT * FROM {} WHERE {} LIKE '%''{}''%';".format(table, column, content)
  return execute_query_fetch_all(DB_ADDRESS, query, action)

def get_one_by_id(DB_ADDRESS: str, table: str, id):
  """
  Gets a record from a table by id
  """
  action = "get a record from table {}".format(table)
  query = "SELECT * FROM {} WHERE id = {}".format(table, id)
  return execute_query_fetch_one(DB_ADDRESS, query, action)

def get_all(DB_ADDRESS: str, table: str) -> list:
  """
  Gets everything from a table
  """
  action = "get all from table [{}]".format(table)
  query = "SELECT * FROM {};".format(table)
  return execute_query_fetch_all(DB_ADDRESS, query, action)