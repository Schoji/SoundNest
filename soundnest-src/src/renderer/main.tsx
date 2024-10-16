import TopBar from './topbar';
import SideBar from "./sidebar";
import React, { useState, useEffect } from "react";
import './App.css';
import default_album from "../../assets/album.png"
const backend_address = "http://localhost:5000"

export default function Main() {
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
      <div className='topbar'>
        <TopBar />
      </div>
      <div className='content'>
        <div className='sidebar'>
          <SideBar />
        </div>
        <div className='main'>
        {data.map((value, key) =>
            <div className='product'>
              {value.item_path == "/" ? <img src={default_album}></img> : null}
              <h1>{value.album}</h1>
              <p>{value.artist}</p>
              <p className="product desc">{value.desc}</p>
              <button>Learn more</button>
            </div>
          )}
        </div>
      </div>
      <div className='bottombar'>
          <h1>123</h1>
      </div>
    </div>
  );
}
