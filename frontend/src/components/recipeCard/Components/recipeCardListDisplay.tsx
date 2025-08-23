import { RecipeInterface, TagInterface } from "@/common/type";
import Buttons from "./buttons";
import MiniStats from "@/components/miniStats";
import Tags from "@/components/tags";

interface Props {
  isEditing: boolean,
  isSelected: boolean,
  recipe: RecipeInterface,
  tags: TagInterface[],
  handlePin: (val: number, e: React.MouseEvent) => void,
  handleShowRecipeDetail: () => void,
  handleUpdateEditList?: (id: number, e: React.MouseEvent) => void,
  recipesToEdit: Set<number>,
};







export default function RecipeCardListDisplay({
  isEditing: isEditing,
  isSelected,
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
      className={`recipecardlistdisplay-container ${isSelected ? " border-selected" : ""}`}
      onClick={isEditing ? handleToggle : handleShowRecipeDetail}
    >

      <div className="left">
        <Buttons
          canDelete={isEditing}
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

      {recipe.tags.length > 0 &&
      <div className="right">
        <Tags
          mode="view"
          recipeTags={recipe.tags}
          tags={tags}
        />
      </div>
      }

    </div>
  );
}