/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, NavLink, Outlet, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import './TopBar.css';
import Main from './main';
import TopBar from './topbar';
import SideBar from "./sidebar";
import Katalog from './katalog';

export function Content() {
  return <h1>Siema</h1>;
}

export function AppBody() {
  return (
    <div className='all'>
      <div className='topbar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='main'>


        </div>
      </div>
      <div className='bottombar'>
        <Content />
      </div>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppBody />} />
        <Route path="main" element={<Main />} />
        <Route path="katalog" element={<Katalog />} />
      </Routes>
    </Router>
  );
}
