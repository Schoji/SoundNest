/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, NavLink, Outlet, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import './TopBar.css';
import Main from './main';
import TopBar from './topbar';
import SideBar from "./sidebar";
import Katalog from './katalog';
const backend_address = "http://localhost:5000"
import default_album from "../../assets/album.png"
export function Content() {
  return <h1>Siema</h1>;
}

export default function Library() {
  const [data, setData] = useState([]);
  const Fetch = () => {
    fetch(backend_address + "/api/userproducts/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then((d) => setData(d))
    .catch((error) => {
      console.log(error)
    })
    console.log(data)
  }
  useEffect(() => {
    console.log(data)
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
          <div className="library">
            <div className="header">
              {sessionStorage.getItem("id") === null ? <h1>There is nothing to see here</h1> : <h1>Library of: {sessionStorage.getItem("name")} {sessionStorage.getItem("surname")}</h1>  }
              </div>

            <div className="albums">
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
        </div>
      </div>
      <div className='bottombar'>
        <Content />
      </div>
    </div>
  );
}
