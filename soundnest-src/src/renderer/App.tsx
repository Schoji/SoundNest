/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import './TopBar/TopBar.css';
import Studios from './Studio/Studios';
import Store from './Store/Store';
import Library from './Library/Library';
import Settings from './Settings/Settings';
import CreateStudio from './Studio/CreateStudio';
import Item from './Store/Item';
import EditStudio from './Studio/EditStudio';
import AdminPanel from './Admin/AdminPanel';
import Statute from './Statute/Statute';
import CreateItem from './Store/CreateItem';
import Cart from './Cart/Cart';
import PurchaseHistory from './Cart/PurchaseHistory';
import LoginWindow from './Login/LoginWindow';
import Tradeoffers from './User/TradeOffers';
import { useEffect, useState } from 'react';
import Studio from './Studio/Studio';
import User from './User/User';
import TradeOffer from './User/TradeOffer';
import DecideTradeOffers from './User/DecideTradeOffers';
import AddFunds from './User/AddFunds';
import RegisterWindow from './Register/Register';
import WelcomeWindow from './Welcome/Welcome';
import { useTranslation } from 'react-i18next';
import "./Components/MultiLang";
import BuyKey from './User/BuyKey';
import Mousetrap from 'mousetrap';

export function GetCreds() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  Mousetrap.unbind("ctrl+1")
  Mousetrap.unbind("ctrl+2")
  Mousetrap.unbind("ctrl+3")
  Mousetrap.unbind("ctrl+4")
  Mousetrap.unbind("ctrl+5")
  Mousetrap.bind("ctrl+1", () => {
    navigate("/library", {replace: true})
  })
  Mousetrap.bind("ctrl+2", () => {
    navigate("/studios", {replace: true})
  })
  Mousetrap.bind("ctrl+3", () => {
    navigate("/store", {replace: true})
  })
  Mousetrap.bind("ctrl+4", () => {
    navigate("/tradeoffers", {replace: true})
  })
  if (sessionStorage.getItem("is_admin") == "true") {
    Mousetrap.bind("ctrl+5", () => {
      navigate("/adminpanel", {replace: true})
    })
  }
  if (sessionStorage.getItem("hasKey") == "false") {
    Mousetrap.bind("ctrl+5", () => {
      navigate("/buykey", {replace: true})
    })
  }
  useEffect(() => {
    window.electron.ipcRenderer.on("soundnest-ipc", async (arg) => {
      const userInfo = JSON.parse(arg)
      sessionStorage.setItem('id', userInfo.id);
      sessionStorage.setItem('username', userInfo.username);
      sessionStorage.setItem('name', userInfo.name);
      sessionStorage.setItem('surname', userInfo.surname);
      sessionStorage.setItem('email', userInfo.email);
      sessionStorage.setItem('prefered_theme', userInfo.prefered_theme);
      sessionStorage.setItem('bio', userInfo.bio);
      if (userInfo.prefered_theme == 0) {
        document.documentElement.classList.add("dark")
        sessionStorage.setItem("theme", "dark")
      }
      else {
        document.documentElement.classList.remove("dark")
        sessionStorage.setItem("theme", "light")
      }
      sessionStorage.setItem('credits', userInfo.credits);
      sessionStorage.setItem('avatar_dir', userInfo.avatar_dir);
      sessionStorage.setItem('is_admin', userInfo.is_admin);
      sessionStorage.setItem('cart', '0');
      sessionStorage.setItem("logo", "0")
      sessionStorage.setItem("lang", userInfo.lang)
      sessionStorage.setItem("hasKey", userInfo.hasKey)
      i18n.changeLanguage(userInfo.lang)
    })
  }, [])
  return <Store/>
}


export default function App() {
  const view = String(global.location.search).slice(-1)
  useEffect(() => {
    window.electron.ipcRenderer.on("soundnest-ipc", async (arg) => {
      const userInfo = JSON.parse(arg)
      sessionStorage.setItem('id', userInfo.id);
      sessionStorage.setItem('username', userInfo.username);
      sessionStorage.setItem('name', userInfo.name);
      sessionStorage.setItem('surname', userInfo.surname);
      sessionStorage.setItem('email', userInfo.email);
      sessionStorage.setItem('prefered_theme', userInfo.prefered_theme);
      sessionStorage.setItem('credits', userInfo.credits);
      sessionStorage.setItem('avatar_dir', userInfo.avatar_dir);
      sessionStorage.setItem('is_admin', userInfo.is_admin);
      sessionStorage.setItem('cart', '0');
      if (userInfo.prefered_theme == 0) {
        document.documentElement.classList.add("dark")
        sessionStorage.setItem("theme", "dark")
      }
      else {
        document.documentElement.classList.remove("dark")
        sessionStorage.setItem("theme", "light")
      }
    })
  }, [])
  if (parseInt(view) == 1) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GetCreds/>} />
          <Route path="library" element={<Library />} />
          <Route path="studios" element={<Studios />} />
          <Route path="studios/:studio_id" element={<Studio />} />
          <Route path="store" element={<Store />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user/:user_id" element={<User />} />
          <Route path="tradeoffer/:user_id" element={<TradeOffer/>} />
          <Route path="createstudio" element={<CreateStudio />} />
          <Route path="createitem" element={<CreateItem />} />
          <Route path="item/:item_id" element={<Item />} />
          <Route path="editstudio/:studio_id" element={<EditStudio />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="statute" element={<Statute />} />
          <Route path="cart" element={<Cart />} />
          <Route path="purchasehistory" element={<PurchaseHistory />} />
          <Route path="tradeoffers" element={<Tradeoffers/>} />
          <Route path="decidetradeoffers/:trade_id" element={<DecideTradeOffers/>} />
          <Route path="add_funds" element={<AddFunds/>} />
          <Route path="buykey" element={<BuyKey/>} />
        </Routes>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeWindow/>} />
          <Route path='/register' element={<RegisterWindow/>} />
          <Route path='/login' element={<LoginWindow/>} />
        </Routes>
      </Router>
    )
  }
}
