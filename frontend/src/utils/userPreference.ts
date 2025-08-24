
export const manageLocalStorage = (
  method: "get"|"set"|"remove", key: string, val?: string
) => {
  if (method === "get") { return localStorage.getItem(key); }
  else if (method === "set" && val) { localStorage.setItem(key, val); }
  else if (method === "remove") { localStorage.removeItem(key); }
}




export const styleInit = () => {
  // theme init
  const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light'
  const html = document.documentElement;
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    // default to OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // dimmed image in dark mode
  const dimmedImage = manageLocalStorage("get", "dimmedImage");
  if (dimmedImage === "false") {
    html.classList.remove("dimmed-images");
  } else {
    html.classList.add("dimmed-images");
  }
}





export const resetPreference = () => {
  // dimmedImage
  manageLocalStorage("remove", "dimmedImage");
  
}


