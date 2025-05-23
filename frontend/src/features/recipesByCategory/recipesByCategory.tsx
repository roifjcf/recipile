"use client";
import { Category, Mode, Recipe, recipeCardDisplay, Tag } from "@/common/type";
import InfoBar from "./components/infoBar";
import RecipeCards from "./components/recipeCards";
import { useState } from "react";
import { recipeAPI } from "@/utils/api";

interface Props {
  currentCategory: Category | null,
  setMode: (hookval: Mode) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: Recipe) => void,
  recipeCardDisplay: recipeCardDisplay,
  toggleCardDisplay: () => void,
  recipes: Recipe[],
  tags: Tag[],
  kaomoji: string,
  setRecipes: (hookval: Recipe[]) => void,
  showRecipeDetail: boolean,
};

export default function RecipesByCategory({
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
}: Props) {






  /** Feature: multiple selection */
  const [recipesToEdit, setRecipesToEdit] = useState<Set<number>>(new Set()); // multiple selection feature
  const [isBulkEditing, setIsBulkEditing] = useState<boolean>(false); // multiple selection feature

  const handleUpdateEditList = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(recipesToEdit);
    if (!newSet.has(id)) {newSet.add(id);}
    else {newSet.delete(id);}
    setRecipesToEdit(newSet);
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
      />
      <RecipeCards
        recipes={recipes}
        tags={tags}
        currentRecipes={currentCategory ? recipes.filter(recipe => recipe["categories"].includes(currentCategory["id"].toString())) : []}
        kaomoji={kaomoji}
        recipeCardDisplay={recipeCardDisplay}
        setRecipes={setRecipes}
        setCurrentRecipe={setCurrentRecipe}
        setShowRecipeDetail={setShowRecipeDetail}
        isBulkEditing={isBulkEditing}
        isChecked={(id: number) => recipesToEdit.has(id)}
        handleUpdateEditList={handleUpdateEditList}
        recipesToEdit={recipesToEdit}
      />
    </div>
  );
}