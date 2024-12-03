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
import nothing from "../../../assets/nothing.jpg";

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Tradeoffers() {
  const navigate = useNavigate();
  const [userTrades, setUserTrades] = useState([]);
  const [userTradeSent, setUserTradeSent] = useState([]);
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

  const getUserSentTrades = () => {
    fetch(backend_address + "/api/user_senttradeoffers/" + sessionStorage.getItem("id"))
    .then(response => {
      if (response.ok) {
        return response
      }
      return Promise.reject(response)
    })
    .then(response => response.json())
    .then((data) => setUserTradeSent(data))
    .catch((error) => console.log(error))
  }

  const AcceptTrade = (trade_id) => {
    fetch(backend_address + "/api/exchange_products/" + trade_id)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(() => getUserTrades())
    .catch((error) => console.log(error))
  }

  const DeclineTrade = (trade_id) => {
    fetch(backend_address + "/api/exchange_products/" + trade_id + "/", {method: "DELETE"})
    .then(response => response.json())
    .then(response => console.log(response))
    .then(() => getUserTrades())
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserTrades();
    getUserSentTrades();
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
            <div className={trade.status == "pending" ? "tradeObj" : trade.status == "accepted" ? "tradeObj overlayAccepted" : "tradeObj overlayDeclined"}>
              {trade.status != "pending" ?
              <div className='overlayText'> <h1>{trade.status == "accepted" ? "Accepted" : trade.status == "declined" ? "Declined" : "Canceled"}</h1> </div>
              : null}
              <p>
                <img
                    src={`data:image/jpeg;base64,${trade.user.pic}`}
                    alt="Loading..."
                /><span onClick={() => navigate(`/user/${trade.user.id}`)} className='username'>{trade.user.name} {trade.user.surname}</span> offered you ({Date(trade.date).replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}):
              </p>
                <div className='itemRows'>

                {trade.sent_items.length > 0 ? trade.sent_items?.map((sent_item, index) => (
                  <div className='dropdown'>
                    <img
                      src={`data:image/jpeg;base64,${sent_item.picture}`}
                      alt="Loading..."
                      onClick={() => navigate(`/item/${sent_item.id}`)}
                    />
                    <div className='itemDescription'>
                      <div className='itemDescriptionLayout'>
                        <img
                          src={`data:image/jpeg;base64,${sent_item.picture}`}
                          alt="Loading..."
                          onClick={() => navigate(`/item/${sent_item.id}`)}
                        />
                        <p>{sent_item.album} by {sent_item.artist} {sent_item.price.toFixed(2)}$</p>
                      </div>
                    </div>
                  </div>
                 )):
                 <img
                  src={nothing}
                  alt="Loading..."
                />
                 }
                </div>
                <p>
                <img
                    src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`}
                    alt="Loading..."
                /> for your:
                </p>
                <div className='itemRows'>

                {trade.received_items.length > 0 ? trade.received_items?.map((received_item, index) => (
                  <div className='dropdown'>
                    <img
                      src={`data:image/jpeg;base64,${received_item.picture}`}
                      alt="Loading..."
                      onClick={() => navigate(`/item/${received_item.id}`)}
                    />
                    <div className='itemDescription'>
                      <div className='itemDescriptionLayout'>
                          <img
                            src={`data:image/jpeg;base64,${received_item.picture}`}
                            alt="Loading..."
                            onClick={() => navigate(`/item/${received_item.id}`)}
                          />
                          <p>{received_item.album} by {received_item.artist} {received_item.price.toFixed(2)}$</p>
                        </div>
                    </div>
                  </div>
                    // {/* <p>{received_item.album} by {received_item.artist}</p> */}
                ))
                :
                <img
                  src={nothing}
                  alt="Loading..."
                />
                }
                </div>
                {/* <Button variant='contained' onClick={() => navigate(`/decidetradeoffers/${trade.trade_id}`)}>View</Button> */}
                {trade.status == "pending" ?
                  <div className='buttons'>
                    <Button variant='contained' color='success' onClick={() => AcceptTrade(trade.trade_id)}>Accept</Button>
                    <Button variant='contained' color='error' onClick={() => DeclineTrade(trade.trade_id)}>Decline</Button>
                  </div>
                : null}
              </div>
          ))}
        </div>
        ): <p>{t("noPendingTradeoffers")}</p>}
        {/* trade offer sent by user */}
        {userTradeSent.length > 0 ?(
        <div className="tradeList">
          {userTradeSent.length > 0 && userTradeSent?.map((trade, index) => (
            <div className={trade.status == "pending" ? "tradeObj overlayPending" : trade.status == "accepted" ? "tradeObj overlayAccepted" : "tradeObj overlayDeclined"}>
              <div className='overlayText'> <h1>{trade.status == "accepted" ? "Accepted" : trade.status == "declined" ? "Declined" : trade.status == "pending" ? "Pending" : "Canceled"}</h1> </div>
              <p>
                <img
                    src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`}
                    alt="Loading..."
                />
                You offered:
              </p>
                <div className='itemRows'>

                {trade.sent_items.length > 0 ? trade.sent_items?.map((sent_item, index) => (
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
                 )):
                 <img
                  src={nothing}
                  alt="Loading..."
                />
                 }
                </div>
                <p>
                <img
                    src={`data:image/jpeg;base64,${trade.user.pic}`}
                    alt="Loading..."
                />
                <span onClick={() => navigate(`/user/${trade.user.id}`)} className='username'>for {trade.user.name} {trade.user.surname}'s items:</span>({Date(trade.date).replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3')}):
                </p>
                <div className='itemRows'>

                {trade.received_items.length > 0 ? trade.received_items?.map((received_item, index) => (
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
                ))
                :
                <img
                  src={nothing}
                  alt="Loading..."
                />
                }
                </div>
              </div>
          ))}
        </div>
        ): null}
      </div>
    </div>

  );
}
