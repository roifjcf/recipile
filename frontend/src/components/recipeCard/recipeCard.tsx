/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { RecipeInterface, RecipeCardDisplay, TagInterface } from "@/common/type";

import { recipeAPI } from "@/utils/api";
import RecipeCardSimpleDisplay from "./Components/recipeCardSimpleDisplay";
import RecipeCardListDisplay from "./Components/recipeCardListDisplay";
import RecipeCardFullDisplay from "./Components/recipeCardFullDisplay";
import { convertImgUrl } from "@/utils/helper";

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

  const isEditing = isBulkEditing && handleUpdateEditList ? true : false;

  const handlePin = async (val: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newData = {
      "id": recipe.id,
      "content": val === 1 ? 0 : 1, // toggles pin state
      "column": "pinned"
    };
    // backend update
    await recipeAPI.updateColumn(recipe.id, newData);
    // hook update
    const updatedData = await recipeAPI.get();
    updatedData.forEach((recipe: RecipeInterface) => {
      return recipe["img_main"] = convertImgUrl(recipe["img_main"]);
    });
    setRecipes([...updatedData].sort((a,b) => b["pinned"]-a["pinned"]));
  };

  const handleShowRecipeDetail = () => {
    setCurrentRecipe(recipe);
    setShowRecipeDetail(true);
  }
  



  


  const props = {
    isEditing: isEditing,
    isSelected: recipesToEdit.has(recipe.id),
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