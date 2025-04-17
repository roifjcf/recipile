export interface Recipe {
  categories: string[],
  created: string,
  external_links: string,
  id: number,
  ingredients: string[][],
  name: string,
  notes: string,
  pinned: number,
  prep_time: number,
  serving: number,
  steps: string[],
  tags: string[]
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






export const isIngredient = (item: Category | Tag | Ingredient): item is Ingredient => {
  return 'unit' in item;
};







export type Tables = "recipes" | "ingredients" | "tags" | "categories";
export type RecipeField = "name" | "ingredient" | "step" | "externalLink";