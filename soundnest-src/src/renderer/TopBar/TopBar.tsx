/* eslint-disable jsx-a11y/alt-text */
import BasicMenu from './Menu';
import Logo from '../Settings/Logo';
import SearchBar from './SearchBar';
import { IconButton } from '@mui/material';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import { useNavigate } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { backend_address } from '../Components/global';
import { useCustomEventListener } from 'react-custom-events';
const cache = createCache({
  key: 'css',
  prepend: true,
});

function TopBar() {
  const navigate = useNavigate()
  const credits = parseFloat(sessionStorage.getItem("credits"))
  const [funds, setFunds] = useState(credits)

  function updateCredits() {
    fetch(backend_address + "/api/users/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then(data => {
      setFunds(data.credits)
      sessionStorage.setItem("credits", data.credits)
    })
    .catch(error => console.log(error))
  }
  useCustomEventListener("updateTopBar", () => {
    updateCredits();
  })
  return (
    <CacheProvider value={cache}>
    <div className="topbar">
      <div className="topBarContent">
        <div className="iconDiv">
          <Logo/>
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
            <p>{funds ? parseFloat(funds).toFixed(2) : credits.toFixed(2)}$</p>
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
