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
  tags: Tag[],
  setTags: (data: Tag[]) => void,
  ingredients: Ingredient[],
  setIngredients: (data: Ingredient[]) => void,
  recipe: Recipe,
  setCurrentRecipe: (data:Recipe | null) => void,
  mode: Mode,
  setMode: (data: Mode) => void
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
   * API calls (with hook updates)
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


      {props.mode === "view" &&
      <>
      
      <div className="recipedetail-container-left">
        <RecipeImage mode="view" />
        <div className="recipedetail-text-info-container-left">
          <h3>{recipeDetail["name"]}</h3>
          <a href={recipeDetail["external_links"]} target="_blank">
            <Icon src={"link-outline"} hoverable={true} changeSrc={false}/>
          </a>
          <Tags mode={props.mode} recipeTags={recipeDetail["tags"]} tags={props.tags} />
          <MiniStats mode="view" recipeDetail={recipeDetail}/>
        </div>
      </div>
      <div className="recipedetail-container-right">
        
        <div className="recipedetail-button-container">
          <div className="recipedetail-button-container-left">
            <Icon src={"edit-outline"} altsrc={"edit-fill"} hoverable={true} changeSrc={true} onClick={()=>props.setMode("update")}/>
          </div>
          <div className="recipedetail-button-container-right">
            <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} changeSrc={true} onClick={handleClose}/>
          </div>
        </div>
        <IngredientCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          ingredients={props.ingredients}
          selectedIngredient={selectedIngredient}
        />
        <StepCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          newStep={newStep}
        />
        <NoteCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          onChange={undefined}
        />
      </div>
      </>}



      {(props.mode === "update" || props.mode === "new") &&
      <>
      
      <div className="recipedetail-container-left">
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
          <Tags mode={props.mode} recipeTags={recipeDetail["tags"]} tags={props.tags} handleRemoveTag={handleRemoveTag} />
          <select className="inline" value={selectedTag} onChange={e=>setSelectedTag(e.target.value)}>
            {props.tags.map((tag, index) =>
            <option key={index} value={tag["name"]}>{tag["name"]}</option>)}
          </select>
          <Icon
            src={"add-outline"}
            altsrc={undefined}
            hoverable={true}
            changeSrc={false}
            onClick={handleAddExistingTag}
          />
          <ManageAddItem table="tags" handleAdd={handleAddNewRecord} />
          <MiniStats mode={props.mode} recipeDetail={recipeDetail} onChange={[handleUpdatePreptime, handleUpdateServing]}/>
        </div>
      </div>
      
      <div className="recipedetail-container-right">
        <div className="recipedetail-button-container">
          <div className="recipedetail-button-container-left">
            {props.mode === "update" && <Icon src={"undo-outline"} hoverable={true} changeSrc={false} onClick={resetEditState}/>}
            {props.mode === "update" && <Icon src={"yes-outline"} hoverable={true} changeSrc={false} onClick={handleUpdate}/>}
            {props.mode === "new" && <Icon src={"yes-outline"} hoverable={true} changeSrc={false} onClick={()=>handleAddNewRecord("recipes", {...recipeDetail})}/>}
          </div>
          <div className="recipedetail-button-container-right">
            <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} changeSrc={true} onClick={handleClose}/>
          </div>
        </div>
        <IngredientCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          ingredients={props.ingredients}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleUpdateIngredientAmount={handleUpdateIngredientAmount}
          handleAddExistingIngredient={handleAddExistingIngredient}
          handleAddNewRecord={handleAddNewRecord}
        />
        <StepCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          newStep={newStep}
          handleRemoveStep={handleRemoveStep}
          handleUpdateStep={handleUpdateStep}
          handleReorder={handleReorder}
          setNewStep={setNewStep}
          handleAddStep={handleAddStep}
        />
        <NoteCard
          mode={props.mode}
          recipeDetail={recipeDetail}
          onChange={(e)=>setRecipeDetail({...recipeDetail, notes:e.target.value})}
        />
      </div>

      </>}

      
    </div>
  );
}