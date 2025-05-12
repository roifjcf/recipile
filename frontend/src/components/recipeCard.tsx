/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { Recipe, Tag, recipeCardDisplay } from "@/common/type";

import Icon from "@/components/icon";
import MiniStats from "@/components/miniStats";
import RecipeImage from "@/components/recipeImage";
import Tags from "@/components/tags";

import { findRecordNameByid } from "@/utils/helper";
import { recipeAPI } from "@/utils/api";


interface Props {
  key: number,
  recipe: Recipe,
  recipes: Recipe[],
  tags: Tag[],
  recipeCardDisplay: recipeCardDisplay,
  setRecipes: (data:any) => void,
  setCurrentRecipe: (data:any) => void,
  setShowRecipeDetail: (data:any) => void,
};

export default function RecipeCard(props:Props) {

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
      if (recipe["id"] === props.recipe.id) {
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
      {props.recipeCardDisplay === "full" && <RecipeImage mode="view"/>}
      <div className="recipecard-text-info-container">
        <div className="recipecard-text-info-container-top">
          <div className="left">
            <h3>{props.recipe.name}</h3>
          </div>
          <div className="right">
            {props.recipe.pinned === 1 &&
            <Icon
              src="star-fill"
              hoverable={true}
              onClick={(e)=>handlePin(props.recipe.pinned, e)}
            />}
            {props.recipe.pinned === 0 &&
            <Icon
              src="star-outline"
              hoverable={true}
              onClick={(e)=>handlePin(props.recipe.pinned, e)}
            />}
            <Icon src="more-vertical-outline" hoverable={true}/>
          </div>
        </div>
        <div className="recipecard-text-info-container-bottom">
          <MiniStats
            mode="view"
            recipeDetail={props.recipe}
            onChange={undefined}
            />
          <Tags mode="view" recipeTags={props.recipe.tags} tags={props.tags} />
        </div>
      </div>
    </div>
  );
}