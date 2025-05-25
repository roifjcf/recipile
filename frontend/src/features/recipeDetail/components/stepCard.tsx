/**
 * Step component
 */
import { Mode, RecipeInterface } from "@/common/type"
import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  recipeDetail: RecipeInterface,
  handleRemoveStep?: ((index: number) => void),
  handleUpdateStep?: ((e: any, index: number) => void),
  handleReorder?: ((option: "up" | "down", index: number) => void),
  newStep: string,
  setNewStep?: ((e: any) => void),
  handleAddStep?: (() => void),
};

export default function StepCard({
  mode,
  recipeDetail,
  handleRemoveStep,
  handleUpdateStep,
  handleReorder,
  newStep,
  setNewStep,
  handleAddStep,
}: Props) {

  const { steps } = recipeDetail;

  const renderViewMode = () => <ul>{steps.map((s, index) => <li key={index}>{s}</li>)}</ul>;
  
  const renderEditMode = () => {
    return (
      <ul>

        {/* current steps */}
        {steps.map((step, index) =>
        <li key={index}>
          <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>{handleRemoveStep?.(index)}} />
          <input
            className="input-long inline"
            key={index}
            type="text"
            placeholder="Step"
            value={step}
            onChange={(e)=>{handleUpdateStep?.(e, index)}}
          />
          <Icon src="up-outline" altsrc="up-fill" hoverable={true}  onClick={()=>handleReorder?.("up", index)} />
          <Icon src="down-outline" altsrc="down-fill" hoverable={true} onClick={()=>handleReorder?.("down", index)} />
        </li>
        )}

        {/* input field for new steps */}
        <li>
          <input
            className="input-long inline"
            type="text"
            placeholder="New step..."
            value={newStep}
            onChange={(e)=>setNewStep?.(e.target.value)}
          />
          <Icon src="add-outline" hoverable={true} onClick={handleAddStep} />
        </li>
      </ul>
    );
  }



  return (
    <div>
      <h4>Steps</h4>
      {mode === "view" ?  renderViewMode() : renderEditMode() }
    </div>
  );
}