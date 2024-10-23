import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import './Store.css'
import default_album from "../../../assets/album.png"
import BottomBar from '../BottomBar/BottomBar';
import { useParams } from 'react-router-dom';
const backend_address = "http://localhost:5000"

export default function Item() {
  const [data, setData] = useState([]);
  const { item_id } = useParams()

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


  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar/>
        <div className='main'>
          Gieura
          {JSON.stringify(data)}
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
