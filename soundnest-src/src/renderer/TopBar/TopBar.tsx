/* eslint-disable jsx-a11y/alt-text */
import BasicMenu from './Menu';
import LogoChange from '../Settings/SetLogo';


function TopBar() {
  return (
    <div className="topbar">
      <div className="topBarContent">
        <div className="iconDiv">
          <LogoChange/>
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
              <p>{parseFloat(sessionStorage.getItem('credits')).toFixed(2)}$</p>
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
