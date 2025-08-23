import { IconProps } from "@/common/type";
import Icon from "@/components/icon/icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

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

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, ()=>setToggle(false));

  return (

    <div
      className={toggle ? onToggleStyle : defaultStyle}
      ref={ref}
    >
      <Icon
        src={src}
        altsrc={altsrc} 
        hoverable={hoverable} 
        onClick={handleClick} 
        className={className}
        description={description}
      />

      {toggle && <span className="expandableicons-icon-divisor"></span>}

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
    </div>

  );


}