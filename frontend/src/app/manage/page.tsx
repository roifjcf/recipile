/*
Management page for categories, tags, and ingredients
*/
'use client';

import { useEffect, useState } from "react";

import { CategoryInterface, TagInterface, IngredientInterface, Tables } from "@/common/type";
import Navbar from "@/components/navbar";
import { categoryAPI, tagAPI, ingredientAPI } from "@/utils/api";
import DatabaseEditCard from "@/features/databaseEditCard/databaseEditCard";
import { loadTheme, validateData } from "@/utils/helper";
import PushNotification from "@/components/pushNotification";
import ManageContext from "./manageContext";








export default function Page() {
  
  const [categories, setCategories] = useState<CategoryInterface[] | null>(null);
  const [tags, setTags] = useState<TagInterface[] | null>(null);
  const [ingredients, setIngredients] = useState<IngredientInterface[] | null>(null);
  const [messageQueue, setMessageQueue] = useState<string[]>(["a", "b"]); // for push notification

  /** Init */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, tagData, ingredientData] = await Promise.all([
          categoryAPI.get(),
          tagAPI.get(),
          ingredientAPI.get(),
        ]);
        setCategories(categoryData);
        setTags(tagData);
        setIngredients(ingredientData);
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchData();
  }, []);

  useEffect(() => {
    /** Theme init */
    loadTheme();
  }, []);


  /** Handlers */
  const handleDelete = async (table: Tables, id: string | number) => {
    /*
    Removes a record from the hook and database
    */
    switch (table) {
      case 'tags':
        if (!tags) {return;}
        setTags(tags.filter(tag => tag.id !== id));
        tagAPI.delete(id);
        break;
      case 'categories':
        if (!categories) {return;}
        setCategories(categories.filter(category => category.id !== id));
        categoryAPI.delete(id);
        break;
      case 'ingredients':
        if (!ingredients) {return;}
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
        ingredientAPI.delete(id);
        break;
      default:
        break;
    }
  }

  const handleUpdate = async (table: Tables, id: string | number, content: any) => {
    /*
    Updates a record, returns true if updated successfully, otherwise false
    */
    const validate = async () => {
      const [isValidData, message] = await validateData(table, content);
        if (isValidData) {
          if (table === "categories") {categoryAPI.update(content);}
          if (table === "ingredients") {ingredientAPI.update(content);}
          if (table === "tags") {tagAPI.update(id, content);}
          return [isValidData, message];
        } else {
          return [isValidData, message];
        }
    };

    if (table === "tags" && !tags) { return [false, "tags is undefined!"]; }
    if (table === "ingredients" && !ingredients) { return [false, "ingredients is undefined"]; }
    if (table === "categories" && !categories) { return [false, "categories is undefined"]; }
    const res = validate();
    return res;
  };

  const handleAdd = async (table: Tables, content: any) => {
    /*
    Adds a new record
    */
    switch (table) {
      case 'tags':
        if (!tags) { return; }
        await tagAPI.add(content);
        const [tagData] = await Promise.all([tagAPI.get()]);
        setTags(tagData);
        break;
      case 'ingredients':
        if (!ingredients) { return; }
        await ingredientAPI.add(content);
        const [ingredientData] = await Promise.all([ingredientAPI.get()]);
        setIngredients(ingredientData);
        break;
      case 'categories':
        if (!categories) { return; }
        await categoryAPI.add(content);
        const [categoryData] = await Promise.all([categoryAPI.get()]);
        setCategories(categoryData);
        break;
      default:
        break;
    }
  }



  /** Misc */

  const addNotificationMessage = (msg: string) => {
    const queueToUpdate = [...messageQueue];
    queueToUpdate.push(msg);
    setMessageQueue(queueToUpdate);
  }

  const context = {
    addNotificationMessage: addNotificationMessage,
  };




  
  return (
  <ManageContext.Provider value={context}>
    <div className="manage-main-container">
      <Navbar />

      <DatabaseEditCard
        table="categories"
        title="Categories"
        data={categories}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <DatabaseEditCard
        table="ingredients"
        title="Ingredients"
        data={ingredients}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <DatabaseEditCard
        table="tags"
        title="Tags"
        data={tags}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <PushNotification
        messageQueue={messageQueue}
        setMessageQueue={setMessageQueue}
      />
    </div>
  </ManageContext.Provider>
  );
}