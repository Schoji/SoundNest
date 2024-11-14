/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable import/order */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import React, { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import "./TradeOffer.css"
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Tradeoffers() {
  const navigate = useNavigate();
  const [userTrades, setUserTrades] = useState(null);

  const getUserTrades = () => {
    fetch(backend_address + "/api/user_tradeoffers/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then((data) => setUserTrades(data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserTrades();
  },[]);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>Tradeoffers</h1>
        <div className="tradeList">
          {userTrades?.map((trade, index) => (
            <div className='tradeObj'>
              <div>
                <p>Trade from: </p>
                  <img
                      src={`data:image/jpeg;base64,${trade.user.pic}`}
                      alt="Loading..."
                  />
                  <p>{trade.user.name} {trade.user.surname}</p>
              </div>
              <div>
                <p>Items that you will receive:</p>
                {trade.received_items.map((received_item, index) => (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${received_item.picture}`}
                      alt="Loading..."
                    />
                    <p>{received_item.album} {received_item.artist}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>Items that you will give:</p>
                {trade.sent_items.map((sent_item, index) => (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${sent_item.picture}`}
                      alt="Loading..."
                    />
                    <p>{sent_item.album} {sent_item.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
