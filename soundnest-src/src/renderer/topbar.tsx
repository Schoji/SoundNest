function TopBar() {
  return (
    <div className="topBarContent">
      <div className="iconDiv">
        <p>SoundNest</p>
      </div>
      <div className="searchInputDiv">
        <input type="text" className="searchInput" placeholder="Search" />
      </div>
      <div className="profileDiv">
        <div className="walletValueDiv">
          <p>6,9 zł</p>
        </div>
        <div className="profileButtonDiv">
          <input type="button" className="profileButton" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
