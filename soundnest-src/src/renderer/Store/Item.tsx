import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import default_album from "../../../assets/album.png"
import BottomBar from '../BottomBar/BottomBar';
import { useParams } from 'react-router-dom';
import { Button, Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material';
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
              <Button key={key} onClick={() => {
                //BUG
                console.log(value.id)
                      navigate(`/item/${value.id}`, { replace: true });
                    }}>Learn more</Button>
            </div>
          )}
    </div>
  )
}

export default function Item() {
  const [data, setData] = useState({});
  const [trackData, setTrackData] = useState([]);
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
  const getTracks = () => {
    fetch(backend_address + "/api/producttracks/" + item_id)
    .then(response => response.json())
    .then((d) => setTrackData(d))
    .catch((error) => {
      console.log("ERRORR")
      console.log(error)
    })
  }

  useEffect(() => {
    Fetch();
    getTracks();
  }, []);

  function trackInfo() {
    var timestamps: any[] = []
    var timestampsStr = ["0:00"]
    trackData.map((track, index) => {
      var nextTime;
      if (index == 0) {
        nextTime = track.length
        timestamps.push(nextTime)
      }
      else {
        nextTime = timestamps[index - 1] + track.length;
        timestamps.push(nextTime)
      }
        let minutes = Math.floor(nextTime / 60)
        let seconds = timestamps[index] % 60

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
    const value = trackData.map((track, index) => (
      <TableRow>
        <TableCell>
          <p> {timestampsStr[index] + " - " + timestampsStr[index + 1]} </p>
        </TableCell>
        <TableCell>
          <p> {track.name}</p>
        </TableCell>
        <TableCell>
          <p> {track.producer} </p>
        </TableCell>
      </TableRow>
    ))
    return (
      <TableContainer component={Paper}>
        <Table>
          {value}
        </Table>
      </TableContainer>
    )
  }

  function addToCart() {
    let cart_items = JSON.parse("[" + sessionStorage.getItem('cart') + "]")
    console.log("Cart status", cart_items);
    if (cart_items.indexOf(parseInt(item_id)) == -1) {
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
                {trackInfo()}
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
