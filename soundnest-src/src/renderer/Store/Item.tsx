import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import '.././App.css';
import default_album from "../../../assets/album.png"
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, Paper, Skeleton, Table, TableCell, TableContainer, TableRow } from '@mui/material';
import './Item.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang"
import { backend_address } from '../Components/global';
import { emitCustomEvent } from 'react-custom-events';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export function OtherItems() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const location = useLocation();
  const { hash, pathname, search } = location;
  const currentItemID = pathname.replace("/item/", "")

  const Fetch = () => {
    fetch(backend_address + "/api/other_products/" + currentItemID + "/5")
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => console.log(error))
  }
  useEffect(() => {
    Fetch();
  }, [currentItemID]);

  function changeSite(id) {
    navigate("/item/" + id + "/", { replace: true});
    //weird behaviour
  }
  return (
    <div className='otherItems'>
    {data?.map((value, key) =>
            value.id != currentItemID ?
            <div className="product">
              <div className="productImage">
                {value.item_path === '/' ? (
                  <img src={default_album} />
                ) : (
                  <img src={`data:image/jpeg;base64,${value.item_path}`} />
                )}
              </div>
              <h2>{value.album}</h2>
              <h4>{value.artist}</h4>
              <p>{value.desc}</p>
              <Button key={key}
              onClick={() => {
                document.getElementById("item")?.scrollIntoView({ behavior: 'smooth' });
                      changeSite(value.id);
                    }}>{t("viewDetails")}</Button>
            </div> : null
          )}
    </div>
  )
}

export default function Item() {
  const [data, setData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [userProductsIDs, setUserProductsIDs] = useState([])
  const [userProducts, setUserProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const { item_id } = useParams()
  const navigate = useNavigate();
  const { t } = useTranslation();

  const Fetch = () => {
    fetch(backend_address + "/api/products_with_tags/" + item_id)
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => console.log(error))
  }
  const getTracks = () => {
    fetch(backend_address + "/api/producttracks/" + item_id)
    .then(response => response.json())
    .then((d) => setTrackData(d))
    .catch((error) => console.log(error))
  }

  const getUserProducts = () => {
    fetch(`${backend_address}/api/userproducts/${sessionStorage.getItem("id")}`)
      .then(response => {
        if (response.ok) return response.json()
          throw new Error("User has no products.")
      })
      .then((data) => {
        var productIDs = []
        data.map((product, index) => {
          productIDs.push(product.id)
        })
        console.log(productIDs)
        setUserProductsIDs(productIDs)
        setUserProducts(data)
      })
      .catch((error) => {
        console.log(error);
        setUserProducts([{}]);
      });
  }

  useEffect(() => {
    Fetch();
    getTracks();
    getUserProducts()

  }, [item_id]);
  useEffect(() => {
    setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')}]`))
  },[])

  function trackInfo() {
    const timestamps: any[] = [];
    const timestampsStr = ['0:00'];
    trackData?.map((track, index) => {
      var nextTime;
      if (index == 0) {
        nextTime = track.length
        timestamps.push(nextTime)
      }
      else {
        nextTime = timestamps[index - 1] + track.length;
        timestamps.push(nextTime)
      }
        const minutes = Math.floor(nextTime / 60)
        const seconds = timestamps[index] % 60

        let timestamp = String(minutes) + ":"
        if (seconds < 10) {
          timestamp += "0" + String(seconds)
        }
        else {
          timestamp += String(seconds);
        }
        timestampsStr.push(timestamp);
    }
    )
    const value = trackData?.map((track, index) => (
      <div className="track">
        <div> </div>
        <p> {index+1} </p>
        <p> {track.name}</p>
        <p> {track.producer} </p>
        <p> {`${timestampsStr[index]} - ${timestampsStr[index + 1]}`} </p>
      </div>
    ))
    return <div className="itemTracks">{value}</div>;
  }

  function addToCart() {
    setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')}]`));
    console.log('Cart status', cartItems);
    if (cartItems.indexOf(parseInt(item_id)) === -1) {
      var fasterCart = JSON.parse(`[${sessionStorage.getItem('cart')},${item_id}]`)
      setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')},${item_id}]`));
      sessionStorage.setItem(
        'cart',
        `${sessionStorage.getItem('cart')},${item_id}`,
      );
      emitCustomEvent("updateCart", fasterCart)
    } else {
      console.log('Item is present, ignoring...');
    }
  }
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        {data && userProducts.length > 0 ?
        <div className="item" id="item">
          <CacheProvider value={cache}>
            <div className="itemTitle">
              <IconButton
                onClick={() => {
                  navigate('/store', { replace: true });
                }}
              >
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <h1>{t("albumDetails")}</h1>
            </div>
            <div className="itemDesc">
              {data.item_path !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${data.item_path}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h2>{data.album}</h2>
              <h3>{data.artist}</h3>
              <p>{data.desc}</p>
              <p>
                {data.tags != undefined ? JSON.parse((JSON.stringify(data.tags))).map((tag, index) => {
                  if (index != JSON.parse((JSON.stringify(data.tags))).length - 1) return tag + ", " // siedziałem nad tym jebanym, skurwynyśkim gównem przez 30 minut a wystarczyło dać returna, rozpierdole ten program w chuj
                  else return tag
                }) : null}</p>
              <h3>
                {data.price === undefined ? data.price : data.price.toFixed(2)}$
              </h3>
              <Button
              disabled={sessionStorage.getItem("hasKey") == "false" ||
              (JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(data.id)) != -1) ||
              (userProductsIDs.indexOf(parseInt(data.id)) != -1) ? true : false}
              onClick={addToCart}>
                {sessionStorage.getItem("hasKey") == "false" ? "Demo" :
                JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(data.id)) != -1 ? "In cart" :
                userProductsIDs.indexOf(parseInt(data.id)) != -1 ? "Owned" : t("addToCart")}
                </Button>
            </div>
            {trackInfo()}
            <div className="itemTitle">
              <IconButton
                onClick={() => {
                  navigate('/store', { replace: true });
                }}
              >
                <AlbumRoundedIcon />
              </IconButton>
              <h1>{t("otherProducts")}</h1>
            </div>
            <OtherItems />
          </CacheProvider>
        </div>
        :
        // todo
        <Box>
          <Skeleton variant="rounded" width={1000} height={500} />
        </Box>

        }
      </div>
    </div>
  );
}
