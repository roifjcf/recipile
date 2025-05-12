import { Mode, Recipe } from "@/common/type"
import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  recipeDetail: Recipe,
  onChange: ((...args: any[]) => void) | undefined,
};

export default function NoteCard({ mode, recipeDetail, onChange }: Props) {
  return (
    <div className="notecard-container">
      
      <div className="notecard-title">
        <Icon src="message-outline-958F8F" />
        <h4>Notes</h4>
      </div>

      {mode === "view" ?
        <p>{recipeDetail["notes"]}</p>
      :
        <textarea
          placeholder="Notes"
          onChange={onChange}
          value={recipeDetail["notes"]}>
        </textarea>
      }
      
    </div>
  );
}