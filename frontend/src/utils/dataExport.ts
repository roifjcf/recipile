import saveAs from "file-saver";
import JSZip from "jszip";
import { categoryAPI, ingredientAPI, tagAPI } from "./api";
import { fetchData } from "./helper";






export const exportJSONData = async () => {
  const [categoryData, recipeData, tagData, ingredientData] = await fetchData();
  
  // process the recipe data (replace ids with names for categories / tags / ingredients)
  // add ingredient units
  // add category icons
  for (const record of recipeData) {
    // tags
    const tagNames = [];
    for (const id of record["tags"]) {
      const tagData = await tagAPI.getOne(id);
      tagNames.push(tagData["name"]);
    }
    record["tags"] = tagNames;
    // ingredients
    for (const ingre of record["ingredients"]) {
      const ingreData = await ingredientAPI.getOne(ingre[0]);
      ingre[0] = ingreData["name"];
      ingre[2] = ingreData["unit"];
    }
    // categories
    const cats = [];
    for (const id of record["categories"]) {
      const catData = await categoryAPI.getOne(id);
      cats.push([catData["name"], catData["icon_file_name"] ?? ""]);
    }
    record["categories"] = cats;
  }


  const files = [
    { data: categoryData, filename: "categories.json" },
    { data: recipeData, filename: "recipes.json" },
    { data: tagData, filename: "tags.json" },
    { data: ingredientData, filename: "ingredients.json" },
  ];


  files.forEach(({ data, filename }) => {
    const jsonString = JSON.stringify(data, null, 2); // Convert to JSON string
    const blob = new Blob([jsonString], { type: "application/json" }); // Create a blob and URL for the JSON file
    const url = URL.createObjectURL(blob);


    // Create a temporary link to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });



}



export const exportCSVData = async () => {
  const [categoryData, recipeData, tagData, ingredientData] = await fetchData();

  // process the recipe data (replace ids with names for categories / tags / ingredients)
  for (const record of recipeData) {
    // tags
    const tagNames: string[] = [];
    for (const id of record["tags"]) {
      const tag = await tagAPI.getOne(id);
      tagNames.push(tag["name"]);
    }
    record["tags"] = tagNames;

    // ingredients
    for (const ingre of record["ingredients"]) {
      const ingreData = await ingredientAPI.getOne(ingre[0]);
      ingre[0] = ingreData["name"];
      ingre[2] = ingreData["unit"];
    }

    // categories
    const cats: string[][] = [];
    for (const id of record["categories"]) {
      const cat = await categoryAPI.getOne(id);
      cats.push([cat["name"], cat["icon_file_name"] ?? ""]);
    }
    record["categories"] = cats;
  }

  // helper: convert array of objects to CSV
  const convertToCSV = (arr: any[], replacer?: (key: string, value: any) => any) => {
    if (arr.length === 0) return "";

    const headers = Object.keys(arr[0]);
    const csvRows = [headers.join(",")];

    for (const obj of arr) {
      const row = headers.map((field) => {
        let val = obj[field];

        // custom serialization for arrays/objects
        if (Array.isArray(val)) {
          if (field === "tags") {
            val = val.join(";");
          } else if (field === "ingredients") {
            val = val.map((i: any) => `${i[0]} ${i[1]} ${i[2]}`).join(";");
          } else if (field === "categories") {
            val = val.map((c: any) => `${c[0]}`).join(";");
          } else {
            val = JSON.stringify(val);
          }
        }

        // escape quotes & commas
        if (typeof val === "string") {
          val = `"${val.replace(/"/g, '""')}"`;
        }

        return val;
      });
      csvRows.push(row.join(","));
    }

    return csvRows.join("\n");
  };

  const files = [
    { data: categoryData, filename: "categories.csv" },
    { data: recipeData, filename: "recipes.csv" },
    { data: tagData, filename: "tags.csv" },
    { data: ingredientData, filename: "ingredients.csv" },
  ];

  // files.forEach(({ data, filename }) => {
  //   const csvString = convertToCSV(data);
  //   const blob = new Blob([csvString], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   a.click();

  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // });


  // Generate the zip and trigger download
  const zip = new JSZip();

  files.forEach(({ data, filename }) => {
    const csvString = convertToCSV(data);
    zip.file(filename, csvString); // add CSV to the ZIP
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "recipile_exported_csv_data.zip");
};




