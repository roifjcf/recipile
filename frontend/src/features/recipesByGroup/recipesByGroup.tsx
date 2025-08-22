"use client";
import { CategoryInterface, Modes, RecipeInterface, RecipeCardDisplay, TagInterface, SideBarDisplay, TagSetOperation } from "@/common/type";
import InfoBar from "./components/infoBar";
import RecipeCards from "./components/recipeCards";
import { useState } from "react";
import { recipeAPI } from "@/utils/api";
import EmptyDisplay from "./components/emptyDisplay";

interface Props {
  currentCategory: CategoryInterface | null,
  setMode: (hookval: Modes) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
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
  setMode,
  setShowRecipeDetail,
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






  /** Feature: multiple selection */
  const [recipesToEdit, setRecipesToEdit] = useState<Set<number>>(new Set()); // multiple selection feature
  const [isBulkEditing, setIsBulkEditing] = useState<boolean>(false); // multiple selection feature

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

  const handleDeleteRecipes = async (idSet: Set<number>) => {
    /** Deletes selected recipes */
    if (!recipes) return;
    const newRecipeList = recipes.filter((r)=> !idSet.has(r.id));
    setRecipes(newRecipeList);
    try {
      for (const id of idSet) { recipeAPI.delete(id); }
      setRecipesToEdit(new Set()); // reset hook
    } catch (err) {
      console.log(err);
    }
  }




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


  return (
    <div className="page-right-column">
      <InfoBar
        currentCategory={currentCategory}
        setMode={setMode}
        setShowRecipeDetail={setShowRecipeDetail}
        setCurrentRecipe={setCurrentRecipe}
        isBulkEditing={isBulkEditing}
        handleDeleteRecipes={handleDeleteRecipes}
        recipesToEdit={recipesToEdit}
        setIsBulkEditing={setIsBulkEditing}
        recipeCardDisplay={recipeCardDisplay}
        toggleCardDisplay={toggleCardDisplay}
        showRecipeDetail={showRecipeDetail}
        currentGroup={currentGroup}
      />

      {currentRecipes.length > 0 ?
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
        :
        <EmptyDisplay kaomoji={kaomoji} />
      }
    </div>
  );
}