import { Modes, RecipeInterface, Tables } from "@/common/type";
import Icon from "@/components/icon/icon";

interface Props {
  mode: Modes,
  setMode: (hoolval: Modes) => void,
  handleClose: () => void,
  recipeDetail: RecipeInterface,
  resetEditState: () => void,
  handleUpdate: () => void,
  handleAddNewRecord: (table: Tables, content: any) => Promise<(string | boolean)[]>,
  handleDeleteRecipe: (id:number) => void,
};

export default function ButtonGroup({
  mode,
  setMode,
  handleClose,
  recipeDetail,
  resetEditState,
  handleUpdate,
  handleAddNewRecord,
  handleDeleteRecipe,
}:Props) {

  const ViewMode = () => <>
    <div>
      <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
    </div>
    <div>
      <Icon src={"edit-outline"} altsrc={"edit-fill"} hoverable={true} onClick={()=>setMode("update")}/>
    </div>
  </>;

  const EditMode = () => <>
    <div>
      <Icon src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={handleClose}/>
    </div>
    <div className="buttongroup-sub-container-bottom">
      {/* delete button under edit(update) mode */}
      {mode === "update" && <>
        <Icon src="bin-outline" altsrc="bin-fill"
            hoverable={true} onClick={()=>{handleDeleteRecipe(recipeDetail.id); handleClose();}}
            showPopUp={true} popUpMessage="Delete the recipe?"
          />
        <span className="icon-divisor-horizontal"></span>
      </>}
      
      {mode === "update" && <Icon src={"undo-outline"} hoverable={true} onClick={resetEditState} showPopUp={true} popUpMessage="Discard all changes?" />}
      {mode === "update" && <Icon src={"yes-outline"} hoverable={true} onClick={handleUpdate} showPopUp={true} popUpMessage="Save changes?" />}
      {mode === "new" && <Icon src={"yes-outline"} hoverable={true} onClick={()=>handleAddNewRecord("recipes", {...recipeDetail})}/>}
    </div>
  </>;


  return (
    <div className="buttongroup-container">
      {mode === "view" ? <ViewMode /> : <EditMode />}
    </div>
  );
};