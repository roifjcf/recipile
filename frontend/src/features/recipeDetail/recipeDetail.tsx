'use client';

import { useEffect, useState } from "react";

import { RecipeInterface, TagInterface, IngredientInterface, CategoryInterface, Tables, Mode } from "@/common/type";

import Icon from "@/components/icon";
import MiniStats from "@/components/miniStats";
import RecipeImage from "@/components/recipeImage";
import Tags from "@/components/tags";

import IngredientCard from "@/features/recipeDetail/components/ingredientCard";
import NoteCard from "@/features/recipeDetail/components/noteCard";
import StepCard from "@/features/recipeDetail/components/stepCard";

import { recipeAPI, tagAPI, ingredientAPI } from "@/utils/api";
import {
  findRecordidByName, 
  getCurrentDate,
  validateData,
} from "@/utils/helper";
import Name from "./components/name";
import Link from "./components/link";
import ButtonGroup from "./components/buttonGroup";


interface Props {
  tags: TagInterface[],
  setTags: (data: TagInterface[]) => void,
  ingredients: IngredientInterface[],
  setIngredients: (data: IngredientInterface[]) => void,
  recipe: RecipeInterface,
  setCurrentRecipe: (data:RecipeInterface | null) => void,
  mode: Mode,
  setMode: (data: Mode) => void
  currentCategory: CategoryInterface,
  recipes: RecipeInterface[],
  setRecipes: (data: any) => void,
  setShowRecipeDetail: (data:boolean) => void,
  handleDeleteRecipe: (id:number) => void,
};

export default function RecipeDetail({
  tags,
  setTags,
  ingredients,
  setIngredients,
  recipe,
  setCurrentRecipe,
  mode,
  setMode,
  currentCategory,
  recipes,
  setRecipes,
  setShowRecipeDetail,
  handleDeleteRecipe
}: Props) {

  /**
   * General
   */
  const [recipeDetail, setRecipeDetail] = useState<RecipeInterface>({...recipe});

  const resetEditState = () => {
    setMode("view");
    setRecipeDetail({...recipe}); // clear modified info
  };

  const handleClose = () => {
    resetEditState();
    setShowRecipeDetail(false);
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
    setCurrentRecipe({...recipeDetail});
    setRecipeDetail({...recipeDetail});
    setRecipes(recipes.map((recipe: RecipeInterface) => recipe.id === recipeDetail.id ? {...recipeDetail} : recipe));
    setMode("view");
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
        content["categories"] = [currentCategory["id"].toString()];
        delete content["id"];
        await recipeAPI.add(content);
        // update hooks
        const [recipeData] = await Promise.all([recipeAPI.get()]);
        const id = findRecordidByName(content["name"], recipeData);
        if (id !== "") {
          content["id"] = id;
          setRecipeDetail(content);
          setRecipes([...recipes, content]);
        }
        setMode("view");       
        break;
      case 'tags':
        await tagAPI.add(content);
        const [tagData] = await Promise.all([tagAPI.get()]);
        setTags(tagData);
        break;
      case 'ingredients':
        await ingredientAPI.add(content);
        const [ingredientData] = await Promise.all([ingredientAPI.get()]);
        setIngredients(ingredientData);
      default:
        break;
    }
  }



  /**
   * Hook updates
   */
  const [selectedIngredient, setSelectedIngredient] = useState<string>(""); // ingredient name
  const [newStep, setNewStep] = useState<string>("");
  
  const handleRemoveTag = (tagid: string) => {
    /** Removes a tag from the recipe */
    setRecipeDetail({...recipeDetail, tags:recipeDetail.tags.filter(t => t !== tagid)});
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


  const handleAddExistingIngredient = () => {
    if (selectedIngredient === "") return;
    let id = findRecordidByName(selectedIngredient, ingredients).toString();
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

      {/* left column */}
      <div className="recipedetail-container-left">
        

        {/* image content */}
        <RecipeImage mode={mode}/>

        {/* text content */}
        <div className="recipedetail-text-info-container-left">
          <Name name={recipeDetail["name"]} mode={mode} recipeDetail={recipeDetail} setRecipeDetail={setRecipeDetail} />
          <Link mode={mode} url={recipeDetail["external_links"]} recipeDetail={recipeDetail} setRecipeDetail={setRecipeDetail} />
          <Tags
            mode={mode}
            recipeTags={recipeDetail["tags"]}
            tags={tags}
            handleRemoveTag={handleRemoveTag}
            recipeDetail={recipeDetail}
            setRecipeDetail={setRecipeDetail}
            handleAddNewRecord={handleAddNewRecord}
          />
          <MiniStats mode={mode} recipeDetail={recipeDetail} onChange={[handleUpdatePreptime, handleUpdateServing]} />
        </div>

        {/* delete button under edit(update) mode */}
        {mode === "update" &&
          <div className="recipedetail-deletebtn">
            <Icon src="bin-outline" altsrc="bin-fill"
            hoverable={true} onClick={()=>{handleDeleteRecipe(recipeDetail.id); handleClose();}}/>
          </div>
        }
      </div>
      





      {/* right column */}
      <div className="recipedetail-container-right">
        <ButtonGroup
          mode={mode}
          setMode={setMode}
          handleClose={handleClose}
          recipeDetail={recipeDetail}
          resetEditState={resetEditState}
          handleUpdate={handleUpdate}
          handleAddNewRecord={handleAddNewRecord}
        />

        <IngredientCard
          mode={mode}
          recipeDetail={recipeDetail}
          ingredients={ingredients}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleUpdateIngredientAmount={handleUpdateIngredientAmount}
          handleAddExistingIngredient={handleAddExistingIngredient}
          handleAddNewRecord={handleAddNewRecord}
        />

        <StepCard
          mode={mode}
          recipeDetail={recipeDetail}
          newStep={newStep}
          handleRemoveStep={handleRemoveStep}
          handleUpdateStep={handleUpdateStep}
          handleReorder={handleReorder}
          setNewStep={setNewStep}
          handleAddStep={handleAddStep}
        />

        <NoteCard
          mode={mode}
          recipeDetail={recipeDetail}
          setRecipeDetail={setRecipeDetail}
        />
        
      </div>

    </div>
  );
}