/*
  Component for adding new records to table "tags", "categories", or "ingredients"
*/
'use client';

import { useState } from "react";

import { Tables } from "@/common/type";
import Icon from "@/components/icon";

interface Props {
  table: Tables,
  handleAdd?: (table: Tables, content: any) => void
};

export default function ManageAddItem(props:Props) {

  const [value1, setValue1] = useState<string>(""); // name
  const [value2, setValue2] = useState<string>(""); // unit (for ingredient records)

  const resetHook = () => {
    setValue1("");
    setValue2("");
  }
  
  const handleSubmit = () => {
    if (props.table === "ingredients") {
      props.handleAdd?.(props.table, {"name": value1, "unit": value2});
    } else {
      props.handleAdd?.(props.table, {"name": value1});
    }
    resetHook();
  }

  return (
  <div className="manageadditem-container">
    <div className="left">
      <input className="input-mid" type="text" value={value1} placeholder="name" onChange={(e)=>{setValue1(e.target.value)}} />
      { props.table === "ingredients" &&
      <input className="input-small" type="text" value={value2} placeholder="unit" onChange={(e)=>{setValue2(e.target.value)}} />}
    </div>
    <div className="right">
      <Icon src="add-outline" altsrc={undefined} hoverable={true} changeSrc={false} onClick={handleSubmit} />
      <Icon src="reset-outline" altsrc={undefined} hoverable={true} changeSrc={false} onClick={resetHook} />
    </div>
  </div>
  )
}