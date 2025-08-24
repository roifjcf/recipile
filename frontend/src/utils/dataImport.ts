import { Tables, RecipeAPIAddParam } from "@/common/type";
import { tagAPI, categoryAPI, ingredientAPI, recipeAPI } from "./api";
import { getCurrentDate } from "./helper";






export const fileImporter = async (table: Tables) => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json"; // only JSON files

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      const text = await file.text();
      try {
        // process data
        const data = JSON.parse(text);
        if (table === "tags") {await importTags(data);}
        if (table === "categories") {await importCategories(data);}
        if (table === "ingredients") {await importIngredients(data);}
        if (table === "recipes") {await importRecipes(data);}
        location.reload();
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };

    // trigger the file picker
    input.click();
  }

export const importTags = async (data: any) => {
  /** Imports tags from the local file*/
  for (const record of data) {
    if (!record["name"]) { continue; } // must have a name
    await tagAPI.add({"name": record["name"]});
  }
};

export const importCategories = async (data: any) => {
  /** Imports categories from the local file*/
  for (const record of data) {
    if (!record["name"]) { continue; } // must have a name
    const param = {"name": record["name"], "icon_file_name": record["icon_file_name"] ?? ""};
    await categoryAPI.add(param);
  }
};

export const importIngredients = async (data: any) => {
  /** Imports ingredients from the local file*/
  for (const record of data) {
    if (!record["name"]) { continue; } // must have a name
    const param = {"name": record["name"], "unit": record["unit"] ?? ""};
    await ingredientAPI.add(param);
  }
};

export const importRecipes = async (data: any) => {
  /** Imports recipes from the local file*/
  for (const record of data) {
    if (!record["name"]) { continue; } // must have a name

    // import any new tags then convert tag names to ids
    const tagids = [];
    for (const tagName of record["tags"]) {
      await tagAPI.add({"name": tagName});
      const tagData = await tagAPI.getOneByName(tagName);
      tagids.push(tagData["id"].toString());
    }
    record["tags"] = tagids;

    // import any new categories then convert category names to ids
    const catids = [];
    for (const cat of record["categories"]) {
      const param = {"name": cat[0], "icon_file_name": cat[1]};
      await categoryAPI.add(param);
      const catData = await categoryAPI.getOneByName(cat[0]);
      catids.push(catData["id"].toString());
    }
    if (catids.length === 0) { record["categories"] = ["Uncategorized"]; }
    else { record["categories"] = catids; }

    // import any new ingredients then convert ingredient names to ids
    const newIngreList = [];
    for (const ingre of record["ingredients"]) {
      const param = {"name": ingre[0], "unit": ingre[2]};
      await ingredientAPI.add(param);
      const ingreData = await ingredientAPI.getOneByName(ingre[0]);
      // ingre[0] = ingreData["id"].toString();
      newIngreList.push([ingreData["id"].toString(), ingre[1]]);
    }
    record["ingredients"] = newIngreList;
    // import the recipe itself
    const params: RecipeAPIAddParam = {
      name: record["name"],
      ingredients: record["ingredients"] ?? [],
      steps: record["steps"] ?? [],
      external_links: record["external_links"] ?? "",
      created: record["created"] ?? getCurrentDate(),
      pinned: record["pinned"] ?? 0,
      serving: record["serving"] ?? 1,
      prep_time: record["prep_time"] ?? 1,
      notes: record["notes"] ?? "",
      categories: record["categories"] ?? ["Uncategorized"],
      tags: record["tags"] ?? [],
      img_filename: record["img_filename"] ?? "",
      img_main: record["img_main"] ?? null
    };
    await recipeAPI.add(params);
  }

};









