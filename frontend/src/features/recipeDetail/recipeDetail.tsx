'use client';

import { useContext, useEffect, useRef, useState } from "react";

import { RecipeInterface, TagInterface, IngredientInterface, CategoryInterface, Tables, Modes } from "@/common/type";

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
import PushNotificationContext from "@/contexts/pushNotificationContext";
import { useClickOutside } from "@/hooks/useClickOutside";






interface Props {
  tags: TagInterface[],
  setTags: (data: TagInterface[]) => void,
  ingredients: IngredientInterface[],
  setIngredients: (data: IngredientInterface[]) => void,
  recipe: RecipeInterface,
  setCurrentRecipe: (data:RecipeInterface | null) => void,
  mode: Modes,
  setMode: (data: Modes) => void
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
  const context = useContext(PushNotificationContext);
  const ref = useRef<HTMLDivElement>(null);


  const resetEditState = () => {
    setMode("view");
    setRecipeDetail({...recipe}); // clear modified info
  };

  const handleClose = () => {
    resetEditState();
    setShowRecipeDetail(false);
  };

  const handleKeyPress = (e: KeyboardEvent) => {if (e.key === "Escape") {handleClose()}};
  useClickOutside(ref, handleClose);
  
  
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
    const [isValid, message] = await validateData("recipes", recipeDetail);
    if (typeof message === "string") {
      if (isValid) {
        context?.addNotificationMessage?.(message, "Success");
      } else {
        context?.addNotificationMessage?.(message, "Error");
      }
    }
    if (!isValid) { return; }

    await recipeAPI.update(recipeDetail);
    setCurrentRecipe({...recipeDetail});
    setRecipeDetail({...recipeDetail});
    setRecipes(recipes.map((recipe: RecipeInterface) => recipe.id === recipeDetail.id ? {...recipeDetail} : recipe));
    setMode("view");
  };


  const handleAddNewRecord = async (table: Tables, content: any) => {
    /**
     * Adds a new recipe / ingredient / tag to the database
     */
    const [isValid, msg] = await validateData(table, content);
    
    if (!isValid) {
      return [false, msg];
    }

    if (table === "recipes") {
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

    } else if (table === "tags") {
      // update the database
      await tagAPI.add(content);
      const [tagData] = await Promise.all([tagAPI.get()]);
      setTags(tagData);
      // update hooks
      const newTagName = content["name"];
      const newTag =  await tagAPI.getOneByName(newTagName);
      let updatedTags = [...recipeDetail.tags];
      updatedTags.push(newTag["id"].toString());
      setRecipeDetail({...recipeDetail, tags:updatedTags});

    } else if (table === "ingredients") {
      // update the database
      await ingredientAPI.add(content);
      const [ingredientData] = await Promise.all([ingredientAPI.get()]);
      setIngredients(ingredientData);
      // update hooks
      const newIngredientName = content["name"];
      const newIngredient = await ingredientAPI.getOneByName(newIngredientName);
      let updatedIngredients = [...recipeDetail.ingredients];
      updatedIngredients.push([newIngredient["id"], ""]);
      console.log(updatedIngredients);
      setRecipeDetail({...recipeDetail, ingredients:updatedIngredients});

    }
    
    return [true, msg];
  }







  /**
   * Hook updates
   */
  const [selectedIngredient, setSelectedIngredient] = useState<string>(ingredients.length > 0 ? ingredients[0]["name"] : ""); // ingredient name
  const [newStep, setNewStep] = useState<string>("");
  
  const handleRemoveTag = (tagName: string) => {
    /** Removes a tag from the recipe */
    const tagid = findRecordidByName(tagName, tags).toString();
    console.log(tagid);
    console.log(recipeDetail.tags);
    setRecipeDetail({...recipeDetail, tags:recipeDetail.tags.filter(t => t !== tagid)});
  };
  const handleRemoveIngredient = (id: string) => {
    setRecipeDetail({...recipeDetail, ingredients: recipeDetail.ingredients.filter((ingr)=>ingr[0]!==id)});
  };
  const handleRemoveStep = (index: number) => {
    setRecipeDetail({...recipeDetail, steps:recipeDetail["steps"].filter((step, i)=>i!==index)});
  }

  const handleAddStep = () => {
    const updatedSteps = [...recipeDetail["steps"]];
    updatedSteps.push(newStep);
    setRecipeDetail({...recipeDetail, steps: updatedSteps});
    setNewStep("");
  };


  const handleAddExistingIngredient = () => {
    if (selectedIngredient === "") return;
    const id = findRecordidByName(selectedIngredient, ingredients).toString();
    if (recipeDetail.ingredients.filter((ingr)=>ingr[0]===id).length > 0) return; // ignore existing ingredients
    const updatedIngredients = recipeDetail.ingredients.filter((ingr)=>ingr[0]!==id);
    updatedIngredients.push([`${id}`, '0']);
    setRecipeDetail({...recipeDetail, ingredients: updatedIngredients});
  };
  const handleReorder = (option: "up" | "down", index: number) => {
    const updatedSteps = [...recipeDetail.steps];
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
    const updatedIngredients = [...recipeDetail.ingredients];
    const updatedIngredient = updatedIngredients[index];
    updatedIngredient[1] = e.target.value;
    setRecipeDetail({...recipeDetail, ingredients:updatedIngredients});
  };
  const handleUpdateStep = (e: any, index: number) => {
    const updatedSteps = [...recipeDetail.steps];
    updatedSteps[index] = e.target.value;
    setRecipeDetail({...recipeDetail, steps:updatedSteps})
  };










      
  return (
    <div
      className="recipedetail-container round-corner soft-shadow display-center"
      ref={ref}
    >

      {/* left column */}
      <div className="recipedetail-container-left border-right">
        
        <div className="first-section">
          {/* image content */}
          <RecipeImage
            mode={mode}
            recipe={recipeDetail}
            setRecipeDetail={setRecipeDetail}
          />

          {/* text content */}
          <div className="recipedetail-text-info-container-left">
            <div className="recipedetail-name-container">
              <Name name={recipeDetail["name"]} mode={mode} recipeDetail={recipeDetail} setRecipeDetail={setRecipeDetail} />
            </div>
            <div className="recipedetail-link-container">
              <Link mode={mode} url={recipeDetail["external_links"]} recipeDetail={recipeDetail} setRecipeDetail={setRecipeDetail} />
            </div>
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
        </div>

        <div className="second-section">
          <NoteCard
            mode={mode}
            recipeDetail={recipeDetail}
            setRecipeDetail={setRecipeDetail}
          />
        </div>

        
      </div>
      





      {/* right column */}
      <div className="recipedetail-container-right">
        

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

        
        
      </div>

      {/* sidebar */}
      <div className="recipedetail-container-sidebar border-left">
        <ButtonGroup
          mode={mode}
          setMode={setMode}
          handleClose={handleClose}
          recipeDetail={recipeDetail}
          resetEditState={resetEditState}
          handleUpdate={handleUpdate}
          handleAddNewRecord={handleAddNewRecord}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      </div>

    </div>
  );
}