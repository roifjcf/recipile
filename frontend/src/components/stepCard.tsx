import { Mode, Recipe } from "@/common/type"

import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  recipeDetail: Recipe,
  handleRemoveStep?: ((index: number) => void) | undefined,
  handleUpdateStep?: ((e: any, index: number) => void) | undefined,
  handleReorder?: ((option: "up" | "down", index: number) => void) | undefined,
  newStep: string,
  setNewStep?: ((e: any) => void) | undefined,
  handleAddStep?: (() => void) | undefined,
};

export default function StepCard(props:Props) {
  return (
    <div>
      <h4>Steps</h4>
      {props.mode === "view" ? 
      <ul>
        {props.recipeDetail["steps"].map((s, index) => <li key={index}>{s}</li>)}
      </ul> :
      <ul>
      {props.recipeDetail["steps"].map((step, index) =>
      <li key={index}>
        <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} changeSrc={true} onClick={()=>{props.handleRemoveStep?.(index)}} />
        <input
          className="input-mid inline"
          key={index}
          type="text"
          placeholder="Step"
          value={step}
          onChange={(e)=>{props.handleUpdateStep?.(e, index)}}
        />
        <Icon src="up-outline" altsrc="up-fill" hoverable={true} changeSrc={true} onClick={()=>props.handleReorder?.("up", index)} />
        <Icon src="down-outline" altsrc="down-fill" hoverable={true} changeSrc={true} onClick={()=>props.handleReorder?.("down", index)} />
      </li>
      )}
      <li>
        <input
          className="input-mid inline"
          type="text"
          placeholder="New step..."
          value={props.newStep}
          onChange={(e)=>props.setNewStep?.(e.target.value)}
        />
        <Icon src="add-outline" hoverable={true} changeSrc={false} onClick={props.handleAddStep} />
      </li>
    </ul>
      }
    </div>
  );
}