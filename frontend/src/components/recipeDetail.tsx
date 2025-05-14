'use client';

import { useEffect, useState } from "react";

import { Recipe, Tag, Ingredient, Category, Tables, Mode } from "@/common/type";

import Icon from "@/components/icon";
import IngredientCard from "@/components/ingredientCard";
import MiniStats from "@/components/miniStats";
import ManageAddItem from "@/components/manageAddItem";
import NoteCard from "@/components/noteCard";
import RecipeImage from "@/components/recipeImage";
import StepCard from "@/components/stepCard";
import Tags from "@/components/tags";

import { recipeAPI, tagAPI, ingredientAPI } from "@/utils/api";
import {
  findRecordidByName, 
  getCurrentDate,
  validateData,
} from "@/utils/helper";


interface Props {
  // tags: Tag[],
  // setTags: (data: Tag[]) => void,
  // ingredients: Ingredient[],
  // setIngredients: (data: Ingredient[]) => void,
  // recipe: Recipe,
  // setCurrentRecipe: (data:Recipe | null) => void,
  // mode: Mode,
  // setMode: (data: Mode) => void
  // currentCategory: Category,
  // recipes: Recipe[],
  // setRecipes: (data: any) => void,
  // setShowRecipeDetail: (data:boolean) => void,
  otherProps: any
};


