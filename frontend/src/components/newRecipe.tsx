'use client';

import { newRecipe, RecipeField } from "@/common/type";
import { removeEmptyItem } from "@/utils/helper";
import { useState } from "react";

interface Props {
  setIsNewRecipeOpen: (data: boolean) => void,
  setShowPushNotification: (data: boolean) => void,
  setPushNotificationMessage: (data: string) => void,
  handleShowPushNotification: () => void,
  currentCategory: string,
};


export default function NewRecipe (props: Props) {

  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [externalLinks, setExternalLinks] = useState<string[]>(['']);


  const handleAdd = ( type: RecipeField ) => {
    switch (type) {
      case "ingredient":
        setIngredients(ingredients => [...ingredients, '']);
        break;
      case "step":
        setSteps(steps => [...steps, '']);
        break;
      case "externalLink":
        setExternalLinks(externalLinks => [...externalLinks, '']);
        break;
      default:
        break;
    }
  };
  const handleRemove = ( type: RecipeField, index: number ) => {
    let newList;
    switch (type) {
      case "ingredient":
        newList = [...ingredients];
        newList.splice(index, 1);
        setIngredients(newList);
        break;
      case "step":
        newList = [...steps];
        newList.splice(index, 1);
        setSteps(newList);
        break;
      case "externalLink":
        newList = [...externalLinks];
        newList.splice(index, 1);
        setExternalLinks(newList);
        break;
      default:
        break;
    }
  };
  const handleUpdate = ( type: RecipeField, index: number, value: string ) => {
    let newList;
    switch (type) {
      case "ingredient":
        newList = [...ingredients];
        newList[index] = value;
        setIngredients(newList);
        break;
      case "step":
        newList = [...steps];
        newList[index] = value;
        setSteps(newList);
        break;
      case "externalLink":
        newList = [...externalLinks];
        newList[index] = value;
        setExternalLinks(newList);
        break;
      default:
        break;
    }
  };




  const handleClearAllInput = () => {
    setName('');
    setIngredients(['']);
    setSteps(['']);
    setExternalLinks(['']);
  }


  
  const handleAddNewRecipe = () => {

    // name should not be empty
    if (name === '') {
      props.setPushNotificationMessage('Recipe name should not be empty!');
      props.handleShowPushNotification();
      return;
    }
    

    const recipe: newRecipe = {
      name: '',
      category: props.currentCategory,
      ingredients: [],
      steps: [],
      externalLinks: []
    };

    recipe.name = name;
    recipe.ingredients = removeEmptyItem(ingredients);
    recipe.steps = removeEmptyItem(steps);
    recipe.externalLinks = removeEmptyItem(externalLinks);

    // success
    props.setPushNotificationMessage('Successfully added a new recipe!');
    props.handleShowPushNotification();
    console.log(recipe);
    handleClearAllInput();

    // TODO: add the new recipe to the database
    // then retrieve its ID and re-render the `recipes` list
  }
  
  return (
    <div id="new-recipe-dialog">
      <button className="text-btn" onClick={() => props.setIsNewRecipeOpen(false)}>Close</button>

      <p>Name</p>
      <input className="text-input"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <p>Ingredients</p>
      <button className="icon-btn" onClick={() => handleAdd("ingredient")}>+</button>
      {ingredients.map((ingredient, index) =>
      <div key={index} >
        <input className="text-input" 
          type="text" 
          value={ingredient}
          onChange={e => handleUpdate("ingredient", index, e.target.value)}
        />
        <button className="text-btn" onClick={() => handleRemove("ingredient", index)}>-</button>
      </div>)}

      <p>Steps</p>
      <button className="icon-btn" onClick={() => handleAdd("step")}>+</button>
      {steps.map((step, index) =>
      <div key={index} >
        <input className="text-input" 
          type="text" 
          value={step}
          onChange={e => handleUpdate("step", index, e.target.value)}
        />
        <button className="text-btn" onClick={() => handleRemove("step", index)}>-</button>
      </div>)}

      <p>URL</p>
      <button className="icon-btn" onClick={() => handleAdd("externalLink")}>+</button>
      {externalLinks.map((externalLink, index) =>
      <div key={index} >
        <input className="text-input" 
          type="text" 
          value={externalLink}
          onChange={e => handleUpdate("externalLink", index, e.target.value)}
        />
        <button className="text-btn" onClick={() => handleRemove("externalLink", index)}>-</button>
      </div>)}


      <button className="text-btn" onClick={handleClearAllInput}>Clear all</button>
      <button className="text-btn" onClick={handleAddNewRecipe}>Add new recipe!</button>
    </div>
  );
}