import { RecipeInterface, TagInterface } from "@/common/type";
import Buttons from "./buttons";
import MiniStats from "@/components/miniStats";
import Tags from "@/components/tags";

interface Props {
  canDelete: boolean,
  recipe: RecipeInterface,
  tags: TagInterface[],
  handlePin: (val: number, e: React.MouseEvent) => void,
  handleShowRecipeDetail: () => void,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  isChecked?: boolean,
};

export default function RecipeCardSimpleDisplay({
  canDelete,
  recipe,
  tags,
  handlePin,
  handleShowRecipeDetail,
  handleUpdateEditList,
  isChecked,
}: Props) {


  return (
    <div
      className="recipecardsimpledisplay-container round-corner"
      onClick={handleShowRecipeDetail}
    >
    


      <div className="recipecardsimpledisplay-text-info-container-top">

        <div className="left">
          <h3>{recipe.name}</h3>
        </div>
        
        <div className="right">
          <Buttons
            canDelete={canDelete}
            recipe={recipe}
            handlePin={handlePin}
            handleUpdateEditList={handleUpdateEditList}
            isChecked={isChecked}
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
  );


}