/*
Management page for categories, tags, and ingredients
*/
'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';

import { Category, Tag, Ingredient } from "@/common/type";
import ManageItem from "@/components/manageItem";
import ManageAddItem from "@/components/manageAddItem";
import Navbar from "@/components/navbar";
import { categoryAPI, tagAPI, ingredientAPI } from "@/utils/api";



export default function Page() {
  
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

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

  const handleDelete = async (table: string, id: string | number) => {
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

  const handleUpdate = async (table: string, id: string | number, content: any) => {
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

  const handleAdd = async (table: string, content: any) => {
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

  return (
  <div className="manage-main-container">
    
    <Navbar />
    
    {/* categories */}
    <div className="manage-column-container">
      <h2>Categories</h2>
      <ManageAddItem table="categories" handleAdd={handleAdd} />
      {categories && categories.map((cat, index)=>
      <ManageItem
        key={cat.id}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        item={cat}
        table="categories"
      />)}
      {!categories &&
      <p>Loading...</p> }
    </div>



    {/* ingredients */}
    <div className="manage-column-container">
      <h2>Ingredients</h2>
      <ManageAddItem table="ingredients" handleAdd={handleAdd} />
      {ingredients && ingredients.map((ingredient, index) =>
      <ManageItem
        key={ingredient.id}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        item={ingredient}
        table="ingredients"
      />)}
      {!ingredients &&
      <p>Loading...</p> }
    </div>
    


    {/* tags */}
    <div className="manage-column-container">
      <h2>Tags</h2>
      <ManageAddItem table="tags" handleAdd={handleAdd} />
      {tags && tags.map((tag) =>
      <ManageItem
        key={tag.id}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        item={tag}
        table="tags"
      />)}
      {!tags &&
      <p>Loading...</p> }
    </div>


  </div>
  );
}