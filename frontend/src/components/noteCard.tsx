import { Mode, Recipe } from "@/common/type"
import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  recipeDetail: Recipe,
  onChange: ((...args: any[]) => void) | undefined,
};

export default function NoteCard(props:Props) {
  return (
    <div className="notecard-container">
      
      <div className="notecard-title">
        <Icon
          src="message-outline-958F8F"
          altsrc={undefined}
          hoverable={false}
          changeSrc={false}
          onClick={undefined}
        />
        <h4>Notes</h4>
      </div>

      {props.mode === "view" ?
      <p>{props.recipeDetail["notes"]}</p>
      :
      <textarea
        placeholder="Notes"
        onChange={props.onChange}
        value={props.recipeDetail["notes"]}>
      </textarea>
      }
      
    </div>
  );
}