'use client';

import { useState } from "react";

interface Props {
  src: string;
  altsrc?: string | undefined;
  hoverable?: boolean;
  onClick?: ((...args: any[]) => void) | undefined;
  className?: string;
};

export default function Icon({
  src,
  altsrc,
  hoverable = false,
  onClick,
  className
}: Props) {

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