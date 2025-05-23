import { Category, Mode, Recipe, recipeCardDisplay } from "@/common/type";

import Icon from "@/components/icon";
import NewRecipeButton from "./newRecipeButton";

interface Props {
  currentCategory: Category | null,
  setMode: (hookval: Mode) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setCurrentRecipe: (hookval: Recipe) => void,
  isBulkEditing: boolean,
  handleDeleteRecipes:(idSet: Set<number>) => Promise<void>,
  recipesToEdit: Set<number>,
  setIsBulkEditing: (hookval: boolean) => void,
  recipeCardDisplay: recipeCardDisplay,
  toggleCardDisplay: () => void,
  showRecipeDetail: boolean,
};

export default function InfoBar(props: Props) {
  return (
  <div className="infobar-container">
    <div className="left">
      <h1>{props.currentCategory?.name}</h1>
      <NewRecipeButton
        setMode={props.setMode}
        setShowRecipeDetail={props.setShowRecipeDetail}
        setCurrentRecipe={props.setCurrentRecipe}
        showRecipeDetail={props.showRecipeDetail}
      />
    </div>
    <div className="right">
      {props.isBulkEditing && <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>{props.handleDeleteRecipes(props.recipesToEdit)}} />}
      <Icon src="checkbox-unchecked" hoverable={true} onClick={()=>{props.setIsBulkEditing(!props.isBulkEditing)}}/>
      {props.recipeCardDisplay === "full" && <Icon src="display-simple" hoverable={true} onClick={props.toggleCardDisplay}/>}
      {props.recipeCardDisplay === "simple" && <Icon src="display-full" hoverable={true} onClick={props.toggleCardDisplay}/>}
    </div>
  </div>);
}