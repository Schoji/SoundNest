import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import './Settings.css'
import default_album from "../../../assets/album.png"
import BottomBar from '../BottomBar/BottomBar';
import { session } from 'electron';
const backend_address = "http://localhost:5000"

export default function Settings() {

  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar/>
        <div className='main'>
        {sessionStorage.getItem('id') === null ? (
          <h1>Login to use settings</h1>
        ) : (
          <div className="settings">
            <div className='settingsContent'>
              <div className="avatar">
                <div className='avatarIMG'>
                  <img src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`} className='avatarIMG' />
                </div>
                <div className="userdata">
                  <h1>{sessionStorage.getItem("name")} {sessionStorage.getItem("surname")}</h1>
                </div>
                <div className="userdata">
                  <h1>{sessionStorage.getItem("username")} </h1>
                </div>
                <div className="userdata">
                  <h1>{sessionStorage.getItem("email")} </h1>
                </div>
                <div className="userdata">
                  {sessionStorage.getItem("prefered_theme") == 0 ? <h1>Dark theme</h1> : <h1>Light theme</h1>}
                </div>
              </div>
            </div>
          </div>
        )
      }
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
