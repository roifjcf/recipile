import { foodIcons } from "@/common/constant";
import Icon from "../../../components/icon";
import { CategoryInterface } from "@/common/type";

interface Props {
  modifiedItem: CategoryInterface,
  setModifiedItem: (hookval: CategoryInterface) => void,
};


export default function IconSelector({
  modifiedItem,
  setModifiedItem,
}: Props) {


  return (
    <div className="iconselector-container">
      <Icon
        src={"ban"}
        hoverable={true}
        onClick={(e) => setModifiedItem({...modifiedItem, icon_file_name: ""})}
        className="iconselector-icon"
      />
      {foodIcons.map((icon, i)=>
      <Icon
        src={"food/" + icon}
        hoverable={true}
        key={i}
        onClick={(e) => setModifiedItem({...modifiedItem, icon_file_name: icon})}
        className="iconselector-icon"
        />)}
    </div>
  );

}