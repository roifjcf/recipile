const axios = require('axios').default;
const constant = require('../../common/constant');

export const getCategories = async () => {
  try {
    const response = await axios.get(constant.ROOT_URL + "categories");
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const addCategory = async(content: any) => {
  /*
  query: name
  */
  try {
    const response = await axios.post(constant.ROOT_URL + "categories", null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
};

export const updateCategory = async (id: number | string, content: any) => {
  /*
  query: content
  */
  try {
    const response = await axios.put(constant.ROOT_URL + `categories/${id}`, null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const deleteCategory = async (id: number | string) => {
  try {
    const response = await axios.delete(constant.ROOT_URL + `categories/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
} 