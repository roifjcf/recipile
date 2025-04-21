'use client';

import { useEffect, useState } from "react";
import Link from 'next/link'

import CategoryList from "@/components/categoryList";
import PushNotification from "../components/pushNotification";
import RecipeCard from "@/components/recipeCard";
import RecipeDetail from "@/components/recipeDetail";

import { Recipe, Category, Tag, Ingredient, RecipeAPIAddParam } from "@/common/type";
import {recipeAPI, categoryAPI, tagAPI, ingredientAPI} from "@/utils/api"

export default function Home() {

  // others
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);
  const [mode, setMode] = useState<"view" | "update" | "new">("view");

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
          categoryAPI.get(),
          recipeAPI.get(),
          tagAPI.get(),
          ingredientAPI.get(),
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
        { showRecipeDetail && currentRecipe && ingredients && tags && currentCategory && recipes &&
        <RecipeDetail
          tags={tags}
          setTags={setTags}
          ingredients={ingredients}
          setIngredients={setIngredients}
          recipe={currentRecipe}
          setCurrentRecipe={setCurrentRecipe}
          mode={mode}
          setMode={setMode}
          currentCategory={currentCategory}
          recipes={recipes}
          setRecipes={setRecipes}
          setShowRecipeDetail={setShowRecipeDetail}
        />}
        {/* <RecipeDetailBlank /> */}


        <h1>{currentCategory?.name}</h1>
        <button
          id="new-recipe"
          onClick={()=>{
            setMode("new");
            setShowRecipeDetail(true);
            setCurrentRecipe({
              id: -1,
              name: "",
              ingredients: [],
              steps: [],
              external_links: "",
              created: "",
              pinned: 0,
              serving: 1,
              prep_time: 10,
              notes: "",
              categories: [],
              tags: [],
            })
          }}
        >
          Add recipe
        </button>
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
