import Link from 'next/link';

import Icon from "@/components/icon";

export default function Navbar() {
  return (
  <div className="navbar-container">

    <div className="navbar-brand-info">
      <h3>Recipile</h3>
      <span className='version-tag'>Alpha</span>
    </div>

    <div className='navbar-button-container-mid'>
      <Link className='navbar-link' href="/">
        <Icon src='dining-outline' hoverable={true}/>
        <p>Home</p>
      </Link>
      <Link className='navbar-link' href="/manage">
        <Icon src='data-outline' hoverable={true}/>
        <p>Manage</p>
      </Link>
      <Link className='navbar-link' href="/planner">
        <Icon src='calendar-outline' hoverable={true}/>
        <p>Planner</p>
      </Link>
    </div>


    <div className='navbar-button-container-right'>
      <Icon src='contrast-outline' hoverable={true}/>
      <Icon src='language-outline' hoverable={true}/>
      <Icon src='setting-outline' hoverable={true}/>
    </div>

  </div>
  );
}