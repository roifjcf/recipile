/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { Recipe } from "@/common/type";

import Icon from "@/components/icon";
import MiniStats from "@/components/miniStats";
import RecipeImage from "@/components/recipeImage";
import Tags from "@/components/tags";

import { recipeAPI } from "@/utils/api";

interface Props {
  key: number,
  recipe: Recipe,
  otherProps: any
};

export default function RecipeCard({ recipe, otherProps }: Props) {

  const handlePin = async (val: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newData = {
      "id": recipe.id,
      "content": val === 1 ? 0 : 1,
      "column": "pinned"
    };
    // hook update
    let temp = otherProps.recipes;
    for (let recipe of temp) {
      if (recipe["id"] === recipe.id) {
        recipe["pinned"] = val === 1 ? 0 : 1;
        break;
      }
    }
    otherProps.setRecipes([...temp].sort((a,b) => b["pinned"]-a["pinned"]));
    // backend update
    recipeAPI.updateColumn(recipe.id, newData);
  };

  const handleShowRecipeDetail = () => {
    otherProps.setCurrentRecipe(recipe);
    otherProps.setShowRecipeDetail(true);
  }
  
  return (
    <div className="recipecard-container round-corner" onClick={handleShowRecipeDetail}>
      {otherProps.recipeCardDisplay === "full" && <RecipeImage mode="view"/>}
      <div className="recipecard-text-info-container">
        <div className="recipecard-text-info-container-top">
          <div className="left">
            <h3>{recipe.name}</h3>
          </div>
          <div className="right">
            {recipe.pinned === 1 && <Icon src="star-fill" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
            {recipe.pinned === 0 && <Icon src="star-outline" hoverable={true} onClick={(e)=>handlePin(recipe.pinned, e)} />}
            {otherProps.isBulkEditing && !otherProps.isChecked(recipe.id) && <Icon src="checkbox-unchecked" hoverable={true} onClick={(e)=>{otherProps.handleUpdateEditList(recipe.id, e)}}/>}
            {otherProps.isBulkEditing && otherProps.isChecked(recipe.id) && <Icon src="checkbox-checked" hoverable={true} onClick={(e)=>{otherProps.handleUpdateEditList(recipe.id, e)}}/>}
          </div>
        </div>
        <div className="recipecard-text-info-container-bottom">
          <MiniStats
            mode="view"
            recipeDetail={recipe}
            onChange={undefined}
            />
          <Tags mode="view" recipeTags={recipe.tags} tags={otherProps.tags} />
        </div>
      </div>
    </div>
  );
}