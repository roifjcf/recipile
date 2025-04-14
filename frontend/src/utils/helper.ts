export const removeEmptyItem = (list:string[]) => {
  // returns a new list with all empty strings removed (shallow copy)
  return list.filter((item) => item !== '');
};