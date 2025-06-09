/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { RecipeInterface, RecipeCardDisplay, TagInterface } from "@/common/type";

import { recipeAPI } from "@/utils/api";
import RecipeCardSimpleDisplay from "./Components/recipeCardSimpleDisplay";
import RecipeCardListDisplay from "./Components/recipeCardListDisplay";
import RecipeCardFullDisplay from "./Components/recipeCardFullDisplay";

interface Props {
  recipe: RecipeInterface,
  recipes: RecipeInterface[],
  tags: TagInterface[],
  recipeCardDisplay: RecipeCardDisplay,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setRecipes: (hookval: RecipeInterface[]) => void,
  isBulkEditing?: boolean,
  key?: number,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,
};




export default function RecipeCard({
  recipe,
  recipes,
  tags,
  recipeCardDisplay,
  setCurrentRecipe,
  setShowRecipeDetail,
  setRecipes,
  isBulkEditing,
  handleUpdateEditList,
  recipesToEdit,
} : Props) {



  const canDelete = isBulkEditing && handleUpdateEditList ? true : false;

  const handlePin = async (val: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newData = {
      "id": recipe.id,
      "content": val === 1 ? 0 : 1,
      "column": "pinned"
    };
    // hook update
    let temp = recipes;
    for (let recipe of temp) {
      if (recipe["id"] === recipe.id) {
        recipe["pinned"] = val === 1 ? 0 : 1;
        break;
      }
    }
    setRecipes([...temp].sort((a,b) => b["pinned"]-a["pinned"]));
    // backend update
    recipeAPI.updateColumn(recipe.id, newData);
  };

  const handleShowRecipeDetail = () => {
    setCurrentRecipe(recipe);
    setShowRecipeDetail(true);
  }
  



  


  const props = {
    canDelete,
    recipe,
    tags,
    handlePin,
    handleShowRecipeDetail,
    handleUpdateEditList,
    recipesToEdit,
  }

  const display = {
    simple: RecipeCardSimpleDisplay,
    list: RecipeCardListDisplay,
    full: RecipeCardFullDisplay,
  };

  const DisplayComponent = display[recipeCardDisplay];





  
  return <DisplayComponent {...props} />;
}