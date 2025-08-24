import { useRef } from "react";
import Icon from "../icon";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  confirm?: ((...args: any[]) => void) | undefined;
  message: string;
  closePopUp: () => void;
  className? : string;
}

export default function ConfirmationPopUp({
  confirm,
  message,
  closePopUp,
  className = "",
}: Props) {


  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, closePopUp);

  return (
    <div className={`${className} confirmationpopup-container`} ref={popUpRef}>
      <p>{message}</p>
      <div className="confirmationpopup-icon-container">
        <Icon src="cancel-outline" altsrc="cancel-fill" hoverable={true} onClick={closePopUp}></Icon>
        <Icon src="check-outline" altsrc="check-fill" hoverable={true} onClick={confirm}></Icon>
      </div>
    </div>
  );
}