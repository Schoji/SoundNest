import { Link, useNavigate } from 'react-router-dom';

import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import GraphicEqRoundedIcon from '@mui/icons-material/GraphicEqRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { backend_address } from '../Components/global';

import './SideBar.css';
import '../Components/MultiLang';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

export const Theme = () => {
  var dark;
  if (sessionStorage.getItem("theme") == "dark") dark = true;
  else dark = false

  const [isDark, setIsDark] = useState(dark);
  //TODO

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      document.getElementsByClassName("lightIcon")[0].classList.remove("active")
      document.getElementsByClassName("darkIcon")[0].classList.add("active")
      sessionStorage.setItem("theme", "dark");
      emitCustomEvent("changeTheme", "dark")
      emitCustomEvent("changeLogo", "dark")
      setIsDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      document.getElementsByClassName("darkIcon")[0].classList.remove("active")
      document.getElementsByClassName("lightIcon")[0].classList.add("active")
      sessionStorage.setItem("theme", "light");
      emitCustomEvent("changeTheme", "light")
      emitCustomEvent("changeLogo", "light")
      setIsDark(false)
    }

  }, [isDark]);
  return (
  <Switch
        checked={isDark}
        onChange={event => {
          setIsDark(event.target.checked)
          fetch(backend_address + "/api/switch_theme/" + sessionStorage.getItem("id"))
          .then(response => response.json())
          .catch(error => console.log(error))
        }}
        aria-label="Dark mode"
      />
  )
}

export default function SideBar() {
  const { t } = useTranslation()
  let cart = JSON.parse("[" + sessionStorage.getItem('cart') + "]").length - 1
  const [cartItems, setCartItems] = useState(cart)
  useCustomEventListener("updateCart", (items) => {
    console.log(items)
    setCartItems(items.length - 1)
  })
  //https://typeofnan.dev/using-session-storage-in-react-with-hooks/
  return (
    <div className="sidebar">
      <Link to="/library" className="sideButton">
        <div><LibraryMusicRoundedIcon /></div>
        <p>{t("library")}</p>
      </Link>
      <Link to="/studios" className="sideButton">
        <div><GraphicEqRoundedIcon /></div>
        <p>{t("studios")}</p>
      </Link>
      <Link to="/store" className="sideButton">
        <div><LocalMallRoundedIcon /></div>
        <p>{t("store")}</p>
      </Link>
      <Link to="/tradeoffers" className="sideButton">
        <div><SwapHorizRoundedIcon /></div>
        <p>{t("tradeOffers")}</p>
      </Link>
      {sessionStorage.getItem("is_admin") == "true" ? (
      <Link to="/adminpanel" className="sideButton">
        <div><ManageAccountsRoundedIcon /></div>
        <p>{t("adminPanel")}</p>
      </Link>
      ) : <div> </div>}
      {sessionStorage.getItem("hasKey") == "false" ? (
      <Link to="/buykey" className="sideButtonInverted">
        <div><LockPersonRoundedIcon /></div>
        <p>{t("getFullVersion")}</p>
      </Link>
      ) : <div> </div>}
      <div className='themeButtonDiv'>
        <div className='themeButton'>
          <LightModeRoundedIcon className='lightIcon' />
          <Theme />
          <DarkModeRoundedIcon className='darkIcon' />
        </div>
      </div>
      <Link to="/cart" className="cartButton">
        <div className="cartButtonIcon">
          <ShoppingCartRoundedIcon />
          {cartItems ? (
            <div className="cartButtonBadge"> {cartItems} </div>
          ) : null}
        </div>
        <p>{t("cart")}</p>
      </Link>
    </div>
  );
}
