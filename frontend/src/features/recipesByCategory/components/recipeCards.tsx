import { Recipe, recipeCardDisplay, Tag } from "@/common/type";
import RecipeCard from "@/components/recipeCard";

interface Props {
  recipes: Recipe[],
  tags: Tag[],
  currentRecipes: Recipe[],
  kaomoji: string,
  recipeCardDisplay: recipeCardDisplay,
  setRecipes: (hookval: Recipe[]) => void,
  setCurrentRecipe: (hookval: Recipe) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  isBulkEditing: boolean,
  isChecked: (id: number) => boolean,
  handleUpdateEditList: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,
};

export default function RecipeCards(props: Props) {


  return (
  <div>
    {props.currentRecipes.length > 0 ?
    <div className="recipecards-container">
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
        isChecked={(id: number) => props.recipesToEdit.has(id)}
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