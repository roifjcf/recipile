'use client';
import { Recipe } from "@/common/type";
import { useState } from "react";

interface Props {
  categories: string[],
  setCategories: (data:string[]) => void,
  currentCategory: string,
  setCurrentCategory: (data: string) => void,
  setPushNotificationMessage: (data: string) => void,
  handleShowPushNotification: () => void,
  recipes: Recipe[],
  setRecipes: (data:Recipe[]) => void
}

export default function CategoryList (props:Props) {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [categoryNameUnderEdit, setCategoryNameUnderEdit] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number>(-1);

  const handleEnableEditMode = (index:number) => {
    setEditIndex(index);
    setCategoryNameUnderEdit(props.categories[index]);
    setIsInEditMode(true);
  }
  const handleExitEditMode = () => {
    setCategoryNameUnderEdit('');
    setEditIndex(-1);
    setIsInEditMode(false);
  }


  const handleAddCategory = () => {
    if (categoryNameUnderEdit === '') {
      props.setPushNotificationMessage("The name cannot be empty!");
      props.handleShowPushNotification();
      return;
    }
    props.setCategories([...props.categories, categoryNameUnderEdit]);
    props.setCurrentCategory(categoryNameUnderEdit);
    handleExitEditMode();
  };


  const handleUpdateCategory = (index: number) => {
    // TODO: update database as well


    // hook update
    const oldCategory = props.currentCategory;
    // for recipes
    const newRecipeList = [...props.recipes];
    for (const recipe of newRecipeList) {
      if (recipe.category === oldCategory) {
        recipe.category = categoryNameUnderEdit;
      }
    }
    props.setRecipes(newRecipeList);
    // for catetories
    const newCategoryList = [...props.categories];
    newCategoryList[index] = categoryNameUnderEdit;
    props.setCategories([...newCategoryList]);
    props.setCurrentCategory(categoryNameUnderEdit); 
    handleExitEditMode();
  }


  const handleRemoveCategory = (index: number) => {
    // there should be at least one category
    if (props.categories.length === 1) {
      props.setPushNotificationMessage("There must be at least one category!");
      props.handleShowPushNotification();
      return;
    }
    // TODO: remove all recipes under this category
    // TODO: confirmation pop out


    const newList = [...props.categories];
    newList.splice(index, 1);
    props.setCategories(newList);
    props.setCurrentCategory(newList[0]);
  }

  return(
    <div>
      <button className="text-btn" onClick={()=>{setEditIndex(props.categories.length);setIsInEditMode(true);}}>
        Add category
      </button>
      <ul>
        {props.categories.map((category, index) => 
        <li key={index}>
          {isInEditMode && editIndex===index ?
          // edit mode
          <>
          <input type="text" value={categoryNameUnderEdit} onChange={e => setCategoryNameUnderEdit(e.target.value)} />
          <button className="text-btn" onClick={() => handleUpdateCategory(index)}>Confirm</button>
          <button className="text-btn" onClick={handleExitEditMode}>
            Cancel
          </button>
          </> :
          // view mode
          <>
          <p className={"category " + (props.currentCategory === category ? "highlight" : "")} onClick={()=>props.setCurrentCategory(category)}>{category}</p>
          <button className="text-btn" onClick={()=>handleEnableEditMode(index)}>Edit</button>
          <button className="text-btn" onClick={()=>handleRemoveCategory(index)}>
            Remove
          </button>
          </>}
        </li>)}

        {isInEditMode && editIndex === props.categories.length ?
        // new category
        <li>
          <input type="text" value={categoryNameUnderEdit} onChange={e => setCategoryNameUnderEdit(e.target.value)}/>
          <button className="text-btn" onClick={handleAddCategory}>Add</button>
          <button className="text-btn" onClick={handleExitEditMode}>Cancel</button>
        </li> : <></>}
      </ul>

    </div>
  )
}