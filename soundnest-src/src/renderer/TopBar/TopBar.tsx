import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BasicMenu from './Menu';
import SearchBar from './SearchBar';
import Logo from '../Settings/Logo';

import { backend_address } from '../Components/Global';

import { IconButton } from '@mui/material';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';

import { useCustomEventListener } from 'react-custom-events';

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
  );
}

export default TopBar;
