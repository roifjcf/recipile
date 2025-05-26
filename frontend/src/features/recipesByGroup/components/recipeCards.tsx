import { RecipeInterface, RecipeCardDisplay, TagInterface } from "@/common/type";
import RecipeCard from "@/components/recipeCard/recipeCard";

interface Props {
  recipes: RecipeInterface[],
  tags: TagInterface[],
  currentRecipes: RecipeInterface[],
  kaomoji: string,
  recipeCardDisplay: RecipeCardDisplay,
  setRecipes: (hookval: RecipeInterface[]) => void,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  isBulkEditing: boolean,
  isChecked: (id: number) => boolean,
  handleUpdateEditList: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,
};

export default function RecipeCards(props: Props) {

  const style = "recipecards-container" + (props.recipeCardDisplay === "list"
    ? " recipecards-container-list"
    : " recipecards-container-grid");
  
  return (
  <div>
    {props.currentRecipes.length > 0 ?
    <div className={style} >
      {props.currentRecipes.map((recipe, index) =>
      <RecipeCard
        key={index}
        recipe={recipe}
        recipes={props.recipes}
        tags={props.tags}
        recipeCardDisplay={props.recipeCardDisplay}
        setRecipes={props.setRecipes}
        setCurrentRecipe={props.setCurrentRecipe}
        setShowRecipeDetail={props.setShowRecipeDetail}
        isBulkEditing={props.isBulkEditing}
        isChecked={props.isChecked(recipe["id"])}
        handleUpdateEditList={props.handleUpdateEditList}
      />) }
    </div>
    :
    <div className="recipecards-msg">
      <p>{props.kaomoji}</p>
      <p>No recipes under this category!</p>
    </div>}
  </div>);
}