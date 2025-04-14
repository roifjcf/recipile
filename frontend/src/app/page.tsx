'use client';

import { useEffect, useState } from "react";


import PushNotification from "../components/pushNotification";
import NewRecipe from "@/components/newRecipe";
import { Recipe, Category, Tag, Ingredient } from "@/common/type";
import CategoryList from "@/components/categoryList";
import RecipeCard from "@/components/recipeCard";

import { getRecipes } from "@/utils/api/recipeapi"
import { getCategories } from "@/utils/api/categoryapi"

export default function Home() {

  const [isNewRecipeOpen, setIsNewRecipeOpen] = useState<boolean>(false);
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)

  // init
  useEffect(() => {
    // fetch categories
    // TODO if no categories create a default one and att it to the database
    getCategories()
      .then(data => {
        setCategories([...data]);
      })
      .catch(error => {
        console.log(error);
      });
    // TODO: 
    getRecipes()
      .then(data => {
        setRecipes([...data])
      })
      .catch(error => {
        console.log(error);
      })
    
    // fetch tags
    // fetch ingredients

    // modify recipe data


    
    

  }, []);

  const handleShowPushNotification = () => {
    setShowPushNotification(true);
    setTimeout(() => {
      setShowPushNotification(false);
    }, 6000);
  }


  return (
    <div className="main-container">

      <div className="left-container" id="categories">
        <h1>Recipile Alpha</h1>
        <p>Categories</p>
        {/* {categories ? 
        <CategoryList
          categories={categories}
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
          setCategories={setCategories}
          setPushNotificationMessage={setPushNotificationMessage}
          handleShowPushNotification={handleShowPushNotification}
          recipes={recipes}
          setRecipes={setRecipes}
        />
        :
        <p>Loading...</p>
        } */}
      </div>
      <div className="right-container">
        { showPushNotification &&
        <PushNotification message={pushNotificationMessage}/>}

        <h1>{currentCategory}</h1>
        <button className="text-btn" onClick={() => setIsNewRecipeOpen(true)} id="new-recipe">Add recipe</button>
        
        
        {/* {recipes ? 
        <>
        { recipes.filter((recipe) => recipe.category===currentCategory).length > 0 ?
        <div className="recipe-card-container">
          {recipes.map((recipe, index) =>
          recipe.category === currentCategory &&
          <RecipeCard 
            key={index}
            index={index}
            recipe={recipe}
            categories={categories}
            currentCategory={currentCategory}
            recipes={recipes}
            setRecipes={setRecipes}
          />)}
        </div> :
        <p>The current category is empty, let's add some recipe!</p>}
        </>
        :
        <p>Loading...</p>
        } */}




        {isNewRecipeOpen &&
        <NewRecipe 
          setIsNewRecipeOpen={setIsNewRecipeOpen}
          setShowPushNotification={setShowPushNotification}
          setPushNotificationMessage={setPushNotificationMessage}
          handleShowPushNotification={handleShowPushNotification}
          currentCategory={currentCategory}
        />}
      </div>
    </div>
  );
}
