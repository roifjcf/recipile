/*
Management page for categories, tags, and ingredients
*/
'use client';

import { useEffect, useState } from "react";
import Link from 'next/link'

import { Category, Tag, Ingredient } from "@/common/type";

import ManageItem from "@/components/manageItem";
import ManageAddItem from "@/components/manageAddItem";

import { addCategory, deleteCategory, getCategories, updateCategory } from "@/utils/api/categoryapi";
import { getTags, addTag, updateTag, deleteTag } from "@/utils/api/tagapi";
import { addIngredient, deleteIngredient, getIngredients, updateIngredient } from "@/utils/api/ingredientapi";

export default function Page() {

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [isInBulkEditMode, setIsInBulkEditMode] = useState<boolean>(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [categoryData, tagData, ingredientData] = await Promise.all([
          getCategories(),
          getTags(),
          getIngredients(),
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
        deleteTag(id);
        break;
      case 'categories':
        if (!categories) {return;}
        setCategories(categories.filter(category => category.id !== id));
        deleteCategory(id);
        break;
      case 'ingredients':
        if (!ingredients) {return;}
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
        deleteIngredient(id);
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
        updateTag(id, content);
        break;
      case 'ingredients':
        if (!ingredients) { return; }
        updateIngredient(content);
        break;
      case 'categories':
        if (!categories) { return; }
        updateCategory(id, content);
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
        await addTag(content);
        const [tagData] = await Promise.all([getTags()]);
        setTags(tagData);
        break;
      case 'ingredients':
        if (!ingredients) { return; }
        await addIngredient(content);
        const [ingredientData] = await Promise.all([getIngredients()]);
        setIngredients(ingredientData);
        break;
      case 'categories':
        if (!categories) { return; }
        await addCategory(content);
        const [categoryData] = await Promise.all([getCategories()]);
        setCategories(categoryData);
        break;
      default:
        break;
    }
  }

  return (
  <div className="manage-main-container">
    <Link href="/">Back</Link>
    {/* <button><a href="/">Back</a></button> */}
    {!isInBulkEditMode && <p className="icon clickable" onClick={()=>setIsInBulkEditMode(true)}>✏️</p>}
    {isInBulkEditMode && <p className="icon clickable" onClick={()=>setIsInBulkEditMode(false)}>❌</p>}
    {isInBulkEditMode && <p className="icon clickable">✅</p>}

    
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