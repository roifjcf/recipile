

/**
 * Data validation
 */

import { Tables, Interfaces, RecipeInterface, RecipeAPIAddParam, TagInterface, IngredientInterface, CategoryInterface } from "@/common/type";
import { categoryAPI, ingredientAPI, recipeAPI, tagAPI } from "./api";





const checkIfNameExists = async (table: Tables, data: any) => {
  try {
    const apis = {
      categories: categoryAPI,
      ingredients: ingredientAPI,
      recipes: recipeAPI,
      tags: tagAPI,
    };

    const res = await apis[table].get();

    if (data["id"]) {
      // PUT
      return (res.filter((r:Interfaces) =>
                (r["id"] !== data["id"] && data["name"] === r["name"]))
                .length > 0)? true : false;
    } else {
      // POST
      return (res.filter((r:Interfaces) =>
        (data["name"] === r["name"]))
        .length > 0)? true : false;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
};





export const validateData = async (table: Tables, data: any) => {
  /**
   * Checks if all property values are valid before calling the API (POST / UPDATE)
   */
  const validateRecipe = async (data: RecipeInterface | RecipeAPIAddParam) => {
    // name
    if (data.name === "") {
      return [false, "Name cannot be empty!"];
    }
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) { return [false, "The name was taken by another recipe!"] }
    // serving size
    if (data.serving < 1 || !Number.isInteger(data.serving)) {
      return [false, "Invalid serving size, please provide an ingeter greater than zero!"];
    }
    // prep time
    if (data.prep_time < 0) {
      return [false, "Invalid preparation time, please provide an non-negative integer!"];
    }

    return [true, "All properties are valid!"];
  }

  const validateTag = async (data: TagInterface) => {
    //name
    if (data.name === "") {
      return [false, "Name cannot be empty!"];
    }

    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) {
      return [false, "The name was taken by another tag!"];
    }

    return [true, "All properties are valid!"];
  }

  const validateIngredient = async (data: IngredientInterface) => {
    // name
    if (data.name === "") {
      return [false, "Name cannot be empty!"];
    }
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) {
      return [false, "The name was taken by another ingredient!"];
    }

    return [true, "All properties are valid!"];
  }


  const validateCategory = async (data: CategoryInterface) => {
    // name
    if (data.name === "") {
      return [false, "Name cannot be empty!"];
    }
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) {
      return [false, "The name was taken by another category!"];
    }

    return [true, "All properties are valid!"];
  }

  
  if (table === "recipes") {return validateRecipe(data)}
  if (table === "tags") {return validateTag(data)}
  if (table === "ingredients") {return validateIngredient(data)}
  if (table === "categories") {return validateCategory(data)}
  

  return [false, "Invalid table name"];
};



