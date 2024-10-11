import { NavLink, Outlet, Link } from 'react-router-dom';
import { AppBody } from './App';
import { CurrentWindow } from "./sidebar";
import React, { useState, useEffect} from "react";
import TopBar from './topbar';
import SideBar, { CurrentWindow } from "./sidebar";

export default function Main() {
  return (
    <div className='all'>
      <div className='topbar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='/main'>
          <Link to="main">XD</Link>
        </div>
      </div>
      <div className='bottombar'>
          <h1>123</h1>
      </div>
    </div>
  );
}
