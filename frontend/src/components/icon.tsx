'use client';

import { useState } from "react";

interface Props {
  src: string;
  altsrc?: string | undefined;
  hoverable: boolean;
  changeSrc: boolean; // changes src image on hover
  onClick?: ((...args: any[]) => void) | undefined;
};

export default function Icon(props: Props) {
  const srcDefault = `icons/${props.src}.png`;
  const srcActive = (props.altsrc) ? `icons/${props.altsrc}.png` : srcDefault;

  const [currSrc, setCurrSrc] = useState<string>(srcDefault);

  const handleMouseEnter = () => {
    if (!props.changeSrc) {return;}
    setCurrSrc(srcActive);
  };
  const handleMouseLeave = () => {
    if (!props.changeSrc) {return;}
    setCurrSrc(srcDefault);
  };

  return(
    <img
      className={"icon" + (props.hoverable ? " clickable" : "")}
      src={currSrc}
      alt={currSrc}
      draggable={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick ?? undefined}
    />
  );
  
}