import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import Button from '@mui/material/Button';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import "./TradeOffer.css"
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Tradeoffer() {
  const { user_id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userProducts1, setuserProducts1] = useState(null);
  const [userProducts2, setuserProducts2] = useState(null);

  const [userInfo1, setUserInfo1] = useState(null);
  const [userInfo2, setUserInfo2] = useState(null);

  const [myItems, setMyItems] = useState([]);
  const [theirItems, setTheirItems] = useState([]);

  const [tradeToken, setTradeToken] = useState(null)

  const getUserInfo1 = () => {
    fetch(backend_address + "/api/users/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then((data) => setUserInfo1(data))
    .catch((error) => console.log(error))
  }

  const getUserInfo2 = () => {
    fetch(backend_address + "/api/users/" + user_id)
    .then(response => response.json())
    .then((data) => setUserInfo2(data))
    .catch((error) => console.log(error))
  }


  const getUserProducts1 = () => {
    fetch(backend_address + "/api/userproducts/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then((data) => setuserProducts1(data))
    .catch((error) => console.log(error))
  }

  const getUserProducts2 = () => {
    fetch(backend_address + "/api/userproducts/" + user_id)
    .then(response => response.json())
    .then((data) => setuserProducts2(data))
    .catch((error) => console.log(error))
  }

  function sendTradeOffer() {
    console.log("Trade offer function.")
    if (myItems?.length < 1 && theirItems?.length < 1) {
      console.log("idiot")
      return null
    }
      console.log("Getting unique token")
      fetch(backend_address + "/api/trade_token/")
      .then(response => response.json())
      .then((data) => {
        console.log(data.uuid)
        if (myItems.length > 0) {
          myItems.map((item, index) => {
            console.log("Query number:", index)
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                trade_id: data.uuid,
                id_sender: userInfo1.id,
                id_receiver: userInfo2.id,
                id_item_sent: item.id,
                id_item_received: null
              })
            }
            fetch(backend_address + "/api/trade_offers/", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch((error) => console.log(error))
          })
        }
        if (theirItems.length > 0) {
          theirItems.map((item, index) => {
            console.log("Query number:", index)
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                trade_id: data.uuid,
                id_sender: userInfo1.id,
                id_receiver: userInfo2.id,
                id_item_sent: null,
                id_item_received: item.id
              })
            }
            fetch(backend_address + "/api/trade_offers/", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch((error) => console.log(error))
          })
        }
      })
      .catch((error) => console.log(error))
      navigate("/store", {replace: true})
  }

  useEffect(() => {
    getUserProducts1();
    getUserProducts2();
    getUserInfo1();
    getUserInfo2();
  }, [user_id]);

  useEffect(() => {
    console.log("my items: ", myItems)
    console.log("their items: ", theirItems)
  },[myItems])

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className='layout'>
          <div>
            <h1>{t("user1Products")}:</h1>

            {userInfo1?.avatar_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${userInfo1?.avatar_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <p>{userInfo1?.name} {userInfo1?.surname}</p>
              <div className='itemList'>
            {userProducts1?.map((product, index) => (
              <div onClick={() => {
                var dataset = {
                  id: product.id,
                  album: product.album,
                  artist: product.artist,
                  item_path: product.item_path
                }
                if (sessionStorage.getItem("tradeoffer_mine") === undefined) {
                  sessionStorage.setItem("tradeoffer_mine", "")
                }
                if (document.getElementById(`image-${product.id}`)?.classList.contains("selected")) {
                  document.getElementById(`image-${product.id}`)?.classList.remove("selected")
                  sessionStorage.setItem("tradeoffer_mine", sessionStorage.getItem("tradeoffer_mine")?.replaceAll(`${product.id};`, ''))

                  setMyItems(myItems.filter((item) => {return item.id != product.id}))

                }
                else {
                  document.getElementById(`image-${product.id}`)?.classList.add("selected")
                  sessionStorage.setItem("tradeoffer_mine", sessionStorage.getItem("tradeoffer_mine") + product.id + ";")
                  if (myItems === undefined || myItems === null) {
                    setMyItems([dataset])
                  }
                  else {
                    setMyItems(myItems => [...myItems, dataset])
                  }
                }
              }}>
                {product.item_path !== '/' ? (
                <img
                  id={`image-${product.id}`}
                  src={`data:image/jpeg;base64,${product.item_path}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <p>{product.album}</p>
              </div>
            ))}
            </div>
          </div>
          <div>
          <h1>{t("user2Products")}:</h1>
          {userInfo2?.avatar_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${userInfo2?.avatar_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <p>{userInfo2?.name} {userInfo2?.surname}</p>
              <div className='itemList'>
              {userProducts2?.map((product, index) => (
              <div onClick={() => {
                var dataset = {
                  id: product.id,
                  album: product.album,
                  artist: product.artist,
                  item_path: product.item_path
                }
                if (sessionStorage.getItem("tradeoffer_theirs") === undefined) {
                  sessionStorage.setItem("tradeoffer_theirs", "")
                }
                if (document.getElementById(`image_theirs-${product.id}`)?.classList.contains("selected")) {
                  document.getElementById(`image_theirs-${product.id}`)?.classList.remove("selected")
                  sessionStorage.setItem("tradeoffer_theirs", sessionStorage.getItem("tradeoffer_theirs")?.replaceAll(`${product.id};`, ''))
                  setTheirItems(theirItems.filter((item) => {return item.id != product.id}))
                }
                else {
                  document.getElementById(`image_theirs-${product.id}`)?.classList.add("selected")
                  sessionStorage.setItem("tradeoffer_theirs", sessionStorage.getItem("tradeoffer_theirs") + product.id + ";")
                  if (theirItems === undefined || theirItems === null) {
                    setTheirItems([dataset])
                  }
                  else {
                    setTheirItems(theirItems => [...theirItems, dataset])
                  }
                }

              }}>
                {product.item_path !== '/' ? (
                <img
                  id={`image_theirs-${product.id}`}
                  src={`data:image/jpeg;base64,${product.item_path}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <p>{product.album}</p>
              </div>
            ))}
            </div>
          </div>
          <div>
            <h1>{t("youGive")}</h1>
              <div className='itemList'>
              {myItems?.length > 0 ? myItems?.map((item, index) => (
                <div>
                  <img
                    // src={`data:image/jpeg;base64,${merged.item_path[merged.id.findIndex((element) => element == parseInt(item))]}`}
                    src={`data:image/jpeg;base64,${item.item_path}`}
                    alt="Loading..."
                  />
                  <p>{item.album}</p>
                </div>
              )): null}
            </div>
          </div>
          <div>
            <h1>{t("youGet")}</h1>
            <div className='itemList'>
              {theirItems?.length > 0 ? theirItems?.map((item, index) => (
                <div>
                  <img
                    // src={`data:image/jpeg;base64,${merged.item_path[merged.id.findIndex((element) => element == parseInt(item))]}`}
                    src={`data:image/jpeg;base64,${item.item_path}`}
                    alt="Loading..."
                  />
                  <p>{item.album}</p>
                </div>
              )): null}
            </div>
          </div>
        </div>
        <CacheProvider value={cache}>
          <div className='felix'>
          <Button variant='contained' onClick={sendTradeOffer}>
            {t("sendTradeoffer")}
          </Button>
        </div>
        </CacheProvider>
      </div>
    </div>
  );
}
