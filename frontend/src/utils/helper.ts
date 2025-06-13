import { kaomoji } from "@/common/constant";
import {
  RecipeInterface,
  CategoryInterface,
  TagInterface,
  IngredientInterface,
  RecipeAPIAddParam,
  Tables,
  Interfaces,
  RecipeSortOptions
  } from "@/common/type";
import { categoryAPI, ingredientAPI, recipeAPI, tagAPI } from "./api";




export const findRecordNameByid = (id: number, records: CategoryInterface[] | TagInterface[] | IngredientInterface[] | RecipeInterface[] | null ) => {
  return records?.find(record => record.id === id)?.name || "";
};

export const findRecordidByName = (name: string, records: CategoryInterface[] | TagInterface[] | IngredientInterface[] | RecipeInterface[]  | null ) => {
  /** the name is a unique value (by the db schema) */
  return records?.find(record => record.name === name)?.id || "";
};

export const findIngredientUnitByid = (id: number, records: IngredientInterface[] | null ) => {
  return records?.find(record => record.id === id)?.unit || "";
};

export const removeEmptyItem = (list:string[]) => { return list.filter((item) => item !== ''); };
















export const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light'
  const html = document.documentElement;
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    // default to OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}

export const convertImgUrl = (s: string | null) => {
  /** Converts the image retrieved from the database */
  if (!s) {return null;}
  return s !== "" ? `data:image/jpeg;base64,${s}` : null;
}














/**
 * Data validation
 */

const checkIfNameExists = async (table: Tables, data: any) => {
  try {
    const apis = {
      categories: categoryAPI,
      ingredients: ingredientAPI,
      recipes: recipeAPI,
      tags: tagAPI,
    };

    const res = await apis[table].get();

    if (data["id"]) {
      // PUT
      return (res.filter((r:Interfaces) =>
                (r["id"] !== data["id"] && data["name"] === r["name"]))
                .length > 0)? true : false;
    } else {
      // POST
      return (res.filter((r:Interfaces) =>
        (data["name"] === r["name"]))
        .length > 0)? true : false;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
};


export const validateData = async (table: Tables, data: any) => {
  /**
   * Checks if all property values are valid before calling the API (POST / UPDATE)
   */
  const validateRecipe = async (data: RecipeInterface | RecipeAPIAddParam) => {
    // name
    if (data.name === "") return [false, "Name cannot be empty!"];
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) { return [false, "The name was taken by another recipe!"] }
    // serving size
    if (data.serving < 1 || !Number.isInteger(data.serving)) return [false, "Invalid serving size, please provide an ingeter greater than zero!"];
    // prep time
    if (data.prep_time < 0) return [false, "Invalid preparation time, please provide an non-negative integer!"];

    return [true, "All properties are valid!"];
  }

  const validateTag = async (data: TagInterface) => {
    //name
    if (data.name === "") return [false, "Name cannot be empty!"];
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) { return [false, "The name was taken by another tag!"] }

    return [true, "All properties are valid!"];
  }

  const validateIngredient = async (data: IngredientInterface) => {
    // name
    if (data.name === "") return [false, "Name cannot be empty!"];
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) { return [false, "The name was taken by another ingredient!"] }

    return [true, "All properties are valid!"];
  }


  const validateCategory = async (data: CategoryInterface) => {
    // name
    if (data.name === "") return [false, "Name cannot be empty!"];
    const nameExists = await checkIfNameExists(table, data);
    if (nameExists) { return [false, "The name was taken by another category!"] }

    return [true, "All properties are valid!"];
  }

  
  if (table === "recipes") {return validateRecipe(data)}
  if (table === "tags") {return validateTag(data)}
  if (table === "ingredients") {return validateIngredient(data)}
  if (table === "categories") {return validateCategory(data)}
  

  return [false, "Invalid table name"];
};



















/**
 * Misc
 */

