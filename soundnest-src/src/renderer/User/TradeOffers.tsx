import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import React, { useState, useEffect } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import "./TradeOffer.css"
import { useTranslation } from 'react-i18next';
import '../Components/MultiLang'
import { backend_address } from '../Components/global';
import { Button } from '@mui/material';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Tradeoffers() {
  const navigate = useNavigate();
  const [userTrades, setUserTrades] = useState([]);
  const [userTradeHistory, setUserTradeHistory] = useState([]);
  const { t } = useTranslation();

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
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>{t("tradeOffers")}</h1>
        {userTrades.length > 0 ?(
        <div className="tradeList">
          {userTrades.length > 0 && userTrades?.map((trade, index) => (
            <div className='tradeObj'>
              {/* Trade from: */}
              <p>
                <img
                    src={`data:image/jpeg;base64,${trade.user.pic}`}
                    alt="Loading..."
                />{trade.user.name} {trade.user.surname} offered:
              </p>
                <div className='itemRows'>

                {trade.sent_items?.map((sent_item, index) => (
                  <div className='dropdown'>
                    <img
                      src={`data:image/jpeg;base64,${sent_item.picture}`}
                      alt="Loading..."
                      onClick={() => navigate(`/item/${sent_item.id}`)}
                    />
                    <div className='itemDescription'>
                      <p>{sent_item.album}</p>
                      <p>by</p>
                      <p>{sent_item.artist}</p>
                    </div>
                  </div>
                 ))}
                </div>
                <p>
                <img
                    src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`}
                    alt="Loading..."
                /> for your:
                </p>
                <div className='itemRows'>

                {trade.received_items?.map((received_item, index) => (
                  <div className='dropdown'>
                    <img
                      src={`data:image/jpeg;base64,${received_item.picture}`}
                      alt="Loading..."
                      onClick={() => navigate(`/item/${received_item.id}`)}
                    />
                    <div className='itemDescription'>
                      <p>{received_item.album}</p>
                      <p>by</p>
                      <p>{received_item.artist}</p>
                    </div>
                  </div>
                    // {/* <p>{received_item.album} by {received_item.artist}</p> */}
                ))}
                </div>
                <Button variant='contained' onClick={() => navigate(`/decidetradeoffers/${trade.trade_id}`)}>View</Button>
                <Button variant='contained' color='success'>Accept</Button>
                <Button variant='contained' color='error'>Decline</Button>
              </div>
          ))}
        </div>
        ): <p>{t("noPendingTradeoffers")}</p>}
        <h1>{t("historyTradeoffer")}</h1>
        <div>
          {userTradeHistory.length > 0 ?
            <table>
              <tr>
                {/* <th>Trade</th> */}
                <th>{t("trader")}</th>
                <th>{t("yourItems")}</th>
                <th>{t("traderItems")}</th>
                <th>{t("date")}</th>
              </tr>
              {userTradeHistory.map((trade, index) => (
                <tr>
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
          : <p>{t("noPreviousTrades")}</p> }
        </div>
      </div>
    </div>

  );
}
