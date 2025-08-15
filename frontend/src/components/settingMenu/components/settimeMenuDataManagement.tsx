import { exportJSONData, fileImporter } from "@/utils/helper";
import SettingMenuItem from "./settingMenuItem";

interface Props{

};
export default function SettimeMenuDataManagement ({

}: Props) {



  return (
    <>
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

        <SettingMenuItem
          title="Data Deletion"
          iconSrc="warning-outline"
          description="Deleta all data"
          actions={[
            {
              actionName: "Delete All Data",
              onClick: ()=>{}
            }
          ]}
        />

    </>
  );
}