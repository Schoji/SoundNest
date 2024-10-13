import TopBar from './topbar';
import SideBar from "./sidebar";
import React, { useState, useEffect } from "react";
import './App.css';
const backend_address = "http://localhost:5000"

const backend_integration = true



export default function Main() {
  const [data, setData] = useState([]);
  const Fetch = () => {

    fetch(backend_address + "/api/users/")
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
          {backend_integration ? JSON.stringify(data, null, 2) : null}
          <h1>AHAHAH</h1>
        </div>
      </div>
      <div className='bottombar'>
          <h1>123</h1>
      </div>
    </div>
  );
}
