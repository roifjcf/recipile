'use client';

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar";
import PushNotification from "../components/pushNotification";
import RecipeDetail from "@/features/recipeDetail/recipeDetail";

import { Recipe, Category, Tag, Ingredient, Mode, recipeCardDisplay } from "@/common/type";
import {recipeAPI, categoryAPI, tagAPI, ingredientAPI} from "@/utils/api"
import { getRandomKaomoji } from "@/utils/helper";
import RecipesByCategory from "@/features/recipesByCategory/recipesByCategory";
import SideBar from "@/features/sideBar/sideBar";

export default function Home() {
  // others
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');

  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);
  const [kaomoji, setKaomoji] = useState<string>("");
  const [mode, setMode] = useState<Mode>("view"); // toggles recipe detail edit
  const [recipeCardDisplay, setRecipeCardDisplay] = useState<recipeCardDisplay>("full"); // different recipe card layouts

  // data hooks
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([])
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
    // TODO if no categories create a default one and add it to the database
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
    setKaomoji(getRandomKaomoji());
    fetchData();
  }, []);





  /**
   * Handlers
   */
  const handleDeleteRecipe = async (id: number) => {
    if (!recipes) return;
    const newRecipeList = recipes.filter((r)=> r.id !== id);
    setRecipes(newRecipeList);
    try {
      recipeAPI.delete(id);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleCardDisplay = () => {
    if (recipeCardDisplay === "full") { setRecipeCardDisplay("simple") }
    else { setRecipeCardDisplay("full") }
  }






  
  
  return (
    <div className="page-main-container">
      <Navbar />

      <SideBar
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />

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
        handleDeleteRecipe={handleDeleteRecipe}
      />}

      <RecipesByCategory
        currentCategory={currentCategory}
        setMode={setMode}
        setShowRecipeDetail={setShowRecipeDetail}
        setCurrentRecipe={setCurrentRecipe}
        recipeCardDisplay={recipeCardDisplay}
        toggleCardDisplay={toggleCardDisplay}
        recipes={recipes}
        tags={tags}
        kaomoji={kaomoji}
        setRecipes={setRecipes}
      />

    </div>
  );
}
