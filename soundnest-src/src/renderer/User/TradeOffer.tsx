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

export default function Tradeoffer() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [userProducts1, setuserProducts1] = useState(null);
  const [userProducts2, setuserProducts2] = useState(null);

  const [userInfo1, setUserInfo1] = useState(null);
  const [userInfo2, setUserInfo2] = useState(null);

  const [myItems, setMyItems] = useState(null);
  const [theirItems, setTheirItems] = useState(null);

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

  useEffect(() => {
    getUserProducts1();
    getUserProducts2();
    getUserInfo1();
    getUserInfo2();
  }, [user_id]);

  var merged = {id : [], item_path : [], album : [], artist : []}
  useEffect(() => {
    console.log("my items: ", myItems)
    merged = {id : [], item_path : [], album : [], artist : []}
    userProducts1?.map((product, index) => {
      merged.id.push(product.id)
      merged.album.push(product.album)
      merged.artist.push(product.artist)
      merged.item_path.push(product.item_path)
    })
    console.log(merged.item_path[merged.id.findIndex((element) => element == 4)])
    // console.log(merged.item_path[merged.id.findINd])
    // myItems?.slice(0, -1).split(";").map((element) => {
    //   console.log(element)
    // })
    // if (userProducts1 !== undefined && userProducts1 !== null) {
    //   console.log(userProducts1[1]?.item_path)
    // }
  },[myItems])

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className='layout'>
          <div>
            <h1>User 1 products:</h1>

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
                if (sessionStorage.getItem("tradeoffer_mine") === undefined) {
                  sessionStorage.setItem("tradeoffer_mine", "")
                }
                if (document.getElementById(`image-${product.id}`)?.classList.contains("selected")) {
                  document.getElementById(`image-${product.id}`)?.classList.remove("selected")
                  sessionStorage.setItem("tradeoffer_mine", sessionStorage.getItem("tradeoffer_mine")?.replaceAll(`${product.id};`, ''))

                }
                else {
                  document.getElementById(`image-${product.id}`)?.classList.add("selected")
                  sessionStorage.setItem("tradeoffer_mine", sessionStorage.getItem("tradeoffer_mine") + product.id + ";")
                }
                setMyItems(sessionStorage.getItem("tradeoffer_mine"))
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
              </div>
            ))}
            </div>
          </div>
          <div>
          <h1>User 2 products:</h1>
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
                if (sessionStorage.getItem("tradeoffer_theirs") === undefined) {
                  sessionStorage.setItem("tradeoffer_theirs", "")
                }
                if (document.getElementById(`image_theirs-${product.id}`)?.classList.contains("selected")) {
                  document.getElementById(`image_theirs-${product.id}`)?.classList.remove("selected")
                  sessionStorage.setItem("tradeoffer_theirs", sessionStorage.getItem("tradeoffer_theirs")?.replaceAll(`${product.id};`, ''))

                }
                else {
                  document.getElementById(`image_theirs-${product.id}`)?.classList.add("selected")
                  sessionStorage.setItem("tradeoffer_theirs", sessionStorage.getItem("tradeoffer_theirs") + product.id + ";")
                }
                setTheirItems(sessionStorage.getItem("tradeoffer_theirs"))
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
              </div>
            ))}
            </div>
          </div>
          <div>
            <h1>You get</h1>
            {myItems?.length > 0 ? myItems?.slice(0, -1)?.split(";")?.map((item, index) => (
              <img
                // src={`data:image/jpeg;base64,${merged.item_path[merged.id.findIndex((element) => element == parseInt(item))]}`}
                src={`data:image/jpeg;base64,${merged.item_path[0]}`}
                alt="Loading..."
              />
            )): null}
          </div>
          <div>
            <h1>You lose</h1>
          </div>
        </div>
        <CacheProvider value={cache}>
          <div className='felix'>
          <Button>
            Send Tradeoffer
          </Button>
        </div>
        </CacheProvider>
      </div>
      <BottomBar />
    </div>
  );
}
