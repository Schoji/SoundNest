import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";

import '.././App.css';
import './Item.css';
import "../Components/MultiLang"

import { backend_address } from '../Components/Global';
import default_album from "../../../assets/album.png"

import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import { Button, Skeleton } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { emitCustomEvent } from 'react-custom-events';

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
  const [productData, setProductData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [userProductsIDs, setUserProductsIDs] = useState([])
  const [userProducts, setUserProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const { item_id } = useParams()
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getProduct = () => {
    fetch(backend_address + "/api/products_with_tags/" + item_id)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error("Connection refused.")
    })
    .then((d) => setProductData(d))
    .catch((error) => {
      console.log(error)
      setProductData(false)
    })
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
    getProduct();
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
        {productData && userProducts.length > 0 ?
        <div className="item" id="item">
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
              {productData.item_path !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${productData.item_path}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h2>{productData.album}</h2>
              <h3>{productData.artist}</h3>
              <p>{productData.desc}</p>
              <p>
                {productData.tags != undefined ? JSON.parse((JSON.stringify(productData.tags))).map((tag, index) => {
                  if (index != JSON.parse((JSON.stringify(productData.tags))).length - 1) return tag + ", "
                  else return tag
                }) : null}</p>
              <h3>
                {productData.price === undefined ? productData.price : productData.price.toFixed(2)}$
              </h3>
              <Button
              disabled={sessionStorage.getItem("hasKey") == "false" ||
              (JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(productData.id)) != -1) ||
              (userProductsIDs.indexOf(parseInt(productData.id)) != -1) ? true : false}
              onClick={addToCart}>
                {sessionStorage.getItem("hasKey") == "false" ? "Demo" :
                JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(productData.id)) != -1 ? "In cart" :
                userProductsIDs.indexOf(parseInt(productData.id)) != -1 ? "Owned" : t("addToCart")}
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
        </div>
        :
        <div className="item">
          <div className="itemTitle">
            <Skeleton animation="wave" variant="rounded" width={"50px"} height={"50px"} />
            <Skeleton animation="wave" variant="rounded" width={"250px"} height={"50px"} />
          </div>
          <div className="itemDesc">
            <Skeleton animation="wave" variant="rounded" width={"275px"} height={"275px"} />
            <Skeleton animation="wave" variant="rounded" width={"200px"} height={"40px"} />
            <Skeleton animation="wave" variant="rounded" width={"220px"} height={"30px"} />
            <Skeleton animation="wave" variant="rounded" width={"275px"} height={"50px"} />
            <Skeleton animation="wave" variant="rounded" width={"200px"} height={"30px"} />
            <div className='kobuch'>
              <Skeleton animation="wave" variant="rounded" width={"100px"} height={"30px"} />
            </div>
            <Skeleton animation="wave" variant="rounded" width={"275px"} height={"40px"} />
          </div>
          <div className="itemTracks">
            {[...Array(10)].map((element, index) =>
              <div className="track">
               <Skeleton animation="wave" variant="rounded" width={"25px"} height={"50px"} />
               <Skeleton animation="wave" variant="rounded" width={"20px"} height={"30px"} sx={{marginLeft: "10px"}}/>
               <Skeleton animation="wave" variant="rounded" width={"150px"} height={"35px"} />
               <Skeleton animation="wave" variant="rounded" width={"150px"} height={"35px"} />
               <Skeleton animation="wave" variant="rounded" width={"150px"} height={"35px"} />
              </div>
            )}
          </div>
          <div className="itemTitle">
            <Skeleton animation="wave" variant="rounded" width={"50px"} height={"50px"} />
            <Skeleton animation="wave" variant="rounded" width={"250px"} height={"50px"} />
          </div>
        </div>
        }
      </div>
    </div>
  );
}
