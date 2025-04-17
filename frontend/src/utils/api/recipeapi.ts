const axios = require('axios').default;
const constant = require('../../common/constant')

export const getRecipes = async () => {
  try {
    const url = constant.ROOT_URL + "recipes";
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const addRecipe = async () => {
  /*
  query: name, ingredients, steps, external_links, created, pinned,
        serving, perp_time, notes, categories, tags
  */
};


export const updateRecipe = async (id: number, newData: any) => {
  /*
  query: id, name, ingredients, steps, external_links, created, pinned,
        serving, perp_time, notes, categories, tags
  */
  try {
    const url = constant.ROOT_URL + `recipes/${id}`;
    const response = await axios.put(url, null, {params: newData});
    return response.data;
  } catch (e) {
    console.error(e);
  }
};


export const deleteRecipe = async () => {
};