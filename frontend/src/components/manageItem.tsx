/*
  Component for page "/manage"
  Edits records of table "tags", "categories", or "ingredients"
*/

'use client';

import { useState } from "react";

import { Tables, isIngredient, CategoryInterface, TagInterface, IngredientInterface } from "@/common/type";
import Icon from "@/components/icon";

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

  const handleCancel = () => {
    setIsInEditMode(false);
    setModifiedItem(item);
  };

  const handleConfirm = () => {
    setItem({...modifiedItem});
    const params = isIngredient(modifiedItem)
                    ? { id: modifiedItem.id, name: modifiedItem.name, unit: modifiedItem.unit || "" }
                    : { content: modifiedItem.name };
    props.handleUpdate(props.table, item["id"], params);
    setIsInEditMode(false);
  }

  const renderIcons = () => (
    <div className="manageitem-container-right">
      {isInEditMode ? 
      <>
        <Icon src="yes-outline" hoverable={true} onClick={handleConfirm} />
        <Icon src="close-outline" hoverable={true} onClick={handleCancel} />
      </> : 
      <>
        <Icon src="edit-outline" altsrc="edit-fill" hoverable={true} onClick={()=>setIsInEditMode(true)} />
        <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} onClick={()=>props.handleDelete(props.table, item["id"])} />
      </>}
    </div>
  );

  const renderItemContent = () => (
    <div className="manageitem-container-left">
      <span className="left">{item.name}</span>
      {isIngredient(item) && <span className="right">{item.unit}</span>}
    </div>
  );

  const renderInputFields = () => (
    <>
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
    </>
  );

  return(
    <div className="manageitem-container">
      <div className="manageitem-container-left">
        {isInEditMode ? renderInputFields() : renderItemContent()}
      </div>
      {renderIcons()}
    </div>
  )
}