export default function RecipeDetail({otherProps} : Props) {

  /**
   * General
   */
  const [recipeDetail, setRecipeDetail] = useState<Recipe>({...otherProps.recipe});
  const resetEditState = () => {
    otherProps.setMode("view");
    setRecipeDetail({...otherProps.recipe}); // clear modified info
  };
  const handleClose = () => {
    resetEditState();
    otherProps.setShowRecipeDetail(false);
  };
  const handleKeyPress = (e: KeyboardEvent) => {if (e.key === "Escape") {handleClose()}};
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {window.removeEventListener('keydown', handleKeyPress);};
  }, []);



  /**
   * API calls (with hook updates)
   */
  const handleUpdate = async () => {
    /**
     * Updates the hooks and the (recipe) record in the database
     */
    const [isValid, msg] = validateData("recipes", recipeDetail);
    if (!isValid) {console.log(msg); return;}

    await recipeAPI.update(recipeDetail);
    otherProps.setCurrentRecipe({...recipeDetail});
    setRecipeDetail({...recipeDetail});
    otherProps.setRecipes(otherProps.recipes.map((recipe: Recipe) => recipe.id === recipeDetail.id ? {...recipeDetail} : recipe));
    otherProps.setMode("view");
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
        content["categories"] = [otherProps.currentCategory["id"].toString()];
        delete content["id"];
        await recipeAPI.add(content);
        // update hooks
        const [recipeData] = await Promise.all([recipeAPI.get()]);
        const id = findRecordidByName(content["name"], recipeData);
        if (id !== "") {
          content["id"] = id;
          setRecipeDetail(content);
          otherProps.setRecipes([...otherProps.recipes, content]);
        }
        otherProps.setMode("view");       
        break;
      case 'tags':
        await tagAPI.add(content);
        const [tagData] = await Promise.all([tagAPI.get()]);
        otherProps.setTags(tagData);
        break;
      case 'ingredients':
        await ingredientAPI.add(content);
        const [ingredientData] = await Promise.all([ingredientAPI.get()]);
        otherProps.setIngredients(ingredientData);
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
    let id = findRecordidByName(selectedTag, otherProps.tags).toString();
    if (!updatedTags.includes(id)) { updatedTags.push(id); }
    setRecipeDetail({...recipeDetail, tags:updatedTags});
  };
  const handleAddExistingIngredient = () => {
    if (selectedIngredient === "") return;
    let id = findRecordidByName(selectedIngredient, otherProps.ingredients).toString();
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
  const handleUpdatePreptime = (e: any) => {
    if (isNaN(parseInt(e.target.value))) {return;}
    setRecipeDetail({...recipeDetail, prep_time:parseInt(e.target.value)})
  };
  const handleUpdateServing = (e: any) => {
    if (isNaN(parseInt(e.target.value))) {return;}
    setRecipeDetail({...recipeDetail, serving:parseInt(e.target.value)})
  };
  const handleUpdateIngredientAmount = (e: any, index: number) => {
    let updatedIngredients = [...recipeDetail.ingredients];
    let updatedIngredient = updatedIngredients[index];
    updatedIngredient[1] = e.target.value;
    setRecipeDetail({...recipeDetail, ingredients:updatedIngredients});
  };
  const handleUpdateStep = (e: any, index: number) => {
    let updatedSteps = [...recipeDetail.steps];
    updatedSteps[index] = e.target.value;
    setRecipeDetail({...recipeDetail, steps:updatedSteps})
  };


  return (
    <div className="recipedetail-container round-corner">

      {otherProps.mode === "view" &&
      <>
      
      <div className="recipedetail-container-left">
        <RecipeImage mode="view" />
        <div className="recipedetail-text-info-container-left">
          <h3>{recipeDetail["name"]}</h3>
          <a href={recipeDetail["external_links"]} target="_blank">
            <Icon src={"link-outline"} hoverable={true}/>
          </a>
          <Tags mode={otherProps.mode} recipeTags={recipeDetail["tags"]} tags={otherProps.tags} />
          <MiniStats mode="view" recipeDetail={recipeDetail}/>
        </div>
      </div>
      <div className="recipedetail-container-right">
        
        <div className="recipedetail-button-container">
          <div className="recipedetail-button-container-left">
            <Icon src={"edit-outline"} altsrc={"edit-fill"} hoverable={true} onClick={()=>otherProps.setMode("update")}/>
          </div>
          <div className="recipedetail-button-container-right">
            <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
          </div>
        </div>
        <IngredientCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          ingredients={otherProps.ingredients}
          selectedIngredient={selectedIngredient}
        />
        <StepCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          newStep={newStep}
        />
        <NoteCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          onChange={undefined}
        />
      </div>
      </>}



      {(otherProps.mode === "update" || otherProps.mode === "new") &&
      <>
      
      <div className="recipedetail-container-left">
        {otherProps.mode === "update" &&
        <Icon className="recipedetail-deletebtn" src="bin-outline" altsrc="bin-fill"
        hoverable={true} onClick={()=>{otherProps.handleDeleteRecipe(recipeDetail.id); handleClose();}}/>}
        
        <RecipeImage mode="view" />
        <div className="recipedetail-text-info-container-left">
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
          <Tags mode={otherProps.mode} recipeTags={recipeDetail["tags"]} tags={otherProps.tags} handleRemoveTag={handleRemoveTag} />
          <select className="inline" value={selectedTag} onChange={e=>setSelectedTag(e.target.value)}>
            {otherProps.tags.map((tag: Tag, index: number) =>
            <option key={index} value={tag["name"]}>{tag["name"]}</option>)}
          </select>
          <Icon src={"add-outline"} hoverable={true} onClick={handleAddExistingTag} />
          <ManageAddItem table="tags" handleAdd={handleAddNewRecord} />
          <MiniStats mode={otherProps.mode} recipeDetail={recipeDetail} onChange={[handleUpdatePreptime, handleUpdateServing]}/>
        </div>
      </div>
      
      <div className="recipedetail-container-right">
        <div className="recipedetail-button-container">
          <div className="recipedetail-button-container-left">
            {otherProps.mode === "update" && <Icon src={"undo-outline"} hoverable={true} onClick={resetEditState}/>}
            {otherProps.mode === "update" && <Icon src={"yes-outline"} hoverable={true} onClick={handleUpdate}/>}
            {otherProps.mode === "new" && <Icon src={"yes-outline"} hoverable={true} onClick={()=>handleAddNewRecord("recipes", {...recipeDetail})}/>}
          </div>
          <div className="recipedetail-button-container-right">
            <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
          </div>
        </div>
        <IngredientCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          ingredients={otherProps.ingredients}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleUpdateIngredientAmount={handleUpdateIngredientAmount}
          handleAddExistingIngredient={handleAddExistingIngredient}
          handleAddNewRecord={handleAddNewRecord}
        />
        <StepCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          newStep={newStep}
          handleRemoveStep={handleRemoveStep}
          handleUpdateStep={handleUpdateStep}
          handleReorder={handleReorder}
          setNewStep={setNewStep}
          handleAddStep={handleAddStep}
        />
        <NoteCard
          mode={otherProps.mode}
          recipeDetail={recipeDetail}
          onChange={(e)=>setRecipeDetail({...recipeDetail, notes:e.target.value})}
        />
      </div>

      </>}

      
    </div>
  );
}