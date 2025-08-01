import { useState } from "react";
import Icon from "./icon";
import WrapperClickOutside from "./wrapperClickOutsite";

interface Props {
  defaultOption: string,
  items: string[];
  className?: string; // container style
  eventHandler?: (item: string) => void;
}

export default function Dropdown({
  defaultOption,
  items,
  className,
  eventHandler,
}: Props) {

  const [currentOption, setCurrentOption] = useState<string>(defaultOption);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClick = (item: string) => {
    setCurrentOption(item);
    eventHandler?.(item);
  }
  
  return (
    <div
      className={"dropdown-container" + " " + className}
    >

      <div className="dropdown-selector">
        <span>{currentOption}</span>
        <Icon
          src={"arrow-down"}
          hoverable={true}
          onClick={()=>setShowOptions(!showOptions)}
        />
      </div>

      {showOptions &&
      <WrapperClickOutside handler={()=>setShowOptions(false)}>
        <div className="dropdown-items">
          {items.map((item, index) =>
          <span
            key={index}
            onClick={()=>handleClick(item)}
            className="dropdown-item"
          >
            {item}
          </span>)}
        </div>
      </WrapperClickOutside>
      }
    </div>
  );
}