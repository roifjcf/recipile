import { CURRENT_VERSION } from "@/common/constant";
import SettingMenuItem from "./settingMenuItem";

export default function SettingMenuGeneral() {
  return (
  <>
    <h4>App</h4>
    <SettingMenuItem
      title={`Current version: ${CURRENT_VERSION}`}
      externalLinkUrl="https://github.com/roifjcf/recipile"
      externalLinkDescription="Github repository"
    />
    <SettingMenuItem
      title={`Get started`}
      externalLinkUrl="/getstarted"
      externalLinkDescription="Starter guide"
    />
  </>);
}