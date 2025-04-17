const axios = require('axios').default;
const constant = require('../../common/constant')

export const getIngredients = async () => {
  try {
    const url = constant.ROOT_URL + "ingredients";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}


export const addIngredient = async(content: any) => {
  /*
  query: name, unit
  */
  try {
    const response = await axios.post(constant.ROOT_URL + "ingredients", null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
};

export const updateIngredient = async (content: any) => {
  /*
  Updates all fields of an ingredient
  query: id, name, unit
  */
  try {
    const response = await axios.put(constant.ROOT_URL + `ingredients`, null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const deleteIngredient = async (id: number | string) => {
  try {
    const response = await axios.delete(constant.ROOT_URL + `ingredients/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
} 