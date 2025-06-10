import { IconProps } from "@/common/type";
import Icon from "@/components/icon";
import { useState } from "react";

interface Props extends IconProps {
  iconsToDisplay: IconProps[],
}

const defaultStyle = "expandableicons-container";
const onToggleStyle = defaultStyle + " expandableicons-expanded";



export default function ExpandableIcons({
  iconsToDisplay,
  src,
  altsrc,
  hoverable,
  onClick,
  className,
  description,
}: Props) {






  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle(!toggle);
    if (onClick) { onClick(); }
  }





  return (

    <div className={toggle ? onToggleStyle : defaultStyle}>

      {toggle && iconsToDisplay.map((icon: IconProps, i) =>
        <Icon
          key={i}
          src={icon["src"]} 
          altsrc={icon["altsrc"]}
          hoverable={icon["hoverable"]}
          onClick={icon["onClick"]}
          className={icon["className"]}
          description={icon["description"]}
        />)}

      {toggle && <span className="expandableicons-divisor"></span>}

      <Icon
        src={src}
        altsrc={altsrc} 
        hoverable={hoverable} 
        onClick={handleClick} 
        className={className}
        description={description}
      />

    </div>

  );


}