export const getCurrentDate = (): string => {
  /** Gets the current date in the format yyyy-mm-dd */
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getRandomKaomoji = (): string => {
  return kaomoji[Math.floor(Math.random() * kaomoji.length)];
}

export const sortRecipe = (recipe: RecipeInterface[], option: RecipeSortOptions, reverse: boolean = false) => {
  /** Sorts recipes by option, returns a copy of new recipe */
  if (option === "default") { // pin
    if (reverse) { return [...recipe].sort((a,b) => a["pinned"]-b["pinned"]) }
    else { return [...recipe].sort((a,b) => b["pinned"]-a["pinned"]) }
  } else if (option === "date") {
    if (reverse) { return [...recipe].sort((a,b) => b["created"].localeCompare(a["created"])) } // Descending (Z–A)
    else { return [...recipe].sort((a,b) => a["created"].localeCompare(b["created"])) }// Ascending (A–Z)
  } else if (option === "name") {
    if (reverse) { return [...recipe].sort((a,b) => b["name"].localeCompare(a["name"])) } // Descending (Z–A)
    else { return [...recipe].sort((a,b) => a["name"].localeCompare(b["name"])) }// Ascending (A–Z)
  } else if (option === "time") {
    if (reverse) { return [...recipe].sort((a,b) => b["prep_time"]-a["prep_time"]) }
    else { return [...recipe].sort((a,b) => a["prep_time"]-b["prep_time"]) }
  } else if (option === "serving size") {
    if (reverse) { return [...recipe].sort((a,b) => a["serving"]-b["serving"]) }
    else { return [...recipe].sort((a,b) => b["serving"]-a["serving"]) }
  } else { // default, pim
    if (reverse) { return [...recipe].sort((a,b) => a["pinned"]-b["pinned"]) }
    else { return [...recipe].sort((a,b) => b["pinned"]-a["pinned"]) }
  }
}

export const numberToMonth = (month: number) => {
  /** 0-indexed */
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month] ?? "Invalid month";
}

export const generateCalendarMonthly = (date: Date, startFromMonday: boolean = true) => {
  /** 0-indexed */
  const calendar: Date[] = [];

  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed

  const firstDate = new Date(year, month, 1);
  const dayIndex = firstDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  const totalDaysOfCurrentMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysOfPreviousMonth = new Date(year, month, 0).getDate();

  let paddings: number;
  if (startFromMonday) {
    paddings = (dayIndex + 6) % 7;
  } else {
    paddings = dayIndex;
  }

  // Previous month's dates
  for (let i = paddings - 1; i >= 0; i--) {
    calendar.push(new Date(year, month - 1, totalDaysOfPreviousMonth - i));
  }

  // Current month's dates
  for (let i = 1; i <= totalDaysOfCurrentMonth; i++) {
    calendar.push(new Date(year, month, i));
  }

  // Next month's dates to fill up to 42 cells (6 weeks)
  let day = 1;
  while (calendar.length < 42) {
    calendar.push(new Date(year, month + 1, day));
    day++;
  }

  return calendar;
}

export const generateCalendarWeekly = (date: Date) => {
  const day = date.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = (day + 6) % 7;

  const monday = new Date(date);
  monday.setDate(date.getDate() - diffToMonday);

  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d);
  }

  return week;
}

export const generateCalendarBiWeekly = (date: Date) => {
  const day = date.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = (day + 6) % 7;

  // Find Monday of the current week
  const currentMonday = new Date(date);
  currentMonday.setDate(date.getDate() - diffToMonday);

  const currentWeek: Date[] = [];
  const nextWeek: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const dayInCurrentWeek = new Date(currentMonday);
    dayInCurrentWeek.setDate(currentMonday.getDate() + i);
    currentWeek.push(dayInCurrentWeek);

    const dayInNextWeek = new Date(currentMonday);
    dayInNextWeek.setDate(currentMonday.getDate() + i + 7);
    nextWeek.push(dayInNextWeek);
  }

  return [currentWeek, nextWeek];
}

export const getISOWeekNumber = (date: Date, startFromMonday: boolean = true) => {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  
  // Set to nearest Thursday: current date + 4 - current day number
  const day = tempDate.getUTCDay(); // 0 (Sun) to 6 (Sat)
  const diff = (day === 0 ? -6 : 1) - day; // shift Sunday to last
  tempDate.setUTCDate(tempDate.getUTCDate() + diff + 3); // move to Thursday

  const firstThursday = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 4));
  const weekNumber = Math.floor((tempDate.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

  return weekNumber;
}

export const getDateByOffset = (date: Date, offset: number = 0) => {
  const targetDate = new Date(date);
  targetDate.setDate(date.getDate() + offset);
  return targetDate;
}

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}