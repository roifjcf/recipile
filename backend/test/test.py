import sys
import requests
sys.path.insert(0, '..')
from appconfig import *

def api_request(method, endpoint, params=None):
  url = ROOT_URL + endpoint
  response = requests.request(method, url, params=params)
  print(response.json())

# category
def test_get_all_categories(): api_request("GET", "categories")
def test_add_category(name): api_request("POST", "categories", {"name": name})
def test_get_category(id): api_request("GET", f"categories/{id}")
def test_update_category(id, content): api_request("PUT", f"categories/{id}", {"id": id, "content": content})
def test_delete_category(id): api_request("DELETE", f"categories/{id}")
# tag
def test_get_all_tags(): api_request("GET", "tags")
def test_add_tag(name): api_request("POST", "tags", {"name": name})
def test_get_tag(id): api_request("GET", f"tags/{id}")
def test_update_tag(id, content): api_request("PUT", f"tags/{id}", {"id": id, "content": content})
def test_delete_tag(id): api_request("DELETE", f"tags/{id}")
# ingredient
def test_get_all_ingredients(): api_request("GET", "ingredients")
def test_add_ingredient(name, unit): api_request("POST", "ingredients", {"name": name, "unit": unit})
def test_get_ingredient(id): api_request("GET", f"ingredients/{id}")
def test_update_ingredient(id, content, column): api_request("PUT", f"ingredients/{id}", {"id": id, "content": content, "column": column})
def test_delete_ingredient(id): api_request("DELETE", f"ingredients/{id}")
#recipe
def test_get_all_recipes(): api_request("GET", "recipes")
def test_add_recipe(info): api_request("POST", "recipes", {
  "name": info["name"],
  "ingredients": info["ingredients"],
  "steps": info["steps"],
  "external_links": info["external_links"],
  "created": info["created"],
  "pinned": info["pinned"],
  "serving": info["serving"],
  "prep_time": info["prep_time"],
  "notes": info["notes"],
  "categories": info["categories"],
  "tags": info["tags"]
})
def test_get_recipe(id): api_request("GET", f"recipes/{id}")
def test_update_recipe(id, content, column): api_request("PUT", f"recipes/{id}", {"id": id, "content": content, "column": column})
def test_delete_recipe(id): api_request("DELETE", f"recipes/{id}")
# def add_recipe(...): ...
# def get_recipe(id): ...
# def update_recipe(id, ...): ...
# def delete_recipe(id): ...

#####################################

# print("Testing category api...")
# test_get_all_recipe()
# print("==================")
# test_get_all_categories()
# test_add_new_category("a new cat")
# test_get_all_categories()
# test_get_one_category(1)
# test_update_category(1, "an updated cat")
# test_get_all_categories()
# test_delete_category(1)
# print("==================")
# test_get_all_categories()
# test_get_all_recipe()


# print("Testing tag api...")
# test_get_all_recipes()
# test_get_all_tags()
# print("==================")
# test_add_tag("a new tagggg")
# test_get_all_tags()
# test_get_tag(1)
# test_update_tag(1, "an updated tag")
# test_get_all_tags()
# test_delete_tag(1)
# print("==================")
# test_get_all_recipes()
# test_get_all_tags()


# print("Testing ingredient api...")
# test_get_all_recipes()
# test_get_all_ingredients()
# print("==================")
# test_add_ingredient("chicken", "g")
# test_get_all_ingredients()
# test_get_ingredient(1)
# test_update_ingredient(3, "chiggen", "name")
# test_update_ingredient(3, "kg", "unit")
# test_get_all_ingredients()
# test_delete_ingredient(1)
# print("==================")
# test_get_all_recipes()
# test_get_all_ingredients()

print("Testing recipe api...")
new_recipe = {
  "name": "udon",
  "ingredients": "[['1', 200], ['2', 0]]",
  "steps": "['boil', 'boil', 'boilllllllll']",
  "external_links": "https://www.google.com/",
  "created": "2025-04-13",
  "pinned": 0,
  "serving": 1,
  "prep_time": 10,
  "notes": "yum yum",
  "categories": "['2']",
  "tags": "['2']"
}
test_add_recipe(new_recipe)
test_get_all_recipes()
test_update_recipe(2, "nom nom nya", "notes")
test_get_recipe(2)
test_delete_recipe(1)
test_get_all_recipes()
print("==================")
