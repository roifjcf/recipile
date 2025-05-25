'use client';

import { useEffect, useRef, useState } from "react";

import Navbar from "@/components/navbar";
import PushNotification from "../components/pushNotification";
import RecipeDetail from "@/features/recipeDetail/recipeDetail";

import { RecipeInterface, CategoryInterface, TagInterface, IngredientInterface, Mode, RecipeCardDisplay, TagSetOperation, SideBarDisplay } from "@/common/type";
import {recipeAPI, categoryAPI, tagAPI, ingredientAPI} from "@/utils/api"
import { getRandomKaomoji } from "@/utils/helper";
import RecipesByCategory from "@/features/recipesByCategory/recipesByCategory";
import SideBar from "@/features/sideBar/sideBar";
import SearchResult from "@/features/recipeSearchByCategory/searchResult";

export default function Home() {

  /** Feature hooks */
  const [showPushNotification, setShowPushNotification] = useState<boolean>(false);
  const [pushNotificationMessage, setPushNotificationMessage] = useState<string>('');

  const [kaomoji, setKaomoji] = useState<string>("");// kaomoji
  const [mode, setMode] = useState<Mode>("view"); // toggles recipe detail edit
  const [recipeCardDisplay, setRecipeCardDisplay] = useState<RecipeCardDisplay>("full"); // different layouts for recipe card display
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false); // toggles the modal

  // side bar stuff
  const [currentCategory, setCurrentCategory] = useState<CategoryInterface | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeInterface | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<TagInterface>>(new Set());
  const [tagSetOperation, setTagSetOperation] = useState<TagSetOperation>("intersection");
  const [currentGroup, setCurrentGroup] = useState<SideBarDisplay>("category"); // way to group recipes (e.g. by tags or categories)
  
  // debounced search (auto complete?)
  const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);




  /** Data hooks */
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([]);
  const [recipes, setRecipes] = useState<RecipeInterface[]>([])

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

  const toggleCardDisplay = (displayMode: RecipeCardDisplay) => {
    setRecipeCardDisplay(displayMode);
  }

  const handleDebounceChange = (e: any) => {
    setDebouncedSearchInput(e.target.value);
  }

  const handleResetSearchInput = () => {
    setDebouncedSearchInput("");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };









  
  return (
    <div className="page-main-container">

      <SideBar
        categories={categories}
        tags={tags}
        handleResetSearchInput={handleResetSearchInput}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setTagSetOperation={setTagSetOperation}
        currentGroup={currentGroup}
        setCurrentGroup={setCurrentGroup}
      />

      {/* displays search results if the search bar is not empty,
      otherwise displays recipes by category */}
      {debouncedSearchInput === "" ?
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
        showRecipeDetail={showRecipeDetail}
        selectedTags={selectedTags}
        currentGroup={currentGroup}
        tagSetOperation={tagSetOperation}
      />
      :
      <SearchResult
        recipes={recipes}
        debouncedSearchInput={debouncedSearchInput}
        tags={tags}
        recipeCardDisplay={recipeCardDisplay}
        setCurrentRecipe={setCurrentRecipe}
        setShowRecipeDetail={setShowRecipeDetail}
        setRecipes={setRecipes}
      />
      }




      {/* vvvvvvv fixed positon stuff */}

      <Navbar
        handleDebounceChange={handleDebounceChange}
        handleResetSearchInput={handleResetSearchInput}
        searchInputRef={searchInputRef}
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

      

    </div>
  );
}
