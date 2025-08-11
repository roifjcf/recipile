"use client";
import Link from 'next/link';
import Icon from "@/components/icon";
import { useEffect, useState } from 'react';
import SearchBar from '@/components/searchBar';
import ThemeButton from './themeButton';
import SettingMenu from './settingMenu';






const links = [
  {
    url: "/",
    iconSrc: "dining-outline",
    text: "Home",
  },
  {
    url: "/manage",
    iconSrc: "data-outline",
    text: "Manage",
  },
  // {
  //   url: "/planner",
  //   iconSrc: "calendar-outline",
  //   text: "Planner",
  // },
];

interface Props {
  handleDebounceChange?: (e: any) => void,
  handleResetSearchInput?: () => void,
  searchInputRef?: React.RefObject<HTMLInputElement | null>,
}






export default function Navbar({
  handleDebounceChange,
  handleResetSearchInput,
  searchInputRef,
}: Props) {
  
  
  const [currPath, setCurrPath] = useState<string>("");
  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(false);
  const showSearchBar = handleDebounceChange && handleResetSearchInput && searchInputRef;

  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);

  const closeSettingMenu = () => {
    setShowSettingMenu(false);
  }

  return (
  <div className="navbar-container">

    {showSettingMenu && <SettingMenu closePopUp={closeSettingMenu} />}
    {showSettingMenu && <div className="navbar-bluroverlay bluroverlay"></div>}
      

    <div className="navbar-brand-info">
      <Icon src={"stack"} />
      <h3>Recipile</h3>
      <span className="label">Alpha</span>
    </div>

    <div className='navbar-button-container-mid'>
      {links.map((link, index) =>
      <Link key={index} className={'navbar-link' + (currPath === link["url"] ? " navbar-link-on-focus" : "")} href={link["url"]} >
        <Icon src={link["iconSrc"]} hoverable={true} />
        <p>{link["text"]}</p>
      </Link>)}

      {currPath === "/" && showSearchBar &&
      <SearchBar
        handleDebounceChange={handleDebounceChange}
        handleResetSearchInput={handleResetSearchInput}
        searchInputRef={searchInputRef}
      />}
      
    </div>


    <div className='navbar-button-container-right'>
      <ThemeButton />
      {/* <Icon src='language-outline' hoverable={true}/> */}
      <Icon src='setting-outline' hoverable={true} onClick={()=>setShowSettingMenu(true)}/>
    </div>

  </div>
  );
}