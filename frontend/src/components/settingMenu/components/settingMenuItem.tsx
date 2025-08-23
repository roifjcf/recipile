import { SettingMenuItemActionInterface } from "@/common/type";
import Icon from "@/components/icon/icon";

interface Props {
  iconSrc?: string,
  title: string,
  description?: string,
  actions?: SettingMenuItemActionInterface[],
  externalLinkUrl?: string,
  externalLinkDescription?: string,
  type?: "button" | "toggle",
};

export default function SettingMenuItem({
  iconSrc = "",
  title = "",
  description = "",
  actions = [],
  externalLinkUrl = "",
  externalLinkDescription = "",
  type = "button",
}: Props) {



  
  
  return (
    <div
      className={type==="button" ? "settingmenuitem-container-column" : "settingmenuitem-container-row"}
    >
      
      <div className="settingmenuitem-title">
        {iconSrc !== "" && <Icon src={iconSrc} />}
        <p>{title}</p>
      </div>


      <div className="settingmenuitem-content">


        {type === "button" &&
        <>
          <div className="settingmenuitem-text">
            <p className="settingmenuitem-description">{description}</p>
            {externalLinkUrl !== "" &&
            <a href={externalLinkUrl} target="_blank">
              {externalLinkDescription}
            </a>}
          </div>
          <div className="settingmenuitem-actions">
            {actions.map((action, index) =>
            <button key={index} className="button-small" onClick={action["onClick"]}>
              {action["actionName"]}
            </button> )}
          </div>
        </>}


        {type === "toggle" &&
        <>
          {actions.map((action, index) =>
          <div
            key={index}
            className="settingmenuitem-toggle-item clickable"
            onClick={action["onClick"]}
          >
            <p>{action["actionName"]}</p>
            <Icon
              src={ action["toggled"] ? "toggle-on" : "toggle-off"}
              hoverable={true}
            />
          </div>)}
        </>}
        
      </div>




    </div>
  );
}