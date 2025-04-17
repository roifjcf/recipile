'use client';

import { useEffect, useState } from "react";
import { Tables, isIngredient } from "@/common/type";
import { Category, Tag, Ingredient } from "@/common/type";

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

  return(
    <div className="manageitem-container">

      {isInEditMode ? 
      <div className="manageitem-container-left">
        <input type="text" value={modifiedItem.name} onChange={(e) => {
          const updatedItem = setModifiedItem({...modifiedItem, name: e.target.value});
        }}/>
        {isIngredient(modifiedItem) &&
        <input type="text" value={modifiedItem.unit} onChange={(e) => {
          const updatedItem = setModifiedItem({...modifiedItem, unit: e.target.value});
        }}/>}
      </div>
      :
      <div className="manageitem-container-left">
        <span>{item.name}</span>
        {'unit' in item && <span>{item.unit}</span>}
      </div>
      }




      <div className="manageitem-container-right">
        {isInEditMode ? 
        <>
          <span className="icon clickable" onClick={() => {
            setItem({...modifiedItem});
            if (isIngredient(modifiedItem)) {
              props.handleUpdate(props.table, item["id"],
                {"id": modifiedItem["id"],
                  "name": modifiedItem["name"],
                  "unit": modifiedItem["unit"] ? modifiedItem["unit"] : ""
                });
            } else {
              props.handleUpdate(props.table, item["id"], {"content": modifiedItem["name"]});
            }
            setIsInEditMode(false);
          }}>✅</span>
          <span className="icon clickable" onClick={()=> {
            setIsInEditMode(false);
            setModifiedItem(item);
          }}>❌</span>
        </> : 
        <>
          <span className="icon clickable"
            onClick={()=>setIsInEditMode(true)}>
            ✏️
          </span>
          <span className="icon clickable"
            onClick={()=>props.handleDelete(props.table, item["id"])}>🗑️</span>
        </>}

      </div>
    </div>
  )
}