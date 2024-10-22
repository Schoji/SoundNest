/* eslint-disable jsx-a11y/alt-text */
import logo from '../../../assets/icons/logo-title.png';
import BasicMenu from './Menu';
import * as React from 'react';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topBarContent">
        <div className="iconDiv">
          <img src={logo} height="60px" />
          <p>SoundNest</p>
        </div>
        <div className="searchInputDiv">
          <input type="text" className="searchInput" placeholder="Search" />
        </div>
        <div className="profileDiv">
          <div className="walletValueDiv">
            {sessionStorage.getItem('id') === null ? (
              <p>6,9$</p>
            ) : (
              <p>{sessionStorage.getItem('credits')}$</p>
            )}
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
