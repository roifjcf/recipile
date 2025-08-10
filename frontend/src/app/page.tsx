'use client';

import { useEffect, useRef, useState } from "react";

import Navbar from "@/components/navbar";
import PushNotification from "../components/pushNotification";
import RecipeDetail from "@/features/recipeDetail/recipeDetail";

import { RecipeInterface, CategoryInterface, TagInterface, IngredientInterface, Modes, RecipeCardDisplay, TagSetOperation, SideBarDisplay, RecipeSortOptions, PushNotificationMessageQueueInterface } from "@/common/type";
import { recipeAPI } from "@/utils/api"
import { convertImgUrl, fetchData, getRandomKaomoji, loadTheme } from "@/utils/helper";
import RecipesByCategory from "@/features/recipesByGroup/recipesByGroup";
import SideBar from "@/features/sideBar/sideBar";
import SearchResult from "@/features/recipeSearch/searchResult";
import PushNotificationContext from "@/contexts/pushNotificationContext";
import SortMethodContext from "@/contexts/sortMethodContext";

export default function Home() {

  /** Feature hooks */
  const [messageQueue, setMessageQueue] = useState<PushNotificationMessageQueueInterface[]>([]); // for push notification

  const [kaomoji, setKaomoji] = useState<string>("");// kaomoji
  const [mode, setMode] = useState<Modes>("view"); // toggles recipe detail edit
  const [recipeCardDisplay, setRecipeCardDisplay] = useState<RecipeCardDisplay>("full"); // different layouts for recipe card display
  const [showRecipeDetail, setShowRecipeDetail] = useState<boolean>(false); // toggles the modal

  
  // side bar stuff
  const [currentCategory, setCurrentCategory] = useState<CategoryInterface | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeInterface | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<TagInterface>>(new Set());
  const [tagSetOperation, setTagSetOperation] = useState<TagSetOperation>("union");
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


  // init
  useEffect(() => {
    // fetch categories
    // TODO if no categories create a default one and add it to the database
    const init = async () => {
      try {
        const [categoryData, recipeData, tagData, ingredientData] = await fetchData();
        // process data
        recipeData.forEach((recipe: RecipeInterface) => {
          return recipe["img_main"] = convertImgUrl(recipe["img_main"]);
        });
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
    init();
  }, []);


  useEffect(() => {
    /** Theme init */
    loadTheme();
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



  /** Misc */

  const addNotificationMessage = (msg: string) => {
    const queueToUpdate = [...messageQueue];
    queueToUpdate.push({content: msg, status: "Neutral"});
    setMessageQueue(queueToUpdate);
  }

  const pushNotificationContext = {
    addNotificationMessage: addNotificationMessage,
  };

  const sortMethodContext = {
    setRecipes: setRecipes,
    recipes: recipes,
  }


  
  return (
    <PushNotificationContext.Provider value={pushNotificationContext}>
    <SortMethodContext.Provider value={sortMethodContext} >
      <div className="page-main-container">
        <SideBar
          categories={categories}
          tags={tags}
          handleResetSearchInput={handleResetSearchInput}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tagSetOperation={tagSetOperation}
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
        <>
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
          />
          <div className="bluroverlay"></div>
        </>}

        <PushNotification
          messageQueue={messageQueue}
          setMessageQueue={setMessageQueue}
        />

      </div>
    </SortMethodContext.Provider>
    </PushNotificationContext.Provider>
  );
}
