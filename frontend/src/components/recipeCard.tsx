/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { RecipeInterface, RecipeCardDisplay, TagInterface } from "@/common/type";

import Icon from "@/components/icon";
import MiniStats from "@/components/miniStats";
import RecipeImage from "@/components/recipeImage";
import Tags from "@/components/tags";

import { recipeAPI } from "@/utils/api";

interface Props {
  key: number,
  recipe: RecipeInterface,
  recipes: RecipeInterface[],
  tags: TagInterface[],
  recipeCardDisplay: RecipeCardDisplay,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setRecipes: (hookval: RecipeInterface[]) => void,
  isBulkEditing?: boolean,
  isChecked?: boolean,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
};






export default function RecipeCard(props : Props) {






  const canDelete = props.isBulkEditing && props.handleUpdateEditList;

  const handlePin = async (val: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newData = {
      "id": props.recipe.id,
      "content": val === 1 ? 0 : 1,
      "column": "pinned"
    };
    // hook update
    let temp = props.recipes;
    for (let recipe of temp) {
      if (recipe["id"] === recipe.id) {
        recipe["pinned"] = val === 1 ? 0 : 1;
        break;
      }
    }
    props.setRecipes([...temp].sort((a,b) => b["pinned"]-a["pinned"]));
    // backend update
    recipeAPI.updateColumn(props.recipe.id, newData);
  };

  const handleShowRecipeDetail = () => {
    props.setCurrentRecipe(props.recipe);
    props.setShowRecipeDetail(true);
  }
  
  return (
    <div className="recipecard-container round-corner" onClick={handleShowRecipeDetail}>
      
      {props.recipeCardDisplay === "full" &&
      <RecipeImage
        mode="view"
        recipe={props.recipe}
      />}

      <div className="recipecard-text-info-container">
        <div className="recipecard-text-info-container-top">
          <div className="left">
            <h3>{props.recipe.name}</h3>
          </div>
          <div className="right">
            {props.recipe.pinned === 1 && <Icon src="star-fill" hoverable={true} onClick={(e)=>handlePin(props.recipe.pinned, e)} />}
            {props.recipe.pinned === 0 && <Icon src="star-outline" hoverable={true} onClick={(e)=>handlePin(props.recipe.pinned, e)} />}
            {canDelete && !props.isChecked && <Icon src="checkbox-unchecked" hoverable={true} onClick={(e)=>{props.handleUpdateEditList!(props.recipe.id, e)}}/>}
            {canDelete && props.isChecked && <Icon src="checkbox-checked" hoverable={true} onClick={(e)=>{props.handleUpdateEditList!(props.recipe.id, e)}}/>}
          </div>
        </div>
        <div className="recipecard-text-info-container-bottom">
          <MiniStats
            mode="view"
            recipeDetail={props.recipe}
            onChange={undefined}
            />
          <Tags
            mode="view"
            recipeTags={props.recipe.tags}
            tags={props.tags}
          />
        </div>
      </div>
    </div>
  );
}