import { Mode, RecipeInterface } from "@/common/type";
import { useState } from "react";

interface Props {
  name: string,
  mode: Mode,
  recipeDetail: RecipeInterface,
  setRecipeDetail: (hookval: RecipeInterface) => void,
}

export default function Name({
  name,
  mode,
  setRecipeDetail,
  recipeDetail,
} : Props) {

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeDetail({...recipeDetail, name: e.target.value});
  };

  const renderViewMode = () => <h3>{name}</h3>;

  const renderEditMode = () => <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Recipe name"
                          />;
  
  // https://stackoverflow.com/questions/42573017/in-react-es6-why-does-the-input-field-lose-focus-after-typing-a-character
  return mode === "view" ?  renderViewMode() : renderEditMode();

};