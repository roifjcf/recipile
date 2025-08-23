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

export default function RecipeCardSimpleDisplay({
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
    className={`recipecardsimpledisplay-container round-corner ${isSelected ? " border-selected" : ""}`}
      onClick={isEditing ? handleToggle : handleShowRecipeDetail}
    >
    


      <div className="recipecardsimpledisplay-text-info-container-top">

        <div className="left">
          <h3 className="recipecardsimpledisplay-title">{recipe.name}</h3>
        </div>
        
        <div className="right">
          <Buttons
            canDelete={isEditing}
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
          recipeTags={recipe.tags.slice(0,2)}
          tags={tags}
        />
      </div>


    </div>
  );


}