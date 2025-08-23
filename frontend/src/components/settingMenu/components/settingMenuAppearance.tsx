import { manageLocalStorage, resetPreference } from "@/utils/helper";
import SettingMenuItem from "./settingMenuItem";
import { useEffect, useState } from "react";

export default function SettingMenuAppearance() {



  const [isDimmedImageToggled, setIsDimmedImageToggled] = useState(
    manageLocalStorage("get", "dimmedImage") === "true");

  const setTheme = (theme: "dark" | "light") => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const handleToggleDimmedImage = () => {
    const newValue = !isDimmedImageToggled;
    setIsDimmedImageToggled(newValue);
    manageLocalStorage("set", "dimmedImage", String(newValue));
  };

  useEffect(() => {
    const html = document.documentElement;
    if (isDimmedImageToggled) {
      html.classList.add("dimmed-images");
    } else {
      html.classList.remove("dimmed-images");
    }
  }, [isDimmedImageToggled]);



  return (
    <>
      <SettingMenuItem
        title="Themes"
        iconSrc="brush"
        description="Change app theme"
        actions={[
          { "actionName": "Light", "onClick": () => setTheme("light") },
          { "actionName": "Dark", "onClick": () => setTheme("dark") },
        ]}
      />
      <hr />
      <h4>Preference</h4>
      <SettingMenuItem
        title="Dimmed recipe images in dark mode"
        type="toggle"
        actions={[
          { "actionName": "",
            "onClick": handleToggleDimmedImage,
            "toggled": isDimmedImageToggled }
        ]}
      />
      <SettingMenuItem
        title="Reset preferences"
        iconSrc="reset-outline"
        description="Clear user preferences, refresh required"
        actions={[
          { "actionName": "Reset", "onClick": resetPreference }
        ]}
      />
    </>
  );
}