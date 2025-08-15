import { Modes, RecipeInterface } from "@/common/type"
import Icon from "@/components/icon/icon";

interface Props {
  mode: Modes,
  recipeDetail: RecipeInterface,
  setRecipeDetail: (hookval: RecipeInterface) => void,
};

export default function NoteCard({
  mode,
  recipeDetail,
  setRecipeDetail,
}: Props) {

  const renderViewMode = () => <p className="notecard-content">{recipeDetail["notes"]}</p>;
  const renderEditMode = () => <textarea
                            placeholder="Notes"
                            onChange={(e)=>setRecipeDetail({...recipeDetail, notes:e.target.value})}
                            value={recipeDetail["notes"]}>
                          </textarea>;

  

  return (
    <div className="notecard-container">
      
      <div className="notecard-title">
        <Icon src="message-outline-958F8F" />
        <h4>Notes</h4>
      </div>

      {mode === "view" ?  renderViewMode() : renderEditMode() }
      
    </div>
  );
}