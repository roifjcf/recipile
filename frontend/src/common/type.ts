/*
  Basic data
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
  categories: string[], // id
  tags: string[], // id
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
export interface CategoryAPIUpdateParam extends CategoryAPIAddParam { };

export interface TagAPIAddParam { name: string };
export interface TagAPIUpdateParam extends TagAPIAddParam { };

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
export type Mode = "view" | "update" | "new";
export type recipeCardDisplay = "simple" | "full" | "list";




/*
  Other props
*/

export interface IconProps {
  src: string;
  altsrc?: string | undefined;
  hoverable?: boolean;
  onClick?: ((...args: any[]) => void) | undefined;
  className?: string;
  key?: number;
}
