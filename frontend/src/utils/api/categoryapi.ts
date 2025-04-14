const axios = require('axios').default;
const constant = require('../../common/constant')

export const getCategories = async () => {
  try {
    const url = constant.ROOT_URL + "categories";
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
}