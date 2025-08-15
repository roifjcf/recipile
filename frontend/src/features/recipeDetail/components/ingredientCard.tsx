/**
 * For component <RecipeDetail />
 */

import { IngredientInterface, Modes, RecipeInterface, Tables } from "@/common/type"

import Icon from "@/components/icon/icon";
import ManageAddItem from "@/components/manageAddItem";

import { findRecordNameByid, findIngredientUnitByid } from "@/utils/helper";

interface Props {
  mode: Modes,
  recipeDetail: RecipeInterface,
  ingredients: IngredientInterface[],
  selectedIngredient: string,
  setSelectedIngredient?: ((data: string) => void) | undefined,
  handleRemoveIngredient?: ((id: string) => void) | undefined,
  handleUpdateIngredientAmount?: ((e: any, index: number) => void) | undefined,
  handleAddExistingIngredient?: (() => void) | undefined,
  handleAddNewRecord?: (table: Tables, content: any) => Promise<(string | boolean)[]>,
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

  const renderViewMode = () => {
    return (
      <ul className="ingredientcard-ingredients-container">
        {recipeDetail["ingredients"].map((ingr, index) =>
        <li className="ingredientcard-ingredient-container" key={index}>
          <span className="ingredientcard-ingredient-name">
            {findRecordNameByid(parseInt(ingr[0]), ingredients)}
          </span>
          <span className="ingredientcard-ingredient-quantity">
            {ingr[1]}
          </span>
          <span className="ingredientcard-ingredient-unit">
            {findIngredientUnitByid(parseInt(ingr[0]), ingredients)}
          </span>
        </li>)}
      </ul>
    );
  }

  const renderEditMode = () => {
    return (
      <>
        <ul className="ingredientcard-ingredients-container">
          {recipeDetail["ingredients"].map((ingr, index) =>
          <li className="ingredientcard-ingredient-container" key={index}>
            <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>{handleRemoveIngredient?.(ingr[0])}} />
            <span className="ingredientcard-ingredient-name">
              {findRecordNameByid(parseInt(ingr[0]), ingredients)}
            </span>
            <input 
              className="inline ingredientcard-ingredient-quantity"
              type="text"
              placeholder="Amount of the ingredient"
              onChange={(e)=>{handleUpdateIngredientAmount?.(e, index)}}
              value={ingr[1]}
            />
            <span className="ingredientcard-ingredient-unit">
              {findIngredientUnitByid(parseInt(ingr[0]), ingredients)}
            </span>
          </li>)}
        </ul>
        <div className="ingredientcard-dropdown-container">
          <select value={selectedIngredient} onChange={e=>setSelectedIngredient?.(e.target.value)}>
            {ingredients.map((ingr, index) =>
            <option key={index} value={ingr["name"]}>{ingr["name"]}</option>)}
          </select>
          <Icon src="add-outline" hoverable={true} onClick={handleAddExistingIngredient}/>
        </div>
        <ManageAddItem table="ingredients" handleAddRecord={handleAddNewRecord} />
      </>
    );
  }

  return (
    <div>
      <h4>Ingredients</h4>
      {mode === "view" ?  renderViewMode() : renderEditMode() }
    </div>
  );
}