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
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import "./TradeOffer.css"
import { Button, IconButton } from '@mui/material';
import { ArrowBackIosRounded } from '@mui/icons-material';
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function DecideTradeOffers() {
  const { trade_id } = useParams();
  console.log(trade_id)
  const navigate = useNavigate();
  const [userTrade, setUserTrade] = useState(null);

  const getUserTrade = () => {
    fetch(backend_address + "/api/user_tradeoffers/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then(response => {
      var trade
      response.map((element, index) => {
        if (element.trade_id === trade_id) {
          trade = element
        }
      })
      setUserTrade(trade)
      console.log(trade)
    })
    .catch((error) => console.log(error))
  }

  const AcceptTrade = () => {
    fetch(backend_address + "/api/exchange_products/" + userTrade.trade_id)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch((error) => console.log(error))
    navigate("/tradeoffers/", {replace: true})
  }
  const DeclineTrade = () => {
    fetch(backend_address + "/api/exchange_products/" + userTrade.trade_id + "/", {method: "DELETE"})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch((error) => console.log(error))
    navigate("/tradeoffers/", {replace: true})
  }
  useEffect(() => {
    getUserTrade();
  },[]);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="itemTitle">
            <IconButton
              onClick={() => {
                navigate('/tradeoffers', { replace: true });
              }}
            >
              <ArrowBackIosRounded />
            </IconButton>
                <h1>Studio details</h1>
              </div>
        {userTrade ?
          <div>
            <p>Trade id: {userTrade.trade_id}</p>
            <p>Trade from:</p>
            <div>
              <img
                src={`data:image/jpeg;base64,${userTrade.user.pic}`}
                alt="Loading..."
              />
              <p>{userTrade.user.name} {userTrade.user.surname}</p>
            </div>
            <div className='layout'>
              <div>
                <p>You get</p>
                {userTrade?.sent_items.map((trade, index) => (
                  <div>
                    <img
                        src={`data:image/jpeg;base64,${trade.picture}`}
                        alt="Loading..."
                    />
                    <p>{trade.album} by {trade.artist}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>You give</p>
                {userTrade?.received_items.map((trade, index) => (
                  <div>
                    <img
                        src={`data:image/jpeg;base64,${trade.picture}`}
                        alt="Loading..."
                    />
                    <p>{trade.album} by {trade.artist}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='layout'>
              <Button variant='contained' color='success' onClick={AcceptTrade}>Accept</Button>
              <Button variant='contained' color='error' onClick={DeclineTrade}>Decline</Button>
            </div>
          </div>
        : null}
      </div>
      <BottomBar />
    </div>

  );
}
