/*
  Basic interfaces
*/
export interface Recipe {
  id: number,
  name: string,
  ingredients: string[][],
  steps: string[],
  external_links: string,
  created: string,
  pinned: 0 | 1,
  serving: number,
  prep_time: number,
  notes: string,
  categories: string[],
  tags: string[],
}

export interface Category {
  id: number,
  name: string
}

export interface Tag {
  id: number,
  name: string
}

export interface Ingredient {
  id: number,
  name: string,
  unit: string
}


/*
  Extra interfaces for API
*/
export interface CategoryAPIAddParam { name: string };
export interface CategoryAPIUpdateParam { content: string };

export interface TagAPIAddParam { name: string };
export interface TagAPIUpdateParam { content: string };

export interface IngredientAPIAddParam { name: string, unit: string };
export interface IngredientAPIUpdateParam extends IngredientAPIAddParam { id: string | number };

export interface RecipeAPIAddParam {
  name: string,
  ingredients: string[][],
  steps: string[],
  external_links: string,
  created: string,
  pinned: 0 | 1,
  serving: number,
  prep_time: number,
  notes: string,
  categories: string[],
  tags: string[]
};
export interface RecipeAPIUpdateColumnParam {
  id: string | number,
  content: any,
  column: string
};






/*
  Type guards
*/
export const isIngredient = (item: Category | Tag | Ingredient): item is Ingredient => {
  return 'unit' in item;
};





/*
  ???
*/
export type Tables = "recipes" | "ingredients" | "tags" | "categories";
export type RecipeField = "name" | "ingredient" | "step" | "externalLink";