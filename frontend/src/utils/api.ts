import axios from "axios";
import {ROOT_URL} from "@/common/constant";
import {
  CategoryAPIAddParam, CategoryAPIUpdateParam,
  TagAPIAddParam, TagAPIUpdateParam,
  IngredientAPIAddParam, IngredientAPIUpdateParam,
  RecipeAPIAddParam, RecipeAPIUpdateColumnParam,
  RecipeInterface
} from "@/common/type";

const api = axios.create({
  baseURL: ROOT_URL,
});

const handleRequest = async (fn:() => Promise<any>) => {
  try {
    const response = await fn();
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
/*
  category API
*/
export const categoryAPI = {
  get: () => handleRequest(() => api.get("categories")),
  add: (content: CategoryAPIAddParam) => handleRequest(() => api.post("categories", null, {params: content})),
  update: (id: number | string, content: CategoryAPIUpdateParam) => handleRequest(() => api.put(`categories/${id}`, null, {params: content})),
  delete: (id: number | string) => handleRequest(() => api.delete(`categories/${id}`)),
};
/*
  tag API
*/
export const tagAPI = {
  get: () => handleRequest(() => api.get("tags")),
  add: (content: TagAPIAddParam) => handleRequest(() => api.post("tags", null, {params: content})),
  update: (id: number | string, content: TagAPIUpdateParam) => handleRequest(() => api.put(`tags/${id}`, null, {params: content})),
  delete: (id: number | string) => handleRequest(() => api.delete(`tags/${id}`)),
};
/*
  ingredient API
*/
export const ingredientAPI = {
  get: () => handleRequest(() => api.get("ingredients")),
  add: (content: IngredientAPIAddParam) => handleRequest(() => api.post("ingredients", null, {params: content})),
  update: (content: IngredientAPIUpdateParam) => handleRequest(() => api.put("ingredients", null, {params: content})), // updates all fields of an ingredient
  delete: (id: number | string) => handleRequest(() => api.delete(`ingredients/${id}`)),
};
/*
  recipe API
*/
export const recipeAPI = {
  get: () => handleRequest(() => api.get("recipes")),
  add: (content: RecipeAPIAddParam) => handleRequest(() => api.post("recipes", content, {headers: {'Content-Type': 'application/json'}})),
  update: (content: RecipeInterface) => {handleRequest(() => api.put("recipes", content, {headers: {'Content-Type': 'application/json'}}))},
  updateColumn: (id: string | number, content: RecipeAPIUpdateColumnParam) => handleRequest(() => api.put(`recipes/${id}`, null, {params: content})),
  delete: (id: number | string) => handleRequest(() => api.delete(`recipes/${id}`)),
};