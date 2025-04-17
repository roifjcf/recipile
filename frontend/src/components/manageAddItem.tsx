'use client';

import { useState } from "react";

import { Tables } from "@/common/type";

interface Props {
  table: Tables,
  handleAdd: (table: string, content: any) => void
};

export default function ManageAddItem(props:Props) {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>(""); // name
  const [value2, setValue2] = useState<string>(""); // unit (for ingredient records)

  const resetHook = () => {
    setIsEditing(false);
    setValue1("");
    setValue2("");
  }

  const handleSubmit = () => {
    if (props.table === "ingredients") {
      props.handleAdd(props.table, {"name": value1, "unit": value2});
    } else {
      props.handleAdd(props.table, {"name": value1});
    }
    resetHook();
  }

  return (
  <div>
    {isEditing
    ?
    <>
    <input type="text" value={value1} onChange={(e)=>{setValue1(e.target.value)}} />
    { props.table === "ingredients" &&
    <input type="text" value={value2} onChange={(e)=>{setValue2(e.target.value)}} />}
    <span className="clickable icon" onClick={handleSubmit}>✅</span>
    <span className="clickable icon" onClick={resetHook} >❌</span>
    </>
    :
    <span className="clickable icon" onClick={()=>{setIsEditing(true)}}>➕</span>}
  </div>
  )
}