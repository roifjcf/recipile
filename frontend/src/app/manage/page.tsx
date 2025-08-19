/*
Management page for categories, tags, and ingredients
*/
'use client';

import { useEffect, useState } from "react";

import { CategoryInterface, TagInterface, IngredientInterface, Tables, PushNotificationMessageQueueInterface, PushNotificationStatus } from "@/common/type";
import Navbar from "@/components/navbar";
import { categoryAPI, tagAPI, ingredientAPI } from "@/utils/api";
import DatabaseEditCard from "@/features/databaseEditCard/databaseEditCard";
import { styleInit, validateData } from "@/utils/helper";
import PushNotification from "@/components/pushNotification";
import PushNotificationContext from "../../contexts/pushNotificationContext";








export default function Page() {
  
  const [categories, setCategories] = useState<CategoryInterface[] | null>(null);
  const [tags, setTags] = useState<TagInterface[] | null>(null);
  const [ingredients, setIngredients] = useState<IngredientInterface[] | null>(null);
  const [messageQueue, setMessageQueue] = useState<PushNotificationMessageQueueInterface[]>([]); // for push notification

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

  /** Theme init */
  useEffect(() => {
    styleInit();
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

    const validate = async () => {
      const [isValidData, message] = await validateData(table, content);
      if (isValidData) {
        if (table === "categories") {
          await categoryAPI.add(content);
          const [categoryData] = await Promise.all([categoryAPI.get()]);
          setCategories(categoryData);
        }
        if (table === "ingredients") {
          await ingredientAPI.add(content);
          const [ingredientData] = await Promise.all([ingredientAPI.get()]);
          setIngredients(ingredientData);
        }
        if (table === "tags") {
          await tagAPI.add(content);
          const [tagData] = await Promise.all([tagAPI.get()]);
          setTags(tagData);
        }
        return [isValidData, message];
      } else {
        return [isValidData, message];
      }
    }

    if (table === "tags" && !tags) { return [false, "tags is undefined!"]; }
    if (table === "ingredients" && !ingredients) { return [false, "ingredients is undefined"]; }
    if (table === "categories" && !categories) { return [false, "categories is undefined"]; }
    const res = validate();
    return res;
  }



  /** Misc */

  const addNotificationMessage = (msg: string, status: PushNotificationStatus) => {
    const queueToUpdate = [...messageQueue];
    queueToUpdate.push({content: msg, status: status});
    setMessageQueue(queueToUpdate);
  }

  const context = {
    addNotificationMessage: addNotificationMessage,
  };




  
  return (
  <PushNotificationContext.Provider value={context}>
    <div className="manage-main-container">
      <Navbar />

      <DatabaseEditCard
        table="categories"
        title="Categories"
        data={categories}
        dataSetter={setCategories}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <DatabaseEditCard
        table="ingredients"
        title="Ingredients"
        data={ingredients}
        dataSetter={setIngredients}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <DatabaseEditCard
        table="tags"
        title="Tags"
        data={tags}
        dataSetter={setTags}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <PushNotification
        messageQueue={messageQueue}
        setMessageQueue={setMessageQueue}
      />
    </div>
  </PushNotificationContext.Provider>
  );
}