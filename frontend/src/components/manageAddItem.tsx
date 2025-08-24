/*
  Component for page "/manage"
  Adds new records to table "tags", "categories", or "ingredients"
*/
'use client';

import { useContext, useState } from "react";

import { Tables } from "@/common/type";
import Icon from "@/components/icon/icon";
import PushNotificationContext from "@/contexts/pushNotificationContext";

interface Props {
  table: Tables,
  handleAddRecord?: (table: Tables, content: any) => Promise<(string | boolean)[]>, // [successful, msg]
  className?: string,
};

export default function ManageAddItem({
  table,
  handleAddRecord,
  className,
}: Props) {






  const [valueName, setValueName] = useState<string>(""); // name
  const [valueUnit, setValueUnit] = useState<string>(""); // unit (for ingredient records)
  const context = useContext(PushNotificationContext);

  const reset = () => {
    setValueName("");
    setValueUnit("");
  }
  
  const handleClick = async () => {


    if (handleAddRecord) {
      let params = {};
      if (table === "ingredients") { params = {"name": valueName, "unit": valueUnit};}
      else if (table === "categories") { params = {"name": valueName, "icon_file_name": ""};}
      else { params = {"name": valueName};}
        
      const [isSuccessfulUpdate, message] = await handleAddRecord(table, params);
      if (typeof message === "string") {
        if (isSuccessfulUpdate) {
          // context?.addNotificationMessage?.(message, "Success");
        } else {
          context?.addNotificationMessage?.(message, "Error");
        }
      }
    }

    reset();
  }




  return (
  <div className="manageadditem-container">
    
    <div className="left">
      <input
        className="input-full"
        type="text"
        value={valueName}
        placeholder={`${table === "tags" ? "New tag" :
                        table === "categories" ? "New category" :
                        table === "ingredients" ? "New ingredient" : ""}`}
        onChange={(e)=>{setValueName(e.target.value)}}
      />

      { table === "ingredients" &&
      <input
        className="input-full"
        type="text"
        value={valueUnit}
        placeholder="Unit (optional)"
        onChange={(e)=>{setValueUnit(e.target.value)}}
      />}
    </div>

    <div className="right">
      <Icon src="add-outline" hoverable={true} onClick={handleClick} />
      <Icon src="reset-outline" hoverable={true} onClick={reset} />
    </div>

  </div>
  )
}