import { SettingMenuItemActionInterface } from "@/common/type";
import Icon from "@/components/icon/icon";

interface Props {
  iconSrc?: string,
  title: string,
  description?: string,
  actions?: SettingMenuItemActionInterface[],
  externalLinkUrl?: string
  externalLinkDescription?: string
};

export default function SettingMenuItem({
  iconSrc = "",
  title = "",
  description = "",
  actions = [],
  externalLinkUrl = "",
  externalLinkDescription = "",
}: Props) {



  
  
  return (
    <div className="settingmenuitem-container">
      
      <div className="settingmenuitem-title">
        {iconSrc !== "" && <Icon src={iconSrc} />}
        <p>{title}</p>
      </div>

      <div className="settingmenuitem-content">
        <div className="text">
          <p className="description">{description}</p>
          {externalLinkUrl !== "" &&
          <a href={externalLinkUrl} target="_blank">
            {externalLinkDescription}
          </a>}
        </div>
        <div className="actions">
          {actions.map((action, index) =>
          <button key={index} className="action" onClick={action["onClick"]}>
            {action["actionName"]}
          </button> )}
        </div>
      </div>




    </div>
  );
}