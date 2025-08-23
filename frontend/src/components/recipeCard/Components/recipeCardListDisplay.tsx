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
  recipesToEdit: Set<number>,
};







export default function RecipeCardListDisplay({
  canDelete,
  recipe,
  tags,
  handlePin,
  handleShowRecipeDetail,
  handleUpdateEditList,
  recipesToEdit,
}: Props) {

  const handleToggle = (e: React.MouseEvent) => {
    handleUpdateEditList?.(recipe.id, e);
  };

  return (
    <div
      className="recipecardlistdisplay-container"
      onClick={canDelete ? handleToggle : handleShowRecipeDetail}
    >

      <div className="left">
        <Buttons
          canDelete={canDelete}
          recipe={recipe}
          handlePin={handlePin}
          handleUpdateEditList={handleUpdateEditList}
          recipesToEdit={recipesToEdit}
        />
        <div className="main-info">
          <p>{recipe.name}</p>
          <MiniStats
            mode="view"
            recipeDetail={recipe}
            onChange={undefined}
            />
          <p className="recipecardlistdisplay-date">{recipe.created}</p>
        </div>
      </div>

      <div className="right">
        <Tags
          mode="view"
          recipeTags={recipe.tags}
          tags={tags}
        />
      </div>

    </div>
  );
}