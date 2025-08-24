"use client";
import Link from 'next/link';
import Icon from "@/components/icon/icon";
import { useEffect, useState } from 'react';
import SearchBar from '@/components/searchBar';
import SettingMenu from './settingMenu/settingMenu';
import { usePathname } from "next/navigation";






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
  toggleCollapsedSideBar?: () => void, // for page "/"
}






export default function Navbar({
  handleDebounceChange,
  handleResetSearchInput,
  searchInputRef,
  toggleCollapsedSideBar
}: Props) {
  
  
  const [currPath, setCurrPath] = useState<string>("");
  const [showSettingMenu, setShowSettingMenu] = useState<boolean>(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState<boolean>(false);
  const showSearchBar = handleDebounceChange && handleResetSearchInput && searchInputRef;
  const pathname = usePathname();

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
  

  
    <div className='navbar-container-full'>
      <div className="navbar-brand-info">
        <Icon src={"stack"} />
        <h4>Recipile</h4>
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
        {pathname==="/" &&
        <Icon
          classNameContainer='navbar-responsive-button'
          src='dropdown'
          hoverable={true}
          onClick={toggleCollapsedSideBar}
        />}
        {/* <Icon src='language-outline' hoverable={true}/> */}
        <div className='navbar-setting-button'>
          <Icon
            src="setting-outline"
            hoverable={true}
            onClick={()=>setShowSettingMenu(true)}
          />
        </div>
        <Icon
          classNameContainer='navbar-responsive-button'
          src="menu-outline"
          hoverable={true}
          onClick={()=>setShowDropdownMenu(!showDropdownMenu)}
        />
      </div>
    </div>
    
    {showDropdownMenu &&
    <>
      <div className='navbar-dropdownmenu-container'>
        {links.map((link, index) =>
          <Link key={index} className={'navbar-link' + (currPath === link["url"] ? " navbar-link-on-focus" : "")} href={link["url"]} >
            <Icon src={link["iconSrc"]} hoverable={true} />
            <p>{link["text"]}</p>
          </Link>)}
        <Icon
          src="setting-outline"
          hoverable={true}
          onClick={()=>setShowSettingMenu(true)}
        />
      </div>
      {/* <div className="navbar-bluroverlay bluroverlay"></div> */}
    </>
    }


  </div>
  );
}