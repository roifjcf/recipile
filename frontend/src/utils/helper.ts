/**
 * Helper functions for general purposes
 */

import { kaomoji } from "@/common/constant";
import {
  RecipeInterface,
  CategoryInterface,
  TagInterface,
  IngredientInterface,
  RecipeSortOptions,
  } from "@/common/type";
import { categoryAPI, ingredientAPI, recipeAPI, tagAPI } from "./api";
import Fuse from "fuse.js";









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










export const fetchData = async () => {
  /** fetches the following data from the database:
   * categories
   * tags
   * ingredients
   * recipes
  */

  const [categoryData, recipeData, tagData, ingredientData] = await Promise.all([
    categoryAPI.get(),
    recipeAPI.get(),
    tagAPI.get(),
    ingredientAPI.get(),
  ]);
  return [categoryData, recipeData, tagData, ingredientData];
}

export const fetchCategoryData = () => categoryAPI.get();
export const fetchRecipeData = () => recipeAPI.get();
export const fetchTagData = () => tagAPI.get();
export const fetchIngredientData = () => ingredientAPI.get();

export const deleteAllData = async () => {
  // ingredients
  let recordsToDelete = await ingredientAPI.get();
  for (const record of recordsToDelete) {
    await ingredientAPI.delete(record["id"]);
  }
  // tags
  recordsToDelete = await tagAPI.get();
  for (const record of recordsToDelete) {
    await tagAPI.delete(record["id"]);
  }
  // categories
  recordsToDelete = await categoryAPI.get();
  for (const record of recordsToDelete) {
    await categoryAPI.delete(record["id"]);
  }
  // recipes
  recordsToDelete = await recipeAPI.get();
  for (const record of recordsToDelete) {
    await recipeAPI.delete(record["id"]);
  }
  location.reload();
}







































export const convertImgUrl = (s: string | null) => {
  /** Converts the image retrieved from the database */
  if (!s) {return null;}
  return s !== "" ? `data:image/jpeg;base64,${s}` : null;
}

























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

export const getISOWeekNumber = (date: Date) => {
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


export const getFuzzySearchResult = <T>(
  searchTerm: string,
  items: T[],
  keys: (keyof T)[],
  threshold = 0.4
): T[] => {
  if (!searchTerm) return [];
  const fuse = new Fuse(items, {
    keys: keys as string[], // Fuse expects string keys
    threshold,
  });
  return fuse.search(searchTerm).map(res => res.item);
}