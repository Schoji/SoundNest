/* eslint-disable jsx-a11y/alt-text */
import logo from '../../assets/logo-title.png';

function TopBar() {
  return (
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
          <input type="button" className="profileButton" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
