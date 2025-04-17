'use client';
import { Recipe, Tag, Ingredient } from "@/common/type";
import { useEffect, useState } from "react";
import { findRecordNameByid, findIngredientUnitByid, findRecordidByName } from "@/utils/helper";

interface Props {
  tags: Tag[],
  currentRecipe: Recipe,
  ingredients: Ingredient[],
  setShowRecipeDetail: (data:any) => void,
};

export default function RecipeDetail(props:Props) {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [isEditingNewTag, setIsEditingNewTag] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isEditingNewStep, setIsEditingNewStep] = useState<boolean>(false);
  const [newStep, setNewStep] = useState<string>("");

  const [modifiedRecipe, setModifiedRecipe] = useState<Recipe>(props.currentRecipe);

  const handleDisableEdit = () => {
    setIsInEditMode(false);
    setIsEditingNewTag(false);
    setIsEditingNewStep(false);
    setModifiedRecipe(props.currentRecipe);
  }

  const handleCloseRecipeDetail = () => {
    handleDisableEdit();
    props.setShowRecipeDetail(false);
  }
  const handleEnableEditMode = () => {
    setIsInEditMode(true);
  }


  const handleUpdateRecipe = () => {
    // TODO: submit updated recipe to the server
    handleDisableEdit();
  }

  useEffect(() => {
    // Event listener for key press
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseRecipeDetail();
      }
    }
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };

  }, []);


  return (
    <div className="recipe-detail-container round-corner">
      
      <span className="icon clickable" onClick={handleCloseRecipeDetail}>❌</span>
      {!isInEditMode && <span className="icon clickable" onClick={handleEnableEditMode}>✏️</span>}
      {isInEditMode && 
      <span className="icon clickable" onClick={handleDisableEdit}>🗑️</span>}
      {isInEditMode && 
      <span className="icon clickable" onClick={handleUpdateRecipe}>✅</span>}

      <br />

      {/* name */}
      {isInEditMode ? <input
        type="text"
        onChange={(e)=>{
        setModifiedRecipe({...modifiedRecipe, name:e.target.value})
          }}
        placeholder="Recipe name"
        value={modifiedRecipe["name"]}
      /> : <p>{modifiedRecipe["name"]}</p>}


      {/* tags */}
      <ul>{modifiedRecipe["tags"].map((tag, index) => 
        <li className="tag-label" key={index}>
          🏷️{findRecordNameByid(parseInt(tag), props.tags)}

          {isInEditMode && <span className="icon clickable" onClick={() => {
            let updatedTags = [...modifiedRecipe.tags];
            let i = updatedTags.indexOf(tag);
            if (i >= 0) {
              updatedTags.splice(i, 1);
            }
            setModifiedRecipe({...modifiedRecipe, tags:updatedTags});
          }}>❌</span>}
        </li>
      )}
      </ul>

      {isInEditMode && <span className="icon clickable" onClick={()=>setIsEditingNewTag(true)}>➕</span>}
      {isInEditMode && isEditingNewTag &&
      <>
      <select
        id="recipeDetail-tags"
        value={selectedTag}
        onChange={(e) => {
          setSelectedTag(e.target.value);
        }}
      >
        {props.tags.map((tag, index) =>
        <option key={index} value={tag["name"]}>
          {tag["name"]}
        </option>)}
      </select>
      <span className="icon clickable" onClick={()=>setIsEditingNewTag(false)}>❌</span>
      <span className="icon clickable" onClick={()=>{
        if (selectedTag === "") return;
        let updatedTags = [...modifiedRecipe.tags];
        let id = findRecordidByName(selectedTag, props.tags).toString();
        if (!updatedTags.includes(id)) {
          updatedTags.push(id);
        }
        setModifiedRecipe({...modifiedRecipe, tags:updatedTags});
      }}>✅</span>
      </>

      }
      <br />


      {isInEditMode &&
      <>
      <input
        type="number"
        onChange={(e)=>{ if (isNaN(parseInt(e.target.value))) {return;}
        setModifiedRecipe({...modifiedRecipe, prep_time:parseInt(e.target.value)})
      }}
        placeholder="Prepatation time (minutes)"
        value={modifiedRecipe["prep_time"]}
        min={0}
      />
      <input
        type="number"
        onChange={(e)=>{ if (isNaN(parseInt(e.target.value))) {return;}
          setModifiedRecipe({...modifiedRecipe, serving:parseInt(e.target.value)})}}
        placeholder="Serving size"
        value={modifiedRecipe["serving"]}
        min={1}
      />
      </>
      }

      {!isInEditMode &&
      <>
      {/* <p>📅 {props.currentRecipe["created"]}</p> */}
      <p>⌛ {modifiedRecipe["prep_time"]}</p>
      <p>🥣 {modifiedRecipe["serving"]}</p>
      </>
      }
      



      <br />

      <p>Ingredients:</p>
      {!isInEditMode &&
      <ul>{modifiedRecipe["ingredients"].map((ingredient, index) => 
        <li key={index}>
        {findRecordNameByid(parseInt(ingredient[0]), props.ingredients)} &nbsp;
        {ingredient[1]} &nbsp;
        {findIngredientUnitByid(parseInt(ingredient[0]), props.ingredients)}
        </li>
      )}
      </ul>}
      {isInEditMode &&
      <ul>{modifiedRecipe["ingredients"].map((ingredient, index) => 
        <li key={index}>
        {findRecordNameByid(parseInt(ingredient[0]), props.ingredients)} &nbsp;
        <input 
          type="text"
          placeholder="Amount of the ingredient"
          onChange={(e) => {
            let updatedIngredients = [...modifiedRecipe.ingredients];
            let updatedIngredient = updatedIngredients[index];
            updatedIngredient[1] = e.target.value;
            setModifiedRecipe({...modifiedRecipe, ingredients:updatedIngredients})
          }}
          value={ingredient[1]} />
        {findIngredientUnitByid(parseInt(ingredient[0]), props.ingredients)}
        </li>
      )}
      </ul>}


      <br />

      
      {/* steps */}
      <p>steps:</p>
      {isInEditMode && isEditingNewStep &&
      <span className="icon clickable" onClick={()=>setIsEditingNewStep(false)}>❌</span>}
      {isInEditMode && !isEditingNewStep &&
      <span className="icon clickable" onClick={()=>setIsEditingNewStep(true)}>➕</span>}

      <ul>
        {modifiedRecipe["steps"].map((step, index)=>
        <li key={index}>
          {!isInEditMode && step}
          {isInEditMode && 
          <>
          <input
            key={index}
            type="text"
            placeholder="Step"
            value={step}
            onChange={(e)=>{
              let updatedSteps = [...modifiedRecipe.steps];
              updatedSteps[index] = e.target.value;
              setModifiedRecipe({...modifiedRecipe, steps:updatedSteps})
          }}/>
          <span className="icon clickable" onClick={(e) => {
            if (index < 1) return;
            let updatedSteps = modifiedRecipe.steps;
            let temp = updatedSteps[index-1];
            updatedSteps[index-1] = step;
            updatedSteps[index] = temp;
            setModifiedRecipe({...modifiedRecipe, steps:updatedSteps})
          }}>🔼</span>
          <span className="icon clickable" onClick={(e) => {
            if (index >= modifiedRecipe.steps.length - 1) return;
            let updatedSteps = modifiedRecipe.steps;
            let temp = updatedSteps[index+1];
            updatedSteps[index+1] = step;
            updatedSteps[index] = temp;
            setModifiedRecipe({...modifiedRecipe, steps:updatedSteps})
          }}>🔽</span>
          <span className="icon clickable" onClick={(e) => {
            let updatedSteps = modifiedRecipe.steps;
            updatedSteps.splice(index,1);
            setModifiedRecipe({...modifiedRecipe, steps:updatedSteps})
          }}>❌</span>
          </>}
        </li>
      )}

        {isInEditMode && isEditingNewStep && <li> <input type="text" value={newStep} onChange={(e)=>setNewStep(e.target.value)} /> </li>}
      </ul>
      

      <br />

      <p>Notes</p>
      { !isInEditMode && <p>{modifiedRecipe["notes"]}</p>}
      { isInEditMode && 
      <textarea
        placeholder="Notes"
        onChange={(e)=>{
          setModifiedRecipe({...modifiedRecipe, notes:e.target.value})
        }}
        value={modifiedRecipe["notes"]}>
      </textarea>}

      <br />

      <p>External link</p>
      {!isInEditMode && <a href={modifiedRecipe["external_links"]} target="_blank">🔗 </a>}
      {isInEditMode &&
      <input
        type="text"
        placeholder="External link"
        onChange={(e)=>{
          setModifiedRecipe({...modifiedRecipe, external_links:e.target.value})
        }}
        value={modifiedRecipe["external_links"]}
      />}


      

    </div>
  );
}