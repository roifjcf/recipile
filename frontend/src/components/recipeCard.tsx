"use client";

import { Recipe, RecipeField } from "@/common/type";
import { removeEmptyItem } from "@/utils/helper";
import { useState } from "react";

interface Props {
  key: number,
  index: number,
  recipe: Recipe,
  categories: string[],
  currentCategory: string,
  recipes: Recipe[],
  setRecipes: (date:Recipe[]) => void
};

export default function RecipeCard(props:Props) {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(props.recipe);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  
  const handleInputChange = (
    type: RecipeField,
    index: number, value: string
  ) => {
    const modifiedRecipe = structuredClone(currentRecipe);
    switch (type) {
      case "name":
        modifiedRecipe.name = value
        break;
      case "ingredient":
        modifiedRecipe.ingredients[index] = value;
        break;
      case "step":
        modifiedRecipe.steps[index] = value;
        break;
      case "externalLink":
        modifiedRecipe.externalLinks[index] = value;
        break;
      default:
    }
    setCurrentRecipe(modifiedRecipe);
  };

  const handleAddField = (
    type: RecipeField
  ) => {
    const modifiedRecipe = structuredClone(currentRecipe);
    switch (type) {
      case "ingredient":
        modifiedRecipe.ingredients.push("");
        break;
      case "step":
        modifiedRecipe.steps.push("");
        break;
      case "externalLink":
        modifiedRecipe.externalLinks.push("");
        break;
      default:
    }
    setCurrentRecipe(modifiedRecipe);
  };

  const handleRemoveField = (
    type: RecipeField,
    index: number
  ) => {
    const modifiedRecipe = structuredClone(currentRecipe);
    switch (type) {
      case "ingredient":
        modifiedRecipe.ingredients.splice(index,1);
        break;
      case "step":
        modifiedRecipe.steps.splice(index,1);
        break;
      case "externalLink":
        modifiedRecipe.externalLinks.splice(index,1);
        break;
      default:
    }
    setCurrentRecipe(modifiedRecipe);
  };

  const handleRemoveRecipe = (id: number) => {
    let updatedRecipeList = [...props.recipes];
    updatedRecipeList = updatedRecipeList.filter((recipe) => recipe.id !== id);
    props.setRecipes(updatedRecipeList);
    setIsInEditMode(false);
  }

  const handleConfirmUpdate = (id: number) => {
    // remove empty items in the list
    currentRecipe.ingredients = removeEmptyItem(currentRecipe.ingredients);
    currentRecipe.steps = removeEmptyItem(currentRecipe.steps);
    currentRecipe.externalLinks = removeEmptyItem(currentRecipe.externalLinks);

    const updatedRecipeList = [...props.recipes];
    const i = updatedRecipeList.findIndex((recipe) => recipe.id === id);
    updatedRecipeList[i] = currentRecipe;
    props.setRecipes(updatedRecipeList);
    setIsInEditMode(false);
  }

  return (
    <div className="recipe-card">
      {isInEditMode ?
      // edit mode
      <>
        <button onClick={()=>handleConfirmUpdate(props.recipe.id)}>Confirm</button>
        <button onClick={()=>handleRemoveRecipe(props.recipe.id)}>Delete</button>
        <button onClick={()=>{setIsInEditMode(false);setCurrentRecipe(props.recipe)}}>Cancel</button>
        <input
          type="text"
          value={currentRecipe.name}
          onChange={(e) => handleInputChange("name", -1, e.target.value)}
        />

        <h3>Ingredients</h3>
        <button className="icon-btn" onClick={()=>handleAddField("ingredient")}>+</button>
        <ul>
          {currentRecipe.ingredients.map((ingredient, index) =>
          <li key={index}>
            <input 
              type="text"
              value={ingredient}
              onChange={(e) => handleInputChange("ingredient", index, e.target.value)}
            />
            <button className="icon-btn" onClick={()=>handleRemoveField("ingredient", index)}>-</button>
          </li> )}
        </ul>

        <h3>Steps</h3>
        <button className="icon-btn" onClick={()=>handleAddField("step")}>+</button>
        <ul>
          {currentRecipe.steps.map((step, index) =>
          <li key={index}>
            <input 
              type="text"
              value={step}
              onChange={(e) => handleInputChange("step", index, e.target.value)}
            />
            <button className="icon-btn" onClick={()=>handleRemoveField("step", index)}>-</button>
          </li> )}
        </ul>
        
        <h3>Links</h3>
        <button className="icon-btn" onClick={()=>handleAddField("externalLink")}>+</button>
        <ul> 
          {currentRecipe.externalLinks.map((externalLink, index) =>
          <li key={index}>
            <input 
              type="text"
              value={externalLink}
              onChange={(e) => handleInputChange("externalLink", index, e.target.value)}
            />
            <button className="icon-btn" onClick={()=>handleRemoveField("externalLink", index)}>-</button>
          </li> )}
        </ul> 
      </> :
      // view mode
      <>
        <button onClick={()=>{setIsInEditMode(true)}}>Edit</button>
        <p>todo: move to another category</p>
        <h2>{props.recipe.name}</h2>
        <h3>Ingredients</h3>
        <ul>
          {props.recipe.ingredients.map((ingredient, index) =>
          <li key={index}>{ingredient}</li> )}
        </ul>
        <h3>Steps</h3>
        <ul> {props.recipe.steps.map((step, index) => 
          <li key={index}>{step}</li> )} 
        </ul>
        <h3>Links</h3>
        <ul> {props.recipe.externalLinks.map((link, index) => 
          <a key={index} href={link} target="_blank">🔗</a> )} 
        </ul> 
      </>
      }
    </div>
  );
}