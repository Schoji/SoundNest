/* eslint-disable jsx-a11y/alt-text */
import logo from '../../../assets/icons/48x48.png';
import logodark from '../../../assets/icons/icons-dark/48x48.png';
import BasicMenu from './Menu';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topBarContent">
        <div className="iconDiv">
          <img src={sessionStorage.getItem("theme") == "light" ? logo : logodark } />
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
