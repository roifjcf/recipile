import { kaomoji } from "@/common/constant";
import { RecipeInterface, CategoryInterface, TagInterface, IngredientInterface, RecipeAPIAddParam, Tables } from "@/common/type";
import { categoryAPI } from "./api";





export const findRecordNameByid = (id: number, records: CategoryInterface[] | TagInterface[] | IngredientInterface[] | RecipeInterface[] | null ) => {
  return records?.find(record => record.id === id)?.name || "";
};

export const findRecordidByName = (name: string, records: CategoryInterface[] | TagInterface[] | IngredientInterface[] | RecipeInterface[]  | null ) => {
  /** the name is a unique value (by the db schema) */
  return records?.find(record => record.name === name)?.id || "";
};

export const findIngredientUnitByid = (id: number, records: IngredientInterface[] | null ) => {
  return records?.find(record => record.id === id)?.unit || "";
};

export const removeEmptyItem = (list:string[]) => { return list.filter((item) => item !== ''); };








export const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light'
  const html = document.documentElement;
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    // default to OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}

export const convertImgUrl = (s: string | null) => {
  /** Converts the image retrieved from the database */
  if (!s) {return null;}
  return s !== "" ? `data:image/jpeg;base64,${s}` : null;
}











/**
 * Data validation
 */

const checkIfNameExists = async (table: Tables, data: any) => {
  try {
    switch (table) {
      case "categories":
        const res = await categoryAPI.get();
        return (res.filter((r:CategoryInterface) =>
                  r["id"] !== data["id"] && data["name"] === r["name"])
                  .length > 0)? true : false;
        break;
      case "ingredients":
        break;
      case "recipes":
        break;
      case "tags":
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

export const validateData = async (table: Tables, data: any) => {
  /**
   * Checks if all property values are valid before calling the API (POST / UPDATE)
   */
  const validateRecipe = async (data: RecipeInterface | RecipeAPIAddParam) => {
    /** To validate: name, serving size, prep time  */
    if (data.name === "") return [false, "Invalid recipe name"];
    if (data.serving < 1 || !Number.isInteger(data.serving)) return [false, "Invalid serving size"];
    if (data.prep_time < 0) return [false, "Invalid preparation time"];
    return [true, "All properties are valid!"];
    
  }
  const validateTag = async (data: TagInterface) => {
    /** To validate: name  */
    if (data.name === "") return [false, "Invalid tag name"];
    return [true, "All properties are valid!"];
  }
  const validateIngredient = async (data: IngredientInterface) => {
    /** To validate: name, unit  */
    if (data.name === "") return [false, "Invalid ingredient name"];
    if (data.unit === "") return [false, "Invalid ingredient unit"];
    return [true, "All properties are valid!"];
  }
  const validateCategory = async (data: CategoryInterface) => {
    /** To validate: name  */
    if (data.name === "") return [false, "Invalid category name"];
    const res = await checkIfNameExists(table, data);
    if (res) { return [false, "The name was taken by another category!"] }
    return [true, "All properties are valid!"];
  }

  
  if (table === "recipes") {return validateRecipe(data)}
  if (table === "tags") {return validateTag(data)}
  if (table === "ingredients") {return validateIngredient(data)}
  if (table === "categories") {return validateCategory(data)}
  

  return [false, "Invalid table name"];
};



















/**
 * Misc
 */

export const getCurrentDate = (): string => {
  /** Gets the current date in the format yyyy-mm-dd */
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const getRandomKaomoji = (): string => {
  return kaomoji[Math.floor(Math.random() * kaomoji.length)];
}