import { foodIcons } from "@/common/constant";
import Icon from "../../../components/icon/icon";
import { CategoryInterface } from "@/common/type";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";

interface Props {
  modifiedItem: CategoryInterface,
  setModifiedItem: (hookval: CategoryInterface) => void,
  closePopUp: () => void;

};


export default function IconSelector({
  modifiedItem,
  setModifiedItem,
  closePopUp,
}: Props) {

  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, closePopUp);
  
  return (
    <div className="iconselector-container" ref={popUpRef} >
      <Icon
        src={"ban"}
        hoverable={true}
        onClick={() => setModifiedItem({...modifiedItem, icon_file_name: ""})}
        className="iconselector-icon"
        description="remove icon"
      />
      {foodIcons.map((icon, i)=>
      <Icon
        src={"food/" + icon}
        hoverable={true}
        key={i}
        onClick={() => setModifiedItem({...modifiedItem, icon_file_name: icon})}
        className="iconselector-icon"
        description={icon}
        />)}
    </div>
  );

}