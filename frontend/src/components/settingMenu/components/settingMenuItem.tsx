import { SettingMenuItemActionInterface } from "@/common/type";
import Icon from "@/components/icon/icon";

interface Props {
  iconSrc: string,
  title: string,
  description: string,
  actions: SettingMenuItemActionInterface[],
};

export default function SettingMenuItem({
  iconSrc,
  title,
  description,
  actions,
}: Props) {

  
  return (
    <div className="settingmenuitem-container">
      
      <div className="settingmenuitem-title">
        <Icon src={iconSrc} />
        <p>{title}</p>
      </div>

      <div className="settingmenuitem-content">
        <p className="description">{description}</p>
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