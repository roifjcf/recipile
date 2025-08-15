import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import Icon from "../icon/icon";
import SettingMenuSideBar from "./components/settingMenuSideBar";
import SettimeMenuDataManagement from "./components/settimeMenuDataManagement";

interface Props {
  closePopUp: () => void;
};

const options = [
  "General",
  "Data management"
];


export default function SettingMenu({
  closePopUp
}: Props) {



  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, closePopUp);



  return (
    <div className="settingmenu-container soft-shadow display-center" ref={ref}>
      <Icon
        className="settingmenu-closebutton"
        src={"cancel-outline"}
        altsrc={"cancel-fill"}
        hoverable={true}
        onClick={closePopUp}
      />
      <div className="settingmenu-main">
        <div className="settingmenu-sidebar border-right">
          <SettingMenuSideBar options={options} setSelectedOption={setSelectedOption} />
        </div>
        <div className="settingmenu-content">
          {selectedOption === "Data management" && <SettimeMenuDataManagement />}
        </div>
      </div>
    </div>
  );
}