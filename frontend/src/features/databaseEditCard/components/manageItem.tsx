/*
  Component for page "/manage"
  Edits records of table "tags", "categories", or "ingredients"
*/

'use client';

import { useState } from "react";

import { Tables, isIngredient, CategoryInterface, TagInterface, IngredientInterface, isCategory } from "@/common/type";
import Icon from "@/components/icon";
import IconSelector from "./iconSelector";

interface Props {
  key: number,
  item: CategoryInterface | TagInterface | IngredientInterface,
  table: Tables,
  handleDelete: (table:Tables, id:string | number) => void,
  handleUpdate: (table:Tables, id:string | number, content: any) => void,
};

export default function ManageItem (props:Props) {

  const [item, setItem] = useState<CategoryInterface | TagInterface | IngredientInterface>(props.item);
  const [modifiedItem, setModifiedItem] = useState<CategoryInterface | TagInterface | IngredientInterface>(props.item);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [showIconSelector, setShowIconSelector] = useState<boolean>(false);

  const handleCancel = () => {
    setIsInEditMode(false);
    setShowIconSelector(false);
    setModifiedItem(item);
  };

  const handleConfirm = () => {
    setItem({...modifiedItem});
    let params = {};
    if (isIngredient(modifiedItem)) { 
      params = { id: modifiedItem.id, name: modifiedItem.name, unit: modifiedItem.unit || "" }
    } else if (isCategory(modifiedItem)) {
      params = { id: modifiedItem.id, name: modifiedItem.name, icon_file_name: modifiedItem["icon_file_name"] || "" };
    } else {
      params = { content: modifiedItem.name };
    }
    console.log(params);
    props.handleUpdate(props.table, item["id"], params);
    setIsInEditMode(false);
    setShowIconSelector(false);
  }




  const renderViewMode = () => (<>
      {isCategory(item) && item.icon_file_name !== "" &&
      <Icon src={"food/" + item.icon_file_name} />}
      
      <span className="left">{item.name}</span>

      {isIngredient(item) && <span className="right">{item.unit}</span>}
    </>)



  
  const renderEditMode = () =>  (
    <>
      
      {isCategory(modifiedItem) && modifiedItem.icon_file_name === "" &&
        <Icon
          src={"add-outline"}
          hoverable={true}
          onClick={()=>setShowIconSelector(!showIconSelector)}
        />}
      {isCategory(modifiedItem) && modifiedItem.icon_file_name !== "" &&
        <Icon
          src={"food/" + modifiedItem.icon_file_name}
          hoverable={true}
          onClick={()=>setShowIconSelector(!showIconSelector)}
        />}
        
      {isCategory(modifiedItem) && showIconSelector &&
        <IconSelector
          modifiedItem={modifiedItem}
          setModifiedItem={setModifiedItem}
        />}



      <input
        className="input-mid"
        type="text"
        value={modifiedItem.name}
        onChange={(e) => setModifiedItem({...modifiedItem, name: e.target.value})}
      />




      {isIngredient(modifiedItem) &&
      <input
        className="input-small"
        type="text"
        value={modifiedItem.unit}
        onChange={(e) => setModifiedItem({...modifiedItem, unit: e.target.value})}
      />}
    </>)
  


  return(
    <div className="manageitem-container">
      <div className="manageitem-container-left">
        {isInEditMode ? renderEditMode() : renderViewMode()}
      </div>
      <div className="manageitem-container-right">
        {isInEditMode &&
        <>
          <Icon src="yes-outline" hoverable={true} onClick={handleConfirm} />
          <Icon src="close-outline" hoverable={true} onClick={handleCancel} />
        </>}
        
        {!isInEditMode && <>
          <Icon src="edit-outline" altsrc="edit-fill" hoverable={true} onClick={()=>setIsInEditMode(true)} />
          <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>props.handleDelete(props.table, item["id"])} />
        </>}
        
      </div>
    </div>
  )
}