'use client';

import { IconProps } from "@/common/type";
import { useState } from "react";

export default function Icon({
  src,
  altsrc, // image on hover
  hoverable = false, // changes the cursor to pointer if true
  onClick,
  className
}: IconProps) {

  const srcDefault = `icons/${src}.png`;
  const srcActive = (altsrc) ? `icons/${altsrc}.png` : srcDefault;
  const [currSrc, setCurrSrc] = useState<string>(srcDefault);
  const handleMouseEnter = () => altsrc && setCurrSrc(srcActive);
  const handleMouseLeave = () => altsrc && setCurrSrc(srcDefault);

  return(
    <img
      className={"icon" + (hoverable ? " clickable" : "") + " " + (className || "")}
      src={currSrc}
      alt={currSrc}
      draggable={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick ?? undefined}
    />
  );
  
}