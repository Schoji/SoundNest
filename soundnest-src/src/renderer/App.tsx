/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import './TopBar/TopBar.css';
import Studios from './Studio/Studios';
import Katalog from './Store/Store';
import Library from './Library/Library';
import Settings from './Settings/Settings';
import CreateStudio from './Studio/CreateStudio';
import Item from './Store/Item';
import EditStudio from './Studio/EditStudio';
import AdminPanel from './Admin/AdminPanel';
import Regulamin from './Regulamin/reg';
import CreateItem from './Store/CreateItem';
import Cart from './Cart/Cart';
import PurchaseHistory from './Cart/PurchaseHistory';
import LoginWindow from './Login/LoginWindow';
import Tradeoffers from './User/TradeOffers';
import { useEffect, useState } from 'react';

export function GetCreds() {
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
      console.log("creds updated")
    })
  }, [])
  return <Katalog/>
}
import Studio from './Studio/Studio';
import User from './User/User';
import TradeOffer from './User/TradeOffer';

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
      console.log("creds updated")
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
          <Route path="katalog" element={<Katalog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user/:user_id" element={<User />} />
          <Route path="tradeoffer/:user_id" element={<TradeOffer/>} />
          <Route path="createstudio" element={<CreateStudio />} />
          <Route path="createitem" element={<CreateItem />} />
          <Route path="item/:item_id" element={<Item />} />
          <Route path="editstudio/:studio_id" element={<EditStudio />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="Regulamin" element={<Regulamin />} />
          <Route path="cart" element={<Cart />} />
          <Route path="purchasehistory" element={<PurchaseHistory />} />
          <Route path="tradeoffers" element={<Tradeoffers/>} />
        </Routes>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<LoginWindow/>} />
        </Routes>
      </Router>
    )
  }
}
