'use client';

import { IconProps } from "@/common/type";
import { useState } from "react";
import ConfirmationPopUp from "./components/confirmationPopUp";

export default function Icon({
  src,
  altsrc, // image on hover
  hoverable = false, // changes the cursor to pointer if true
  onClick,
  className,
  description, // appears on hover
  showPopUp = false,
  popUpMessage = "",
}: IconProps) {

  const [isHovering, setIsHovering] = useState<boolean>(false); // display control for prop `description`
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false); // display control for pop up message

  const srcDefault = `icons/${src}.png`;
  const srcActive = (altsrc) ? `icons/${altsrc}.png` : srcDefault;
  const [currSrc, setCurrSrc] = useState<string>(srcDefault);
  const showAltIcon = () => altsrc && setCurrSrc(srcActive);
  const showDefaultIcon = () => altsrc && setCurrSrc(srcDefault);

  const closePopUp = () => {
    setDisplayPopUp(false);
  }

  const renderIconWithPopUp = () => {
    return(
      <div>
        {displayPopUp &&
          <ConfirmationPopUp
            confirm={onClick}
            message={popUpMessage}
            closePopUp={closePopUp}
            className="icon-popup"
          />
        }
        <img
          className={"icon-img"
                        + (hoverable ? " clickable" : "") + " "
                        + (className || "")}
          src={currSrc}
          alt={currSrc}
          draggable={false}
          onMouseEnter={showAltIcon}
          onMouseLeave={showDefaultIcon}
          onClick={()=>setDisplayPopUp(true)}
        />
      </div>
    );
  };

  const renderIconWithoutPopUp = () => {
    return(
      <img
        className={"icon-img"
                      + (hoverable ? " clickable" : "") + " "
                      + (className || "")}
        src={currSrc}
        alt={currSrc}
        draggable={false}
        onMouseEnter={showAltIcon}
        onMouseLeave={showDefaultIcon}
        onClick={onClick ?? undefined}
      />
    );
  };

  return(
    <div
      className="icon-container"
      onMouseEnter={()=> setIsHovering(true)}
      onMouseLeave={()=> setIsHovering(false)}
    >
      {isHovering && description && <span className="icon-description label">{description}</span>}
      {showPopUp ? renderIconWithPopUp() : renderIconWithoutPopUp()}
    </div>
  );
  
}