import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import React, { useState, useEffect } from 'react';
import BottomBar from '../BottomBar/BottomBar';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import "./TradeOffer.css"
import { useTranslation } from 'react-i18next';
import '../Components/MultiLang'
const backend_address = 'http://localhost:5000';

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
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>{t("tradeOffers")}</h1>
        {userTrades.length > 0 ?(
        <div className="tradeList">
          {userTrades?.map((trade, index) => (
            <div className='tradeObj'>
              {"user" in trade ?
              <div onClick={() => navigate(`/decidetradeoffers/${trade.trade_id}`)}>
                <p>{t("tradeFrom")} </p>
                  <img
                      src={`data:image/jpeg;base64,${trade.user.pic}`}
                      alt="Loading..."
                  />
                  <p>{trade.user.name} {trade.user.surname}</p>
                  <p>{trade.trade_id}</p>
              </div>
              : null}
              <div>
                <p>{t("itemsYouReceive")}</p>
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
                <p>{t("itemsYouGive")}:</p>
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
        ): <p>{t("noPendingTradeOffers")}</p>}
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
          : <p>{t("noPreviousTrade")}</p> }
        </div>
      </div>
    </div>

  );
}
