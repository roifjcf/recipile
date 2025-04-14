"""
Helper functions for general purposes
"""

import ast
from flask import jsonify
import traceback

def str_to_list(s:str) -> list:
  """
  Converts a list-like string to a list object
  """
  return ast.literal_eval(s)

def list_to_str(l:list) -> str:
  """
  Converts a list object to a list-like string
  """
  return repr(l)




###################################################
# API helpers
def handle_response_500(message: str):
  print(traceback.format_exc())
  return jsonify({"error": message}), 500

def handle_response_404(message: str):
  return jsonify({"error": message}), 404

def handle_response_400(message: str):
  return jsonify({"error": message}), 400
