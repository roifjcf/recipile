/*
  Component for page "/manage"
  Adds new records to table "tags", "categories", or "ingredients"
*/
'use client';

import { useState } from "react";

import { Tables } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  table: Tables,
  handleAdd?: (table: Tables, content: any) => void
};

export default function ManageAddItem({ table, handleAdd }: Props) {

  const [value1, setValue1] = useState<string>(""); // name
  const [value2, setValue2] = useState<string>(""); // unit (for ingredient records)

  const reset = () => {
    setValue1("");
    setValue2("");
  }
  
  const handleSubmit = () => {
    if (table === "ingredients") {
      handleAdd?.(table, {"name": value1, "unit": value2});
    } else {
      handleAdd?.(table, {"name": value1});
    }
    reset();
  }

  return (
  <div className="manageadditem-container">
    <div className="left">
      <input className="input-mid" type="text" value={value1} placeholder="name" onChange={(e)=>{setValue1(e.target.value)}} />
      { table === "ingredients" &&
      <input className="input-small" type="text" value={value2} placeholder="unit" onChange={(e)=>{setValue2(e.target.value)}} />}
    </div>
    <div className="right">
      <Icon src="add-outline" hoverable={true} onClick={handleSubmit} />
      <Icon src="reset-outline" hoverable={true} onClick={reset} />
    </div>
  </div>
  )
}