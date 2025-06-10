/**
 * For displaying the status of prep_time and serving
 */
import { Modes, RecipeInterface } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  mode: Modes,
  recipeDetail: RecipeInterface,
  onChange?: ((...args: any[]) => void)[] | undefined,
  simpleMode? : boolean
};

export default function MiniStats({
  mode, 
  recipeDetail, 
  onChange,
  simpleMode = false
}: Props) {
  const inEditMode = mode === "update" || mode === "new";
  
  const renderPrepTime = () => {
    return (
      <div className="ministats-item">
        <Icon src={"time-outline"} />
        {!inEditMode && <p>{recipeDetail["prep_time"] + (recipeDetail["prep_time"] > 1 ? " minutes" : "minute")}</p>}
        {inEditMode &&
        <input
          className="input-small inline"
          type="number"
          onChange={(e) => onChange?.[0]?.(e)}
          placeholder="Prepatation time (minutes)"
          value={recipeDetail["prep_time"]}
          min={0}
        />
        }
      </div>
    );
  }

  const renderServing = () => {
    return (
      <div className="ministats-item">
        <Icon src={"serving-outline"} />
        {!inEditMode && <p>{recipeDetail["serving"]}</p>}
        {inEditMode &&
        <input
          className="input-small inline"
          type="number"
          onChange={(e) => onChange?.[1]?.(e)}
          placeholder="Serving size"
          value={recipeDetail["serving"]}
          min={1}
        />
        }
      </div>
    );
  };

  return (
    <div className="ministats-container">
      {renderPrepTime()}
      {renderServing()}
    </div>
  );

}