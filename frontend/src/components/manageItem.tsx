/*
  Component for page "/manage"
*/

'use client';

import { useState } from "react";

import { Tables, isIngredient, Category, Tag, Ingredient } from "@/common/type";
import Icon from "@/components/icon";

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
    const params = isIngredient(modifiedItem) ?
    {
      "id": modifiedItem["id"],
      "name": modifiedItem["name"],
      "unit": modifiedItem["unit"] ? modifiedItem["unit"] : ""
    } :
    {"content": modifiedItem["name"]};
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
        </> :
        <div className="manageitem-container-left">
          <span className="left">{item.name}</span>
          {isIngredient(item) && <span className="right">{item.unit}</span>}
        </div>}
      </div>


      <div className="manageitem-container-right">
        {isInEditMode ? 
        <>
          <Icon src="yes-outline" altsrc={undefined} hoverable={true} changeSrc={false} onClick={handleConfirm} />
          <Icon src="close-outline" altsrc={undefined} hoverable={true} changeSrc={false} onClick={handleCancel} />
        </> : 
        <>
          <Icon src="edit-outline" altsrc="edit-fill" hoverable={true} changeSrc={true} onClick={()=>setIsInEditMode(true)} />
          <Icon src="bin-outline" altsrc="bin-fill" hoverable={true} changeSrc={true} onClick={()=>props.handleDelete(props.table, item["id"])} />
        </>}
      </div>
    </div>
  )
}