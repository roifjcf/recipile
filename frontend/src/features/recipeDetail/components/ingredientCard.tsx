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

export default function IngredientCard({
  mode,
  recipeDetail,
  ingredients,
  selectedIngredient,
  setSelectedIngredient,
  handleRemoveIngredient,
  handleUpdateIngredientAmount,
  handleAddExistingIngredient,
  handleAddNewRecord,
}: Props) {

  const ViewMode = () => {
    return (
      <ul>
        {recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          {findRecordNameByid(parseInt(ingr[0]), ingredients)} &nbsp;
          {ingr[1]} &nbsp;
          {findIngredientUnitByid(parseInt(ingr[0]), ingredients)}
        </li>)}
      </ul>
    );
  }

  const EditMode = () => {
    return (
      <>
      <ul>
        {recipeDetail["ingredients"].map((ingr, index) =>
        <li key={index}>
          <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>{handleRemoveIngredient?.(ingr[0])}} />
          {findRecordNameByid(parseInt(ingr[0]), ingredients)} &nbsp;
          <input 
            className="input-small inline"
            type="text"
            placeholder="Amount of the ingredient"
            onChange={(e)=>{handleUpdateIngredientAmount?.(e, index)}}
            value={ingr[1]}
          />&nbsp;
        {findIngredientUnitByid(parseInt(ingr[0]), ingredients)}
        </li>)}
      </ul>
      <div className="ingredientcard-dropdown-container">
        <select value={selectedIngredient} onChange={e=>setSelectedIngredient?.(e.target.value)}>
          {ingredients.map((ingr, index) =>
          <option key={index} value={ingr["name"]}>{ingr["name"]}</option>)}
        </select>
        <Icon src="add-outline" hoverable={true} onClick={handleAddExistingIngredient}/>
      </div>
      <ManageAddItem table="ingredients" handleAdd={handleAddNewRecord} />
      </>
    );
  }

  return (
    <div>
      <h4>Ingredients</h4>
      {mode === "view" ?  <ViewMode /> : <EditMode /> }
    </div>
  );
}