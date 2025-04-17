import { Recipe, Category, Tag, Ingredient } from "@/common/type";

export const removeEmptyItem = (list:string[]) => {
  // returns a new list with all empty strings removed (shallow copy)
  return list.filter((item) => item !== '');
};

export const findRecordNameByid = (id: number, records: Category[] | Tag[] | Ingredient[] | null ) => {
  if (!records) return "";
  for (const record of records) {
    if (id === record["id"]) { return record["name"]; }
  }
  return "";
}

export const findRecordidByName = (name: string, records: Category[] | Tag[] | Ingredient[] | null ) => {
  // the name is a unique value (by the db schema)
  if (!records) return "";
  for (const record of records) {
    if (name === record["name"]) { return record["id"]; }
  }
  return "";
}

export const findIngredientUnitByid = (id: number, records: Ingredient[] | null ) => {
  if (!records) return "";
  for (const record of records) {
    if (id === record["id"]) { return record["unit"]; }
  }
  return "";
}


// export const findIndexByid = (records: Ingredient[] | Category[] | Tag[] | Recipe[], id: string | number) => {
//   if (!records) { return -1; }
//   for (let i = 0; i < records.length; i++) {
//     if (records[i].id.toString() === id.toString()) return i;
//   }
//   return -1;
// }