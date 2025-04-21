/*
  The recipe card component which shows general info of a recipe
*/

'use client';
import { Recipe, Tag } from "@/common/type";
import { findRecordNameByid } from "@/utils/helper";
import { recipeAPI } from "@/utils/api";

interface Props {
  key: number,
  recipe: Recipe,
  recipes: Recipe[],
  tags: Tag[] | null,
  setRecipes: (data:any) => void,
  setCurrentRecipe: (data:any) => void,
  setShowRecipeDetail: (data:any) => void,
};

export default function RecipeCard(props:Props) {

  const handlePin = async (val: number) => {
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
    <div className="recipe-card round-corner">
      <p onClick={handleShowRecipeDetail} className="icon clickable">↕️</p>
      {props.recipe.pinned === 1 && <p onClick={()=>handlePin(props.recipe.pinned)} className="icon clickable">🟡</p>}
      {props.recipe.pinned === 0 && <p onClick={()=>handlePin(props.recipe.pinned)} className="icon clickable">⚪</p>}
      <p>{props.recipe.name}</p>
      <p>⌛ {props.recipe.prep_time + " minute(s)"}</p>
      <p>🥣 {props.recipe.serving}</p>
      <ul>
        {props.recipe.tags.map((tag, index) =>
        <li className="tag-label" key={index}>🏷️ {findRecordNameByid(parseInt(tag), props.tags)}</li>)}
      </ul>
    </div>
  );
}