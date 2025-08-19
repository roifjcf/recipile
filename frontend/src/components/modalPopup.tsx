import { useState } from "react";
import Icon from "./icon/icon";
import { ModalType } from "@/common/type";

interface Props {
  message: string,
  actionRequired?: boolean, // "yes" / "no" button
  onConfirm?: (...args: any[]) => void;
  hasCheckbox?: boolean,
  checkboxMessage?: string,
  checkboxAction?: (...args: any[]) => void;
  closeModal: () => void;
  modalType?: ModalType
}

export default function ModalPopup({
  message = "",
  actionRequired = false,
  onConfirm,
  hasCheckbox = false,
  checkboxMessage = "",
  checkboxAction,
  closeModal,
  modalType = "default",
}:Props) {

  
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (isCheckboxChecked) {
      await checkboxAction?.();
    }
    onConfirm?.();
    closeModal();
  }

  const toggleCheckbox = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  return (
    <div className="modalpopup-container soft-shadow display-center">
      <div className="modalpopup-top-container">

        {modalType === "warning" && <Icon src="warning-outline" className="large-icon variant-icon" />}
        {modalType === "success" && <Icon src="check-outline" className="large-icon variant-icon" />}
        {modalType === "fail" && <Icon src="sentiment-very-dissatisfied" className="large-icon variant-icon" />}
        
        <p>{message}</p>
        {hasCheckbox &&
        <div className="modalpopup-checkbox-container clickable" onClick={toggleCheckbox}>
          {isCheckboxChecked ?
          <Icon src="checkbox-checked" className="variant-icon"/>
          :
          <Icon src="checkbox-unchecked" className="variant-icon"/>
          }
          <p>{checkboxMessage}</p>
        </div>
        }
      </div>



      <div className="modalpopup-bottom-container">

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