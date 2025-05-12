/*
Management page for categories, tags, and ingredients
*/
'use client';

import { useEffect, useState } from "react";

import { Category, Tag, Ingredient, Tables } from "@/common/type";
import ManageItem from "@/components/manageItem";
import ManageAddItem from "@/components/manageAddItem";
import Navbar from "@/components/navbar";
import { categoryAPI, tagAPI, ingredientAPI } from "@/utils/api";


export default function Page() {
  
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  useEffect(() => {
    /** Init */
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
    Updates a record
    */
    switch (table) {
      case 'tags':
        if (!tags) { return; }
        tagAPI.update(id, content);
        break;
      case 'ingredients':
        if (!ingredients) { return; }
        ingredientAPI.update(content);
        break;
      case 'categories':
        if (!categories) { return; }
        categoryAPI.update(id, content);
        break;
      default:
        break;
    }
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

  const renderColumn = (table: Tables, title: string, data: Category[] | Tag[] | Ingredient[] | null) => {
    return (
      <div className="manage-column-container">
        <h2>{title}</h2>
        <ManageAddItem table={table} handleAdd={handleAdd} />
        {data && data.map((item: Category | Tag | Ingredient)=>
        <ManageItem
          key={item.id}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          item={item}
          table={table}
        />)}
        {!data &&
        <p>Loading...</p> }
      </div>
    );
  }

  return (
  <div className="manage-main-container">
    <Navbar />
    {renderColumn("categories", "Categories", categories)}
    {renderColumn("ingredients", "Ingredients", ingredients)}
    {renderColumn("tags", "Tags", tags)}
  </div>
  );
}