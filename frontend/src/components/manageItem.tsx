/*
  Component for page "/manage"
*/

'use client';

import { useState } from "react";
import { Tables, isIngredient, Category, Tag, Ingredient } from "@/common/type";

interface Props {
  key: number,
  item: Category | Tag | Ingredient,
  table: Tables,
  handleDelete: (table:string, id:string | number) => void,
  handleUpdate: (table:string, id:string | number, content: any) => void,
};

export default function ManageItem (props:Props) {

  const [item, setItem] = useState<Category | Tag | Ingredient>(props.item);
  const [modifiedItem, setModifiedItem] = useState<Category | Tag | Ingredient>(props.item);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  const handleCancel = () => {
    setIsInEditMode(false);
    setModifiedItem(item);
  };

  const handleConfirm = () => {
    setItem({...modifiedItem});
    const params = isIngredient(modifiedItem) ? {"id": modifiedItem["id"],
      "name": modifiedItem["name"],
      "unit": modifiedItem["unit"] ? modifiedItem["unit"] : ""
    } : {"content": modifiedItem["name"]};
    // if (isIngredient(modifiedItem)) {
    //   props.handleUpdate(props.table, item["id"],
    //     {"id": modifiedItem["id"],
    //       "name": modifiedItem["name"],
    //       "unit": modifiedItem["unit"] ? modifiedItem["unit"] : ""
    //     });
    // } else {
    //   props.handleUpdate(props.table, item["id"], {"content": modifiedItem["name"]});
    // }
    props.handleUpdate(props.table, item["id"], params);
    setIsInEditMode(false);
  }

  return(
    <div className="manageitem-container">

      <div className="manageitem-container-left">
        {isInEditMode ?
        <>
          <input
            type="text"
            value={modifiedItem.name}
            onChange={(e) => setModifiedItem({...modifiedItem, name: e.target.value})}
          />
          {isIngredient(modifiedItem) &&
          <input
            type="text"
            value={modifiedItem.unit}
            onChange={(e) => setModifiedItem({...modifiedItem, unit: e.target.value})}
          />}
        </> :
        <div className="manageitem-container-left">
          <span>{item.name}</span>
          {isIngredient(item) && <span>{item.unit}</span>}
        </div>}
      </div>


      <div className="manageitem-container-right">
        {isInEditMode ? 
        <>
          <span className="icon clickable" onClick={handleConfirm}>✅</span>
          <span className="icon clickable" onClick={handleCancel}>❌</span>
        </> : 
        <>
          <span className="icon clickable" onClick={()=>setIsInEditMode(true)}>✏️</span>
          <span className="icon clickable" onClick={()=>props.handleDelete(props.table, item["id"])}>🗑️</span>
        </>}
      </div>
    </div>
  )
}