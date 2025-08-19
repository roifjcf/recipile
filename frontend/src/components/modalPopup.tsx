import { useState } from "react";
import Icon from "./icon/icon";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  message: string,
  actionRequired?: boolean, // "yes" / "no" button
  onConfirm?: (...args: any[]) => void;
  hasCheckbox?: boolean,
  checkboxMessage?: string,
  checkboxAction?: (...args: any[]) => void;
  closeModal: () => void;
}

export default function ModalPopup({
  message = "",
  actionRequired = false,
  onConfirm,
  hasCheckbox = false,
  checkboxMessage = "",
  checkboxAction,
  closeModal
}:Props) {

  const popUpRef = useRef<HTMLDivElement>(null);
  useClickOutside(popUpRef, closeModal);
  
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const handleConfirm = async () => {
    await checkboxAction?.();
    onConfirm?.();
  }

  const toggleCheckbox = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  return (
    <div ref={popUpRef} className="modalpopup-container soft-shadow display-center">
      <p>{message}</p>
      
      <div className="modalpopup-bottom-container">
        {hasCheckbox &&
        <div className="modalpopup-checkbox-container clickable" onClick={toggleCheckbox}>
          {isCheckboxChecked ?
          <Icon src="checkbox-checked"/>
          :
          <Icon src="checkbox-unchecked"/>
          }
          <p>{checkboxMessage}</p>
        </div>
        }

        <div className="modalpopup-action-container">
          {actionRequired ? <>
            <Icon className="large-icon" src="close-outline" hoverable={true} onClick={closeModal} />
            <Icon className="large-icon" src="yes-outline" hoverable={true} onClick={handleConfirm} />
          </> :
          <Icon src="yes-outline" hoverable={true} />}
        </div>
      </div>
      
    </div>
  );
}