'use client';

import { IconProps } from "@/common/type";
import { useState } from "react";
import ConfirmationPopUp from "./components/confirmationPopUp";

export default function Icon({
  src,
  altsrc,
  hoverable = false,
  onClick,
  className, 
  description,
  showPopUp = false,
  popUpMessage = "",
  popUpDirection = "left",
  classNameContainer = "",
  
}: IconProps) {


  const [isHovering, setIsHovering] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);

  const srcDefault = `icons/${src}.png`;
  const srcActive = altsrc ? `icons/${altsrc}.png` : srcDefault;
  const currSrc = isHovering && altsrc ? srcActive : srcDefault;



  
  return (
    <div
      className={"icon-container" + " " + classNameContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && description && (
        <span className="icon-description label">{description}</span>
      )}
      {showPopUp ? (
        <>
          {displayPopUp && (
            <ConfirmationPopUp
              confirm={onClick}
              message={popUpMessage}
              closePopUp={() => setDisplayPopUp(false)}
              className={`icon-popup ${popUpDirection === "right" ? " icon-popup-right" : ""}`}
            />
          )}
          <img
            className={
              "icon-img" + (hoverable ? " clickable" : "") + " " + (className || "")
            }
            src={currSrc}
            alt={currSrc}
            draggable={false}
            onClick={() => setDisplayPopUp(true)}
          />
        </>
      ) : (
        <img
          className={
            "icon-img" + (hoverable ? " clickable" : "") + " " + (className || "")
          }
          src={currSrc}
          alt={currSrc}
          draggable={false}
          onClick={onClick ?? undefined}
        />
      )}
    </div>
  );
}
