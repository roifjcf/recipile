'use client';

import { IconProps } from "@/common/type";
import { useState } from "react";

export default function Icon({
  src,
  altsrc, // image on hover
  hoverable = false, // changes the cursor to pointer if true
  onClick,
  className,
  description, // appears on hover
}: IconProps) {

  const [isHovering, setIsHovering] = useState<boolean>(false); // display control for prop `description`

  const srcDefault = `icons/${src}.png`;
  const srcActive = (altsrc) ? `icons/${altsrc}.png` : srcDefault;
  const [currSrc, setCurrSrc] = useState<string>(srcDefault);
  const showAltIcon = () => altsrc && setCurrSrc(srcActive);
  const showDefaultIcon = () => altsrc && setCurrSrc(srcDefault);

  return(
    <div
      className="icon-container"
      onMouseEnter={()=> setIsHovering(true)}
      onMouseLeave={()=> setIsHovering(false)}
    >
      {isHovering && description && <span className="icon-description label">{description}</span>}
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
    </div>
  );
  
}