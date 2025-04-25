/**
 * For displaying the status of prep_time and serving
 */
import { Mode, Recipe } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  recipeDetail: Recipe,
  onChange?: ((...args: any[]) => void)[] | undefined,
};

export default function MiniStats(props: Props) {
  return (
    <div className="ministats-container">
      <div className="ministats-item">
        <Icon
          src={"time-outline"}
          altsrc={undefined}
          changeSrc={false}
          hoverable={false}
          onClick={undefined}
        />
        {props.mode === "view" && <p>{props.recipeDetail["prep_time"] + (props.recipeDetail["prep_time"] > 1 ? " minutes" : "minute")}</p>}
        {(props.mode === "update" || props.mode === "new") &&
        <input
          className="input-small inline"
          type="number"
          onChange={(e) => props.onChange?.[0]?.(e)}
          placeholder="Prepatation time (minutes)"
          value={props.recipeDetail["prep_time"]}
          min={0}
        />
        }
      </div>
      <div className="ministats-item">
        <Icon
          src={"serving-outline"}
          altsrc={undefined}
          changeSrc={false}
          hoverable={false}
          onClick={undefined}
        />
        {props.mode === "view" && <p>{props.recipeDetail["serving"]}</p>}
        {(props.mode === "update" || props.mode === "new") &&
        <input
          className="input-small inline"
          type="number"
          onChange={(e) => props.onChange?.[1]?.(e)}
          placeholder="Serving size"
          value={props.recipeDetail["serving"]}
          min={1}
        />
        }
      </div>
    </div>
  );
}