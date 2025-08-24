"use client";
import { CategoryInterface, Modes, RecipeInterface, RecipeCardDisplay, TagInterface, SideBarDisplay, TagSetOperation } from "@/common/type";
import InfoBar from "./components/infoBar";
import RecipeCards from "./components/recipeCards";
import { useEffect, useState } from "react";
import { recipeAPI } from "@/utils/api";
import EmptyDisplay from "./components/emptyDisplay";
import Icon from "@/components/icon/icon";
import CategorySelection from "./components/categorySelection";

interface Props {
  currentCategory: CategoryInterface | null,
  categories: CategoryInterface[],
  mode: Modes,
  setMode: (hookval: Modes) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  currentRecipe: RecipeInterface | null,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  recipeCardDisplay: RecipeCardDisplay,
  toggleCardDisplay: (hookval: RecipeCardDisplay) => void,
  recipes: RecipeInterface[],
  tags: TagInterface[],
  kaomoji: string,
  setRecipes: (hookval: RecipeInterface[]) => void,
  showRecipeDetail: boolean,
  selectedTags: Set<TagInterface>,
  currentGroup: SideBarDisplay,
  tagSetOperation: TagSetOperation,
};

export default function RecipesByGroup({
  currentCategory,
  categories,
  mode,
  setMode,
  setShowRecipeDetail,
  currentRecipe,
  setCurrentRecipe,
  recipeCardDisplay,
  toggleCardDisplay,
  recipes,
  tags,
  kaomoji,
  setRecipes,
  showRecipeDetail,
  selectedTags,
  currentGroup,
  tagSetOperation,
}: Props) {



  /**
   * General
   */
  const getCurrentRecipe = (
    currentGroup: SideBarDisplay,
    tagSetOperation: TagSetOperation
  ) => {
    /** Gets a list of recipes to render */

    if (currentGroup === "category") {
      return currentCategory ? recipes.filter(recipe => recipe["categories"].includes(currentCategory["id"].toString())) : []

    } else if (currentGroup === "tag") {
      if (selectedTags.size === 0) {
        if (tagSetOperation === "union") { return recipes; }
        if (tagSetOperation === "intersection") { return []; }
      }

      const selectedTagsArr = Array.from(selectedTags).map(t=>t["id"].toString()); // id of selected tags
      const res: RecipeInterface[] = [];
      
      if (tagSetOperation === "union") {
        for (const recipe of recipes) {
          for (const id of recipe["tags"]) {
            if (selectedTagsArr.includes(id)) {
              res.push(recipe);
            }
          }
        }
      } else if (tagSetOperation === "intersection") {
        for (const recipe of recipes) {
          const currIdList = recipe["tags"];
          let canAdd = true;
          for (const tagId of selectedTagsArr) {
            if (!currIdList.includes(tagId)) { canAdd = false; break; }
          }
          if (canAdd) {res.push(recipe)}
        }
      }

      return Array.from(new Set(res)); // removes duplicates
    
      } else {
      return [];
    }

  }

  const currentRecipes = getCurrentRecipe(currentGroup, tagSetOperation);


  

  /**
   * Feature: select multiple
   */
  const [recipesToEdit, setRecipesToEdit] = useState<Set<number>>(new Set()); // multiple selection feature
  const [isBulkEditing, setIsBulkEditing] = useState<boolean>(false); // multiple selection feature
  const [showCategorySelection, setShowCategorySelection] = useState<boolean>(false);

  function isSameSet<T>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }

  const handleUpdateEditList = (id: number, e: React.MouseEvent) => {
    /** Toggles selection */
    e.stopPropagation();
    setRecipesToEdit(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  console.log(recipes);
  const handleMoveSelectedRecipes = async (selectedCategoryid: number) => {
    /** Moves selected recipes to another category
     * Every recipe should ONLY have one category
    */
    if (!recipes) return;
    try {
      const updatedRecipes = [...recipes];
      updatedRecipes.forEach(recipe => {
        if (recipesToEdit.has(recipe.id)) {
          recipe.categories = [selectedCategoryid.toString()];
          recipeAPI.update(recipe); // update the database
        }
      })
      setRecipes(updatedRecipes); // update the recipe hook
      setRecipesToEdit(new Set()); // reset relected recipe
    } catch (error) {
      console.log(error)
    }

    setRecipesToEdit(new Set());
  }

  const handleDeleteRecipes = async (idSet: Set<number>) => {
    /** Deletes selected recipes */
    if (!recipes) return;
    try {
      const newRecipeList = recipes.filter((r)=> !idSet.has(r.id));
      setRecipes(newRecipeList); // update the recipe hook
      for (const id of idSet) { recipeAPI.delete(id); } // update the database
      setRecipesToEdit(new Set()); // reset relected recipe
    } catch (err) {
      console.log(err);
    }
  }

  
  const toggleSelectAll = () => {
    /** Selects / De-selects all recipes being displayed */
    const newSet = new Set(currentRecipes.map(currRec => currRec.id));
    if (isSameSet(newSet, recipesToEdit)) {
      setRecipesToEdit(new Set()); // de-select
    } else {
      setRecipesToEdit(newSet); // select all
    }
  };






  /** Keyboard event listener */
  // useEffect(() => {
  //   // TODO
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (mode !== "view") return;
  //     if (!currentRecipe) return;
  //     const currentIndex = currentRecipes.indexOf(currentRecipe);
  //     console.log(currentIndex);
  //     if (e.key === "ArrowLeft") {
  //       const newIndex = currentIndex > 0 ? currentIndex-1 : 0;
  //       console.log(currentRecipes[newIndex]);
  //       setCurrentRecipe(currentRecipes[newIndex]);
  //     } else if (e.key === "ArrowRight") {
  //       const newIndex = currentIndex < currentRecipes.length-1 ? currentIndex+1 : currentRecipes.length-1;       
  //       setCurrentRecipe(currentRecipes[newIndex]);
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [currentRecipes, currentRecipe, mode]);
  










  return (
    <div className="page-right-column">
      <InfoBar
        currentCategory={currentCategory}
        setMode={setMode}
        setShowRecipeDetail={setShowRecipeDetail}
        setCurrentRecipe={setCurrentRecipe}
        toggleCardDisplay={toggleCardDisplay}
        showRecipeDetail={showRecipeDetail}
        currentGroup={currentGroup}
      />
    
    

    {currentRecipes.length > 0 ?
    <>
      <div className="recipesbygroup-buttons">
        <div className="group">
          <Icon
            src="edit-outline"
            altsrc="edit-outline"
            hoverable={true}
            onClick={()=>{
              setIsBulkEditing(!isBulkEditing);
              setRecipesToEdit(new Set());
            }}
            description="Edit mode"
          />
        </div>

        {isBulkEditing && 
        <>
          <span className="icon-divisor-vertical"></span>
          <div className="group">
            <Icon
              src={isSameSet(new Set(currentRecipes.map(currRec => currRec.id)), recipesToEdit)
                        ? "checkbox-checked" : "checkbox-unchecked"}
              hoverable={true}
              onClick={toggleSelectAll}
              description="Select all"
            />
            <Icon
              src="reset-outline"
              hoverable={true}
              onClick={()=>setRecipesToEdit(new Set())}
              description="Reset"
            />
          </div>
          <span className="icon-divisor-vertical"></span>
          <div className="group">
            <Icon
              src="bin-outline"
              altsrc="bin-fill"
              hoverable={true}
              onClick={()=>handleDeleteRecipes(recipesToEdit)}
              description="Delete"
              showPopUp={true}
              popUpMessage="Delete selected recipes?"
            />
            <Icon
              src="folder"
              hoverable={true}
              description="Move to"
              onClick={()=>setShowCategorySelection(true)}
            />
          </div>
        </>
        }

      </div>


      {/* fixed position components */}
      {showCategorySelection &&
      <CategorySelection
        categories={categories}
        handleMoveSelectedRecipes={handleMoveSelectedRecipes}
        handleClose={()=>setShowCategorySelection(false)}
      />
      }
      <RecipeCards
        recipes={recipes}
        tags={tags}
        currentRecipes={currentRecipes}
        recipeCardDisplay={recipeCardDisplay}
        setRecipes={setRecipes}
        setCurrentRecipe={setCurrentRecipe}
        setShowRecipeDetail={setShowRecipeDetail}
        isBulkEditing={isBulkEditing}
        handleUpdateEditList={handleUpdateEditList}
        recipesToEdit={recipesToEdit}
      />
    </>
    :
    <EmptyDisplay kaomoji={kaomoji} />
    }
    </div>
  );
}