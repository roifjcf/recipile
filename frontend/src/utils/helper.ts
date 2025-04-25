import { Recipe, Category, Tag, Ingredient, RecipeAPIAddParam, Tables } from "@/common/type";

export const removeEmptyItem = (list:string[]) => { return list.filter((item) => item !== ''); };

export const findRecordNameByid = (id: number, records: Category[] | Tag[] | Ingredient[] | Recipe[] | null ) => {
  if (!records) return "";
  for (const record of records) { if (id === record["id"]) { return record["name"]; } }
  return "";
};

export const findRecordidByName = (name: string, records: Category[] | Tag[] | Ingredient[] | Recipe[]  | null ) => {
  if (!records) return "";
  for (const record of records) { if (name === record["name"]) { return record["id"]; } } // the name is a unique value (by the db schema)
  return "";
};

export const findIngredientUnitByid = (id: number, records: Ingredient[] | null ) => {
  if (!records) return "";
  for (const record of records) { if (id === record["id"]) { return record["unit"]; } }
  return "";
};

export const validateData = (table: Tables, data: any) => {
  /**
   * Checks if all property values are valid before calling the API (POST / UPDATE)
   */
  const validateRecipe = (data: Recipe | RecipeAPIAddParam) => {
    /** To validate: name, serving size, prep time  */
    if (data.name === "") return [false, "Invalid recipe name"];
    if (data.serving < 1 || !Number.isInteger(data.serving)) return [false, "Invalid serving size"];
    if (data.prep_time < 0) return [false, "Invalid preparation time"];
    return [true, "All properties are valid!"];
    
  }
  const validateTag = (data: Tag) => {
    /** To validate: name  */
    if (data.name === "") return [false, "Invalid tag name"];
    return [true, "All properties are valid!"];
  }
  const validateIngredient = (data: Ingredient) => {
    /** To validate: name, unit  */
    if (data.name === "") return [false, "Invalid ingredient name"];
    if (data.unit === "") return [false, "Invalid ingredient unit"];
    return [true, "All properties are valid!"];
  }
  const validateCategory = (data: Category) => {
    /** To validate: name  */
    if (data.name === "") return [false, "Invalid category name"];
    return [true, "All properties are valid!"];
  }

  if (table === "recipes") {return validateRecipe(data)}
  if (table === "tags") {return validateTag(data)}
  if (table === "ingredients") {return validateIngredient(data)}
  if (table === "categories") {return validateCategory(data)}
  return [false, "Invalid table name"];
};


export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const getRandomKaomoji = (): string => {
  const l = [
    "(*¯︶¯*)",
    "＼(≧▽≦)／",
    "⸜( ´ ꒳ ` )⸝",
    "( = ⩊ = )",
    "(„• ᴗ •„)",
    "(´ ∀ ` *)",
    "( ´ ꒳ ` )",
    "( ` ω ´ )",
    "(つ≧▽≦)つ",
    "(つ✧ω✧)つ",
    "( ˙꒳​˙ )",
    "Σ(°△°|||)︴",
    "٩(ˊᗜˋ*)و",
  ];
  return l[Math.floor(Math.random() * l.length)];
}