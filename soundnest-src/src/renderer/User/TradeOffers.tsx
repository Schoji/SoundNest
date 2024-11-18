import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import React, { useState, useEffect } from 'react';
import BottomBar from '../BottomBar/BottomBar';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import "./TradeOffer.css"
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Tradeoffers() {
  const navigate = useNavigate();
  const [userTrades, setUserTrades] = useState([]);
  const [userTradeHistory, setUserTradeHistory] = useState([]);

  const getUserTrades = () => {
    fetch(backend_address + "/api/user_tradeoffers/" + sessionStorage.getItem("id"))
    .then(response => {
      if (response.ok) {
        return response
      }
      return Promise.reject(response)
    })
    .then(response => response.json())
    .then((data) => setUserTrades(data))
    .catch((error) => console.log(error))
  }
  const getUserTradeHistory = () => {
    fetch(backend_address + "/api/user_tradeoffers_history/" + sessionStorage.getItem("id"))
    .then(response => {
      if (response.ok) {
        return response
      }
      return Promise.reject(response)
    })
    .then(response => response.json())
    .then((data) => setUserTradeHistory(data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserTrades();
    getUserTradeHistory();
  },[]);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>Trade Offers</h1>
        {userTrades.length > 0 ?(
        <div className="tradeList">
          {userTrades?.map((trade, index) => (
            <div className='tradeObj'>
              {"user" in trade ?
              <div onClick={() => navigate(`/decidetradeoffers/${trade.trade_id}`)}>
                <p>Trade from: </p>
                  <img
                      src={`data:image/jpeg;base64,${trade.user.pic}`}
                      alt="Loading..."
                  />
                  <p>{trade.user.name} {trade.user.surname}</p>
                  <p>{trade.trade_id}</p>
              </div>
              : null}
              <div>
                <p>Items that you will receive:</p>
                {trade.sent_items?.map((sent_item, index) => (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${sent_item.picture}`}
                      alt="Loading..."
                    />
                    <p>{sent_item.album} by {sent_item.artist}</p>
                  </div>
                ))}
              </div>
              <div>
                <p>Items that you will give:</p>
                {trade.received_items?.map((received_item, index) => (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${received_item.picture}`}
                      alt="Loading..."
                    />
                    <p>{received_item.album} by {received_item.artist}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        ): <p>You have no pending trade offers.</p>}
        <h1>History of your trade offers</h1>
        <div>
          {userTradeHistory.length > 0 ?
            <table>
              <tr>
                {/* <th>Trade</th> */}
                <th>Trader</th>
                <th>Your items</th>
                <th>Trader's items</th>
                <th>Date</th>
              </tr>
              {userTradeHistory.map((trade, index) => (
                <tr>
                  {/* <td>{trade.trade_id}</td> */}
                  <td>{trade.user.name} {trade.user.surname}</td>
                  <td>{trade.received_items.map((item, index) => (
                    <p>
                      {item.album} {item.artist}
                    </p>
                  ))}</td>
                  <td>{trade.sent_items.map((item, index) => (
                    <p>
                      {item.album} {item.artist}
                    </p>
                  ))}</td>
                  <td>{trade.date}</td>
                </tr>
              ))}
            </table>
          : <p>You have no previous trades.</p> }
        </div>
      </div>
    </div>

  );
}
