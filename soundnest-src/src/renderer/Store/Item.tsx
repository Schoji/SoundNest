import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import default_album from "../../../assets/album.png"
import BottomBar from '../BottomBar/BottomBar';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import './Item.css';
const backend_address = "http://localhost:5000";
import { useNavigate } from 'react-router-dom';

export function OtherItems() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  const Fetch = () => {
    fetch(backend_address + "/api/products/")
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => {
      console.log("ERRORR")
      console.log(error)
    })
  }
  useEffect(() => {
    Fetch();
  }, []);
  return (
    <div className='OtherItems'>
    {data.map((value, key) =>
            <div className='product'>
              {value.item_path == "/" ? <img src={default_album}></img> : <img src={`data:image/jpeg;base64,${value.item_path}`} />}
              <h1>{value.album}</h1>
              <p>{value.artist}</p>
              <p className="product desc">{value.desc}</p>
              <button onClick={() => {
                navigate("/item/" + value.id, {replace:true})
              }}>Learn more</button>
            </div>
          )}
    </div>
  )
}

export default function Item() {
  const [data, setData] = useState({});
  const { item_id } = useParams()
  const navigate = useNavigate();

  const Fetch = () => {
    fetch(backend_address + "/api/product/" + item_id)
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => {
      console.log("ERRORR")
      console.log(error)
    })
  }
  useEffect(() => {
    Fetch();
  }, []);

  function addToCart() {
    let cart_items = JSON.parse("[" + sessionStorage.getItem('cart') + "]")
    console.log("Cart status", cart_items);
    if (cart_items.indexOf(parseInt(item_id)) == -1) {
      console.log("KURWA")
      console.log()
      sessionStorage.setItem('cart', sessionStorage.getItem('cart') + ',' + item_id)
      navigate(`/item/${item_id}`, { replace: true });
    }
    else {
      console.log("Item is present, ignoring...")
    }
  }

  return (
    <div className='all'>
      <TopBar />
        <SideBar/>
        <div className='main'>
          <div className="ItemSite">
            <div className="Item">
              <div className="ItemLeft">
                <img src={`data:image/jpeg;base64,${data.item_path}`} alt="Loading..."/>
              </div>

              <div className="ItemRight">
                <h1>{data.album}</h1>
                <p>by {data.artist}</p>
                <p>Description: {data.desc}</p>
                <p>{data.price}$</p>
                <Button variant='contained' onClick={addToCart}>Add to cart </Button>
              </div>
            </div>
            <div className="ItemBottom">
              <h1>Other products</h1>

                <OtherItems/>
            </div>
          </div>
        </div>
      <BottomBar/>
    </div>
  );
}
