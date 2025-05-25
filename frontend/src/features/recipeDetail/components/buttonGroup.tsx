import { Mode, RecipeInterface, Tables } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  mode: Mode,
  setMode: (hoolval: Mode) => void,
  handleClose: () => void,
  recipeDetail: RecipeInterface,
  resetEditState: () => void,
  handleUpdate: () => void,
  handleAddNewRecord: (table: Tables, content: any) => void,
};

export default function ButtonGroup({
  mode,
  setMode,
  handleClose,
  recipeDetail,
  resetEditState,
  handleUpdate,
  handleAddNewRecord,
}:Props) {

  const ViewMode = () => <>
    <div>
      <Icon src={"edit-outline"} altsrc={"edit-fill"} hoverable={true} onClick={()=>setMode("update")}/>
    </div>
    <div>
      <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
    </div>
  </>;

  const EditMode = () => <>
    <div>
      {mode === "update" && <Icon src={"undo-outline"} hoverable={true} onClick={resetEditState}/>}
      {mode === "update" && <Icon src={"yes-outline"} hoverable={true} onClick={handleUpdate}/>}
      {mode === "new" && <Icon src={"yes-outline"} hoverable={true} onClick={()=>handleAddNewRecord("recipes", {...recipeDetail})}/>}
    </div>
    <div>
      <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
    </div>
  </>;


  return (
    <div className="buttongroup-container">
      {mode === "view" ? <ViewMode /> : <EditMode />}
    </div>
  );
};