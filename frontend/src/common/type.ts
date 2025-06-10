/*
  Basic data
*/
export interface RecipeInterface {
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
  img_filename: string,
  img_main: string | null,
}

export interface CategoryInterface {
  id: number,
  name: string,
  icon_file_name: string,
}

export interface TagInterface {
  id: number,
  name: string
}

export interface IngredientInterface {
  id: number,
  name: string,
  unit: string
}






/*
  Extra interfaces for API
*/
export interface CategoryAPIAddParam {
  name: string,
  icon_file_name: string,
};
export interface CategoryAPIUpdateParam extends CategoryAPIAddParam { id: string | number };


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
  tags: string[],
  img_filename: string,
  img_main: string | null,
};
export interface RecipeAPIUpdateColumnParam {
  id: string | number,
  content: any,
  column: string
};






/*
  Type guards
*/
export const isCategory = (item: CategoryInterface | TagInterface | IngredientInterface): item is CategoryInterface => {
  return 'icon_file_name' in item;
};
export const isIngredient = (item: CategoryInterface | TagInterface | IngredientInterface): item is IngredientInterface => {
  return 'unit' in item;
};





/*
  ???
*/
export type Tables = "recipes" | "ingredients" | "tags" | "categories";
export type RecipeFields = "name" | "ingredient" | "step" | "externalLink";
export type Modes = "view" | "update" | "new";
export type RecipeCardDisplay = "simple" | "full" | "list";
export type TagSetOperation = "intersection" | "union";
export type SideBarDisplay = "category" | "tag";
export type Interfaces = RecipeInterface | CategoryInterface | IngredientInterface | TagInterface;
export type RecipeSortOptions = "default" | "date" | "name" | "time" | "serving size";


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
  description?: string;
}
