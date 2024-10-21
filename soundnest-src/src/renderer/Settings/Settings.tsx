import TopBar from '.././TopBar/TopBar';
import SideBar from ".././SideBar/SideBar";
import React, { useState, useEffect } from "react";
import '.././App.css';
import './Settings.css'
import BottomBar from '../BottomBar/BottomBar';
const backend_address = "http://localhost:5000"
import Toggle from "react-toggle";

export const Theme = () => {
  var dark;
  if (sessionStorage.getItem("theme") == "dark") {
    sessionStorage.setItem("theme", "dark");
    dark = true
  }
  else {
    sessionStorage.setItem("theme", "light");
    dark = false
  }
  const [isDark, setIsDark] = useState(dark);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      sessionStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark")
      sessionStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
  <Toggle
      className="DarkToggle"
      checked={isDark}
      onChange={event => setIsDark(event.target.checked)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode"
    />
  )
}

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
                  <Theme />
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
