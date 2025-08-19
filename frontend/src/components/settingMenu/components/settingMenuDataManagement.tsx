import { deleteAllData, exportJSONData, fileImporter } from "@/utils/helper";
import SettingMenuItem from "./settingMenuItem";
import { useState } from "react";
import ModalPopup from "@/components/modalPopup";

export default function SettingMenuDataManagement () {

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };


  
  return (
    <>

      
      {/* modal popups */}

      {showDeleteModal &&
      <ModalPopup
        message="Warning: Proceeding will delete all data permanently and cannot be undone!"
        actionRequired={true}
        onConfirm={deleteAllData}
        hasCheckbox={true}
        checkboxMessage="Back up data"
        checkboxAction={exportJSONData}
        closeModal={handleCloseDeleteModal}
        modalType="warning"
      />}












      <SettingMenuItem
        title="Export Data"
        iconSrc="upload"
        description="Export all data in .json format"
        actions={[
          {
            actionName: "Export Data",
            onClick: ()=>exportJSONData()
          }
        ]}
      />

      <SettingMenuItem
        title="Import Data"
        iconSrc="download"
        description="Import data"
        actions={[
          {
            actionName: "Tags",
            onClick: ()=>fileImporter("tags")
          },
          {
            actionName: "Categories",
            onClick: ()=>fileImporter("categories")
          },
          {
            actionName: "Ingredients",
            onClick: ()=>fileImporter("ingredients")
          },
          {
            actionName: "Recipes",
            onClick: ()=>fileImporter("recipes")
          }
        ]}
      />

      <hr />
      
      <h4>Danger Zone</h4>

      <SettingMenuItem
        title="Data Deletion"
        iconSrc="warning-outline"
        description="Deleta all data"
        actions={[
          {
            actionName: "Delete All Data",
            onClick: ()=>setShowDeleteModal(true)
          }
        ]}
      />

    </>
  );
}