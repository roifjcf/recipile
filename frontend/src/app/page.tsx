'use client';

import { useEffect, useState } from "react";
import Link from 'next/link'

import RecipeCard from "@/components/recipeCard";
import PushNotification from "../components/pushNotification";
import CategoryList from "@/components/categoryList";
import RecipeDetail from "@/components/recipeDetail";

import { Recipe, Category, Tag, Ingredient } from "@/common/type";

import { getRecipes } from "@/utils/api/recipeapi";
import { getCategories } from "@/utils/api/categoryapi";
import { getTags } from "@/utils/api/tagapi";
import { getIngredients } from "@/utils/api/ingredientapi";

export default function Home() {

  // others
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);

  // data hooks
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  /////////////////////////////

  const handleShowPushNotification = () => {
    setShowPushNotification(true);
    setTimeout(() => { setShowPushNotification(false); }, 6000);
  }

  // init
  useEffect(() => {
    // fetch categories
    // TODO if no categories create a default one and att it to the database
    const fetchData = async () => {
      try {
        const [categoryData, recipeData, tagData, ingredientData] = await Promise.all([
          getCategories(),
          getRecipes(),
          getTags(),
          getIngredients(),
        ]);

        setCategories(categoryData);
        setCurrentCategory(categoryData[0]);
        setRecipes([...recipeData].sort((a,b) => b["pinned"]-a["pinned"]));
        setTags(tagData);
        setIngredients(ingredientData);
      } catch (error) {
        console.error(error);
      }
      
    };

    fetchData();
  }, []);

  

  

  return (
    <div className="main-container">

      <div className="left-container" id="categories">
        <h1>Recipile Alpha</h1>
        <Link href="/manage">Manage</Link>
        <Link href="/planner">Planner</Link>
        {/* <button><a href="/manage">Manage</a></button>
        <button><a href="/planner">Planner</a></button> */}

        <br />
        <br />
        <br />
        
        <button>By category</button>
        <button>By tag</button>
        {categories && currentCategory &&
        <CategoryList
          categories={categories}
          setCurrentCategory={setCurrentCategory}
        />}
      </div>

      <div className="right-container">
        { showPushNotification &&
        <PushNotification message={pushNotificationMessage}/>}
        { showRecipeDetail && currentRecipe && ingredients && tags &&
        <RecipeDetail
          tags={tags}
          ingredients={ingredients}
          currentRecipe={currentRecipe}
          setShowRecipeDetail={setShowRecipeDetail}
        />}

        <h1>{currentCategory?.name}</h1>
        <button id="new-recipe">Add recipe</button>
        <div className="recipe-card-container">
          {recipes && currentCategory &&
          recipes.filter((recipe) => recipe["categories"].includes(currentCategory["id"].toString()))
          .map((recipe, index) =>
          <RecipeCard
            key={index}
            recipe={recipe}
            recipes={recipes}
            tags={tags}
            setRecipes={setRecipes}
            setCurrentRecipe={setCurrentRecipe}
            setShowRecipeDetail={setShowRecipeDetail}
          />)
          }
        </div>
      </div>
    </div>
  );
}
