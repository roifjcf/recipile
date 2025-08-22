import SettingMenuItem from "./settingMenuItem";

export default function SettingMenuAppearance() {

  const setTheme = (theme: "dark" | "light") => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  return (
    <>
      <SettingMenuItem
        title="Themes"
        iconSrc="brush"
        description="Change app theme"
        actions={[
          { actionName: "Light", onClick: () => setTheme("light") },
          { actionName: "Dark", onClick: () => setTheme("dark") },
        ]}
      />
    </>
  );
}