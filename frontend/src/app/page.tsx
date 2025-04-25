'use client';

import { useEffect, useState } from "react";
import Link from 'next/link'

import CategoryList from "@/components/categoryList";
import Icon from "@/components/icon";
import Navbar from "@/components/navbar";
import PushNotification from "../components/pushNotification";
import RecipeCard from "@/components/recipeCard";
import RecipeDetail from "@/components/recipeDetail";

import { Recipe, Category, Tag, Ingredient, Mode, recipeCardDisplay } from "@/common/type";
import {recipeAPI, categoryAPI, tagAPI, ingredientAPI} from "@/utils/api"
import { getRandomKaomoji } from "@/utils/helper";

export default function Home() {

  // others
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false);
  const [kaomoji, setKaomoji] = useState<string>("");
  const [mode, setMode] = useState<Mode>("view");
  const [recipeCardDisplay, setRecipeCardDisplay] = useState<recipeCardDisplay>("full");

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
    setKaomoji(getRandomKaomoji());
    fetchData();
  }, []);

  

  

  return (
    <div className="page-main-container">
      <Navbar />
      
      <div className="page-left-container" id="categories">
        <div className="page-filter-button-container">
          <button>By category</button>
          <button>By tag</button>
        </div>
        {categories && currentCategory &&
        <CategoryList
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />}
      </div>

      <div className="page-right-container">
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


        <div className="page-right-info-container">
          <div className="left">
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
          </div>
          <div className="right">
              <Icon src="display-simple" hoverable={true} changeSrc={false} onClick={()=>setRecipeCardDisplay("simple")}/>
              <Icon src="display-full" hoverable={true} changeSrc={false} onClick={()=>setRecipeCardDisplay("full")}/>
          </div>
        </div>

        <div className="page-recipe-card-container">
          {recipes && currentCategory && tags &&
          recipes.filter((recipe) => recipe["categories"].includes(currentCategory["id"].toString())).length > 0 ?
          recipes.filter((recipe) => recipe["categories"].includes(currentCategory["id"].toString()))
          .map((recipe, index) =>
          <RecipeCard
            key={index}
            recipe={recipe}
            recipes={recipes}
            tags={tags}
            recipeCardDisplay={recipeCardDisplay}
            setRecipes={setRecipes}
            setCurrentRecipe={setCurrentRecipe}
            setShowRecipeDetail={setShowRecipeDetail}
          />)
          :
          <div className="page-empty-cat-msg">
            <p>{kaomoji}</p>
            <p>No recipes under this category!</p>
          </div>
        
          }
          {/* {recipes && currentCategory && tags &&
          recipes.filter((recipe) => recipe["categories"].includes(currentCategory["id"].toString()))
          .map((recipe, index) =>
          <RecipeCard
            key={index}
            recipe={recipe}
            recipes={recipes}
            tags={tags}
            recipeCardDisplay={recipeCardDisplay}
            setRecipes={setRecipes}
            setCurrentRecipe={setCurrentRecipe}
            setShowRecipeDetail={setShowRecipeDetail}
          />)
          } */}
        </div>
      </div>
    </div>
  );
}
