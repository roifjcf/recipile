import { RecipeInterface, RecipeCardDisplay, TagInterface } from "@/common/type";
import RecipeCard from "@/components/recipeCard/recipeCard";
import { getFuzzySearchResult } from "@/utils/helper";



interface Props {
  recipes: RecipeInterface[],
  debouncedSearchInput: string,
  tags: TagInterface[],
  recipeCardDisplay: RecipeCardDisplay,
  setCurrentRecipe: (hookval: RecipeInterface) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setRecipes: (hookval: RecipeInterface[]) => void,
};



export default function SearchResult({
  recipes,
  debouncedSearchInput,
  tags,
  setCurrentRecipe,
  setShowRecipeDetail,
  setRecipes,
}: Props) {

const renderSearchResult = (searchTerm: string, recipes: RecipeInterface[]) => {
    const listToRender = getFuzzySearchResult(searchTerm, recipes, ["name"]);
    return listToRender.map((recipe, i) => <RecipeCard
                                              key={i}
                                              recipe={recipe}
                                              recipes={recipes}
                                              tags={tags}
                                              recipeCardDisplay="simple"
                                              setCurrentRecipe={setCurrentRecipe}
                                              setShowRecipeDetail={setShowRecipeDetail}
                                              setRecipes={setRecipes}
                                              recipesToEdit={new Set()}
                                            />);
  }


  
  return (
    <div className="page-right-column">
      <div className="searchresult-container">
        {renderSearchResult(debouncedSearchInput, recipes)}
      </div>
    </div>
  );


}