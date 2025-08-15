import Icon from "./icon/icon";

export default function ThemeButton() {

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }

  return <Icon src='contrast-outline' hoverable={true} onClick={toggleTheme}/>
}