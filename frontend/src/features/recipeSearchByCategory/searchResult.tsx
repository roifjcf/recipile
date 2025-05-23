import { Recipe, recipeCardDisplay, Tag } from "@/common/type";
import RecipeCard from "@/components/recipeCard";




interface Props {
  recipes: Recipe[],
  debouncedSearchInput: string,
  tags: Tag[],
  recipeCardDisplay: recipeCardDisplay,
  setCurrentRecipe: (hookval: Recipe) => void,
  setShowRecipeDetail: (hookval: boolean) => void,
  setRecipes: (hookval: Recipe[]) => void,
};




export default function SearchResult({
  recipes,
  debouncedSearchInput,
  tags,
  setCurrentRecipe,
  setShowRecipeDetail,
  setRecipes,
}: Props) {

const renderSearchResult = (searchTerm: string, recipes: Recipe[]) => {
    let listToRender: Recipe[];
    if (searchTerm === "") {
      listToRender = [];
    } else {
      listToRender = recipes.filter((recipe) =>
                                      recipe["name"].toLowerCase()
                                      .includes(searchTerm.toLowerCase()));
    }
    return listToRender.map((recipe, i) => <RecipeCard
                                              key={i}
                                              recipe={recipe}
                                              recipes={recipes}
                                              tags={tags}
                                              recipeCardDisplay="simple"
                                              setCurrentRecipe={setCurrentRecipe}
                                              setShowRecipeDetail={setShowRecipeDetail}
                                              setRecipes={setRecipes}
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