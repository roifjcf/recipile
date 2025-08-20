import { RecipeInterface, TagInterface } from "@/common/type";
import Buttons from "./buttons";
import MiniStats from "@/components/miniStats";
import Tags from "@/components/tags";
import RecipeImage from "@/components/recipeImage";

interface Props {
  canDelete: boolean,
  recipe: RecipeInterface,
  tags: TagInterface[],
  handlePin: (val: number, e: React.MouseEvent) => void,
  handleShowRecipeDetail: () => void,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,

};

export default function RecipeCardFullDisplay({
  canDelete,
  recipe,
  tags,
  handlePin,
  handleShowRecipeDetail,
  handleUpdateEditList,
  recipesToEdit,
}: Props) {


  return (
    <div
      className="recipecardfulldisplay-container round-corner"
      onClick={handleShowRecipeDetail}
    >
    
      <RecipeImage
        mode="view"
        recipe={recipe}
      />

      <div className="recipecardfulldisplay-text-info-container">
        <div className="recipecardfulldisplay-text-info-container-top">

          <div className="left">
            <h4 className="recipecardfulldisplay-title">{recipe.name}</h4>
          </div>
          
          <div className="right">
            <Buttons
              canDelete={canDelete}
              recipe={recipe}
              handlePin={handlePin}
              handleUpdateEditList={handleUpdateEditList}
              recipesToEdit={recipesToEdit}
            />
          </div>
        </div>



        <div>
          <MiniStats
            mode="view"
            recipeDetail={recipe}
            onChange={undefined}
            />
          <Tags
            mode="view"
            recipeTags={recipe.tags}
            tags={tags}
          />
        </div>
      </div>



    </div>
  );


}