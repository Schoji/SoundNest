/* eslint-disable jsx-a11y/alt-text */
import BasicMenu from './Menu';
import LogoChange from '../Settings/SetLogo';
import SearchBar from './SearchBar';
import { IconButton } from '@mui/material';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import { useNavigate } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const cache = createCache({
  key: 'css',
  prepend: true,
});

function TopBar() {
  const navigate = useNavigate()
  return (
    <CacheProvider value={cache}>
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
          <IconButton className='profileFundsButton'
          disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
          onClick={() => {navigate("/add_funds", {replace: true})}}>
            <AddCardRoundedIcon fontSize='small' />
          </IconButton>
          <div className="walletValueDiv">
            <p>{parseFloat(sessionStorage.getItem('credits')).toFixed(2)}$</p>
          </div>
          <div className="profileButtonDiv">
            <BasicMenu/>
          </div>
        </div>
      </div>
    </div>
    </CacheProvider>
  );
}

export default TopBar;
