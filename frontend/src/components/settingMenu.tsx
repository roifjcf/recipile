import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import Icon from "./icon/icon";
import { exportJSONData, fileImporter } from "@/utils/helper";
import { ExportFileFormatOptions } from "@/common/type";

interface Props {
  closePopUp: () => void;
};

export default function SettingMenu({
  closePopUp
}: Props) {

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, closePopUp);

  const [selectedExportFileFormatOption, setSelectedExportFileFormatOption] = useState<ExportFileFormatOptions>("json");


  return (
    <div className="settingmenu-container soft-shadow display-center" ref={ref}>
      <Icon className="settingmenu-closebutton" src={"cancel-outline"} altsrc={"cancel-fill"} hoverable={true} onClick={closePopUp}/>
      
      <div className="settingmenu-section">
        <div className="settingmenu-section-title">
          <Icon src="upload" />
          <h4>Export data</h4>
        </div>
        <div className="settingmenu-section-content">
          <div className="left">
            <label>
              <input
                type="radio"
                name="export-format"
                value="json"
                checked={selectedExportFileFormatOption === "json"}
                onChange={()=>setSelectedExportFileFormatOption("json")}
              />
              JSON
            </label>
            <label>
              <input
                type="radio"
                name="export-format"
                value="csv"
                checked={selectedExportFileFormatOption === "csv"}
                onChange={()=>setSelectedExportFileFormatOption("csv")}
              />
              CSV
            </label>
          </div>
          <div className="right">
            <button onClick={()=>exportJSONData()}>Export data</button>

          </div>
        </div>
      </div>



      <div className="settingmenu-section">
        <div className="settingmenu-section-title">
          <Icon src="download" />
          <h4>Import data</h4>
        </div>
        <div className="settingmenu-section-content">
          <button onClick={()=>fileImporter("tags")}>Tags</button>
          <button onClick={()=>fileImporter("categories")}>Categories</button>
          <button onClick={()=>fileImporter("ingredients")}>Ingredients</button>
          <button onClick={()=>fileImporter("recipes")}>Recipes</button>
        </div>
      </div>



      <div className="settingmenu-section">
        <div className="settingmenu-section-title">
          <Icon src="warning-outline" />
          <h4>Danger Zone</h4>
        </div>
        <div className="settingmenu-section-content">
          <button onClick={()=>fileImporter("tags")}>Delete All Data</button>
        </div>
      </div>
    </div>
  );
}