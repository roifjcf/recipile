const axios = require('axios').default;
const constant = require('../../common/constant')

export const getRecipes = async () => {
  try {
    const url = constant.ROOT_URL + "recipes";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}

