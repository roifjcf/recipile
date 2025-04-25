/**
 * For component <RecipeDetail />
 */

import { Ingredient, Mode, Recipe, Tables } from "@/common/type"

import Icon from "@/components/icon";
import ManageAddItem from "@/components/manageAddItem";

import { findRecordNameByid, findIngredientUnitByid } from "@/utils/helper";

interface Props {
  mode: Mode,
  recipeDetail: Recipe,
  ingredients: Ingredient[],
  selectedIngredient: string,
  setSelectedIngredient?: ((data: string) => void) | undefined,
  handleRemoveIngredient?: ((id: string) => void) | undefined,
  handleUpdateIngredientAmount?: ((e: any, index: number) => void) | undefined,
  handleAddExistingIngredient?: (() => void) | undefined,
  handleAddNewRecord?: ((table: Tables, content: any) => void) | undefined,
};

export default function IngredientCard(props:Props) {
  return (
    <div>
      <h4>Ingredients</h4>
      {props.mode === "view" ? 
      <ul>
        {props.recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          {findRecordNameByid(parseInt(ingr[0]), props.ingredients)} &nbsp;
          {ingr[1]} &nbsp;
          {findIngredientUnitByid(parseInt(ingr[0]), props.ingredients)}
        </li>)}
      </ul>
      :
      <>
      <ul>
        {props.recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} changeSrc={true} onClick={()=>{props.handleRemoveIngredient?.(ingr[0])}} />
          {findRecordNameByid(parseInt(ingr[0]), props.ingredients)} &nbsp;
          <input 
            className="input-small inline"
            type="text"
            placeholder="Amount of the ingredient"
            onChange={(e)=>{props.handleUpdateIngredientAmount?.(e, index)}}
            value={ingr[1]}
          />&nbsp;
        {findIngredientUnitByid(parseInt(ingr[0]), props.ingredients)}
        </li>)}
      </ul>
      <div className="ingredientcard-dropdown-container">
        <select value={props.selectedIngredient} onChange={e=>props.setSelectedIngredient?.(e.target.value)}>
          {props.ingredients.map((ingr, index) =>
          <option key={index} value={ingr["name"]}>{ingr["name"]}</option>)}
        </select>
        <Icon src="add-outline" hoverable={true} changeSrc={false} onClick={props.handleAddExistingIngredient}/>
      </div>
      <ManageAddItem table="ingredients" handleAdd={props.handleAddNewRecord} />
      </>
      }
    </div>
  );
}