const axios = require('axios').default;
const constant = require('../../common/constant');

export const getTags = async () => {
  try {
    const response = await axios.get(constant.ROOT_URL + "tags");
    return response.data;
  } catch (e: any) {
    console.error(e);
  }
}

export const addTag = async (content: any) => {
  /*
  query: name
  */
  try {
    const response = await axios.post(constant.ROOT_URL + "tags", null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const updateTag = async (id: number | string, content: any) => {
  /*
  query: content
  */
  try {
    const response = await axios.put(constant.ROOT_URL + `tags/${id}`, null, {params: content});
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const deleteTag = async (id: number | string) => {
  try {
    const response = await axios.delete(constant.ROOT_URL + `tags/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
} 