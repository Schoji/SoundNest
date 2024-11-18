/* eslint-disable jsx-a11y/alt-text */
import BasicMenu from './Menu';
import LogoChange from '../Settings/SetLogo';
import SearchBar from './SearchBar';
import { Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';


function TopBar() {
  return (
    <div className="topbar">
      <div className="topBarContent">
        <div className="iconDiv">
          <LogoChange/>
          <p>SoundNest</p>
        </div>
        <div className="searchInputDiv">
          <SearchBar/>
        </div>
        <div className="profileDiv">
          <div className="walletValueDiv">
            <p>{parseFloat(sessionStorage.getItem('credits')).toFixed(2)}$</p>
          </div>
          <div className="profileButtonDiv">
            <BasicMenu/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
