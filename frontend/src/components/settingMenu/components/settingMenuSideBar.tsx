import Icon from "@/components/icon/icon";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  options: string[],
  setSelectedOption: (hookval: string) => void,
  selectedOption: string,
}

export default function SettingMenuSideBar({
  options,
  setSelectedOption,
  selectedOption
}: Props) {

  const [showOptions, setShowOptions] = useState<boolean>(false); // for renderCollapsedDisplay
  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, ()=>setShowOptions(false));

  const renderFullDisplay = () => {
    return (
      <div className="settingmenusidebar-container-full">
        <p className="settingmenusidebar-title">Options</p>
        {options.map((option, index) =>
        <div
          key={index}
          className={`settingmenusidebar-option ${selectedOption === option ? "settingmenusidebar-option-selected" : ""}`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </div>)}
      </div>
    );
  }

  const renderCollapsedDisplay = () => {
    return (
      <div ref={popUpRef} className="settingmenusidebar-container-collapsed">
        <Icon
          src="menu-outline"
          hoverable={true}
          onClick={()=>setShowOptions(!showOptions)}
        />

        {showOptions &&
        <div className="options border-right">
          <p className="settingmenusidebar-title">Options</p>
          {options.map((option, index) =>
          <div
            key={index}
            className={`settingmenusidebar-option ${selectedOption === option ? "settingmenusidebar-option-selected" : ""}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>)}
        </div>
        }

      </div>
    );
  };


  return (
    <>
      {/* breakpoints are controlled by css */}
      {renderFullDisplay()}
      {renderCollapsedDisplay()}
    </>
  );
}