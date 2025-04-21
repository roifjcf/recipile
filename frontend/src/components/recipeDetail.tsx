'use client';

import { useEffect, useState } from "react";

import { Recipe, Tag, Ingredient, Category, RecipeAPIAddParam, Tables } from "@/common/type";
import ManageAddItem from "@/components/manageAddItem";
import { recipeAPI, tagAPI, ingredientAPI } from "@/utils/api";
import {
  findRecordNameByid,
  findRecordidByName, 
  findIngredientUnitByid,
  getCurrentDate,
  validateData,
} from "@/utils/helper";


interface Props {
  tags: Tag[],
  setTags: (data: Tag[]) => void,
  ingredients: Ingredient[],
  setIngredients: (data: Ingredient[]) => void,
  recipe: Recipe,
  setCurrentRecipe: (data:Recipe | null) => void,
  mode: "view" | "update" | "new",
  setMode: (data: "view" | "update" | "new") => void
  currentCategory: Category,
  recipes: Recipe[],
  setRecipes: (data: any) => void,
  setShowRecipeDetail: (data:boolean) => void,
};


export default function RecipeDetail(props:Props) {

  /**
   * General
   */
  const [recipeDetail, setRecipeDetail] = useState<Recipe>({...props.recipe});
  const resetEditState = () => {
    props.setMode("view");
    setRecipeDetail({...props.recipe}); // clear modified info
  };
  const handleClose = () => {
    resetEditState();
    props.setShowRecipeDetail(false);
  };
  const handleKeyPress = (e: KeyboardEvent) => {if (e.key === "Escape") {handleClose()}};
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {window.removeEventListener('keydown', handleKeyPress);};
  }, []);



  /**
   * API calls (with hoop updates)
   */
  const handleUpdate = async () => {
    /**
     * Updates the hooks and the (recipe) record in the database
     */
    const [isValid, msg] = validateData("recipes", recipeDetail);
    if (!isValid) {console.log(msg); return;}

    await recipeAPI.update(recipeDetail);
    props.setCurrentRecipe({...recipeDetail});
    setRecipeDetail({...recipeDetail});
    props.setRecipes(props.recipes.map(recipe => recipe.id === recipeDetail.id ? {...recipeDetail} : recipe));
    props.setMode("view");
  };

  const handleAddNewRecord = async (table: Tables, content: any) => {
    /**
     * Adds a new ingredient / tag to the database
     */
    const [isValid, msg] = validateData(table, recipeDetail);
    if (!isValid) {console.log(msg); return;}
    switch (table) {
      case 'recipes':
        content["created"] = getCurrentDate();
        content["categories"] = [props.currentCategory["id"].toString()];
        delete content["id"];
        await recipeAPI.add(content);
        // update hooks
        const [recipeData] = await Promise.all([recipeAPI.get()]);
        const id = findRecordidByName(content["name"], recipeData);
        if (id !== "") {
          content["id"] = id;
          setRecipeDetail(content);
          props.setRecipes([...props.recipes, content]);
        }
        props.setMode("view");       
        break;
      case 'tags':
        await tagAPI.add(content);
        const [tagData] = await Promise.all([tagAPI.get()]);
        props.setTags(tagData);
        break;
      case 'ingredients':
        await ingredientAPI.add(content);
        const [ingredientData] = await Promise.all([ingredientAPI.get()]);
        props.setIngredients(ingredientData);
      default:
        break;
    }
  }



  /**
   * Hook updates
   */
  const [selectedTag, setSelectedTag] = useState<string>(""); // tag name
  const [selectedIngredient, setSelectedIngredient] = useState<string>(""); // ingredient name
  const [newStep, setNewStep] = useState<string>("");
  
  const handleRemoveTag = (tag: string) => {
    setRecipeDetail({...recipeDetail, tags:recipeDetail.tags.filter(t => t !== tag)});
  };
  const handleRemoveIngredient = (id: string) => {
    setRecipeDetail({...recipeDetail, ingredients: recipeDetail.ingredients.filter((ingr)=>ingr[0]!==id)});
  };
  const handleRemoveStep = (index: number) => {
    setRecipeDetail({...recipeDetail, steps:recipeDetail["steps"].filter((step, i)=>i!==index)});
  }

  const handleAddStep = () => {
    let updatedSteps = [...recipeDetail["steps"]];
    updatedSteps.push(newStep);
    setRecipeDetail({...recipeDetail, steps: updatedSteps});
    setNewStep("");
  };
  const handleAddExistingTag = () => {
    if (selectedTag === "") return;
    let updatedTags = [...recipeDetail.tags];
    let id = findRecordidByName(selectedTag, props.tags).toString();
    if (!updatedTags.includes(id)) { updatedTags.push(id); }
    setRecipeDetail({...recipeDetail, tags:updatedTags});
  };
  const handleAddExistingIngredient = () => {
    if (selectedIngredient === "") return;
    let id = findRecordidByName(selectedIngredient, props.ingredients).toString();
    if (recipeDetail.ingredients.filter((ingr)=>ingr[0]===id).length > 0) return; // ignore existing ingredients
    let updatedIngredients = recipeDetail.ingredients.filter((ingr)=>ingr[0]!==id);
    updatedIngredients.push([`${id}`, '0']);
    setRecipeDetail({...recipeDetail, ingredients: updatedIngredients});
  };
  const handleReorder = (option: "up" | "down", index: number) => {
    let updatedSteps = [...recipeDetail.steps];
    let temp;
    if (option === "up") {
      if (index < 1) {return;}
      temp = updatedSteps[index-1];
      updatedSteps[index-1] = updatedSteps[index];
      updatedSteps[index] = temp;
    } else if (option === "down") {
      if (index >= updatedSteps.length - 1) {return;}
      temp = updatedSteps[index+1];
      updatedSteps[index+1] = updatedSteps[index];
      updatedSteps[index] = temp;
    }
    setRecipeDetail({...recipeDetail, steps: updatedSteps});
  }
  





  return (
    <div className="recipe-detail-container round-corner">


      {props.mode === "view" &&
      <>
      <span className="icon clickable" onClick={handleClose}>❌</span>
      <span className="icon clickable" onClick={()=>props.setMode("update")}>✏️</span>
      <p>{recipeDetail["name"]}</p>
      <a href={recipeDetail["external_links"]} target="_blank">🔗</a>
      <ul>
        {recipeDetail["tags"].map((tag, index)=>
        <li className="tag-label" key={index}>🏷️{findRecordNameByid(parseInt(tag), props.tags)}</li>)}
      </ul>
      <p>⌛ {recipeDetail["prep_time"]}</p>
      <p>🥣 {recipeDetail["serving"]}</p>
      <br />
      <p>Ingredients</p>
      <ul>
        {recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          {findRecordNameByid(parseInt(ingr[0]), props.ingredients)} &nbsp;
          {ingr[1]} &nbsp;
          {findIngredientUnitByid(parseInt(ingr[0]), props.ingredients)}
        </li>)}
      </ul>
      <br />
      <p>Steps</p>
      <ul>
        {recipeDetail["steps"].map((s, index) => <li key={index}>{s}</li>)}
      </ul>
      <br />
      <p>Notes</p>
      <p>{recipeDetail["notes"]}</p>
      </>}



      {(props.mode === "update" || props.mode === "new") &&
      <>
      <span className="icon clickable" onClick={handleClose}>❌</span>
      {props.mode === "update" && <span className="icon clickable" onClick={resetEditState}>🗑️</span>}
      {props.mode === "update" && <span className="icon clickable" onClick={handleUpdate}>✅</span>}
      {props.mode === "new" && <span className="icon clickable" onClick={()=>handleAddNewRecord("recipes", {...recipeDetail})}>✅</span>}
      <input
        type="text"
        value={recipeDetail["name"]}
        onChange={(e)=>setRecipeDetail({...recipeDetail, name: e.target.value})}
        placeholder="Recipe name"
      />
      <input
        type="text"
        value={recipeDetail["external_links"]}
        onChange={(e)=>setRecipeDetail({...recipeDetail, external_links: e.target.value})}
        placeholder="External link"
      />
      <ul>
        {recipeDetail["tags"].map((tag, index)=>
        <li className="tag-label" key={index}>
          🏷️{findRecordNameByid(parseInt(tag), props.tags)}
          <span className="icon clickable" onClick={()=>{handleRemoveTag(tag)}}>❌</span>
        </li>)}
      </ul>
      <select value={selectedTag} onChange={e=>setSelectedTag(e.target.value)}>
        {props.tags.map((tag, index) =>
        <option key={index} value={tag["name"]}>{tag["name"]}</option>)}
      </select>
      <span className="icon clickable" onClick={handleAddExistingTag}>➕</span>
      <ManageAddItem table="tags" handleAdd={handleAddNewRecord} />
      <p>⌛
        <input
          className="input-inline-small"
          type="number"
          onChange={(e)=>{ if (isNaN(parseInt(e.target.value))) {return;}
          setRecipeDetail({...recipeDetail, prep_time:parseInt(e.target.value)})
        }}
          placeholder="Prepatation time (minutes)"
          value={recipeDetail["prep_time"]}
          min={0}
        />
      </p>
      <p>🥣
        <input
          className="input-inline-small"
          type="number"
          onChange={(e)=>{ if (isNaN(parseInt(e.target.value))) {return;}
          setRecipeDetail({...recipeDetail, serving:parseInt(e.target.value)})}}
          placeholder="Serving size"
          value={recipeDetail["serving"]}
          min={1}
        />
      </p>
      <p>Ingredient</p>
      <ul>
        {recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          <span className="icon clickable" onClick={()=>{handleRemoveIngredient(ingr[0])}}>🗑️</span>
          {findRecordNameByid(parseInt(ingr[0]), props.ingredients)} &nbsp;
          <input 
          className="input-inline-small"
          type="text"
          placeholder="Amount of the ingredient"
          onChange={(e) => {
            let updatedIngredients = [...recipeDetail.ingredients];
            let updatedIngredient = updatedIngredients[index];
            updatedIngredient[1] = e.target.value;
            setRecipeDetail({...recipeDetail, ingredients:updatedIngredients})
          }}
          value={ingr[1]} />&nbsp;
        {findIngredientUnitByid(parseInt(ingr[0]), props.ingredients)}
        </li>)}
      </ul>
      <select value={selectedIngredient} onChange={e=>setSelectedIngredient(e.target.value)}>
        {props.ingredients.map((ingr, index) =>
        <option key={index} value={ingr["name"]}>{ingr["name"]}</option>)}
      </select>
      <span className="icon clickable" onClick={handleAddExistingIngredient}>➕</span>
      <ManageAddItem table="ingredients" handleAdd={handleAddNewRecord} />

      <p>Steps</p>
      <ul>
        {recipeDetail["steps"].map((step, index) =>
        <li key={index}>
          <span className="icon clickable" onClick={()=>{handleRemoveStep(index)}}>🗑️</span>
          <input
            className="input-inline-mid"
            key={index}
            type="text"
            placeholder="Step"
            value={step}
            onChange={(e)=>{
              let updatedSteps = [...recipeDetail.steps];
              updatedSteps[index] = e.target.value;
              setRecipeDetail({...recipeDetail, steps:updatedSteps})
          }}/>
          <span className="icon clickable" onClick={()=>handleReorder("up", index)}>🔼</span>
          <span className="icon clickable" onClick={()=>handleReorder("down", index)}>🔽</span>
        </li>
        )}
        <li>
          <input
            className="input-inline-mid"
            type="text"
            placeholder="New step..."
            value={newStep}
            onChange={(e)=>setNewStep(e.target.value)}
          />
          <span className="icon clickable" onClick={handleAddStep}>➕</span>
        </li>
      </ul>
      <p>Notes</p>
      <textarea
        placeholder="Notes"
        onChange={(e)=>setRecipeDetail({...recipeDetail, notes:e.target.value})}
        value={recipeDetail["notes"]}>
      </textarea>
      </>}

      
    </div>
  );
}