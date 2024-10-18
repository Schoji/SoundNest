import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import './Store.css'
import default_album from "../../../assets/album.png"
import BottomBar from '../BottomBar/BottomBar';
const backend_address = "http://localhost:5000"

export default function Katalog() {
  const [data, setData] = useState([]);
  const Fetch = () => {

    fetch(backend_address + "/api/products/")
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => {
      console.log(error)
    })
    console.log(data)
  }
  useEffect(() => {
    Fetch();
  }, []);


  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar/>
        <div className='main'>
        {data.map((value, key) =>
            <div className='product'>
              {value.item_path == "/" ? <img src={default_album}></img> : <img src={`data:image/jpeg;base64,${value.item_path}`} />}
              <h1>{value.album}</h1>
              <p>{value.artist}</p>
              <p className="product desc">{value.desc}</p>
              <button>Learn more</button>
            </div>
          )}
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
