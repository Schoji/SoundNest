import TopBar from './topbar';
import SideBar from "./sidebar";
import './App.css';
import React, { useState, useEffect } from "react";
const backend_address = "http://localhost:5000"

export default function Katalog() {
  function Logout() {
    sessionStorage.clear()
  }
  function SessionStorage(event) {

    event.preventDefault();
    const Fetch = () => {
      fetch(backend_address + "/api/users/" + event.target.username.value + "/" + event.target.password.value)
      .then(response => response.json())
      .then((data) => {
        if (data.length == 0) {
          console.log("user not found")
        }
        else {
          console.log("User found")
          console.log(JSON.stringify(data))
          sessionStorage.clear()
          sessionStorage.setItem("id", data["id"])
          sessionStorage.setItem("username", data["username"])
          sessionStorage.setItem("name", data["name"])
          sessionStorage.setItem("surname", data["surname"])
          sessionStorage.setItem("email", data["email"])
          sessionStorage.setItem("prefered_theme", data["prefered_theme"])
          sessionStorage.setItem("credits", data["credits"])
          window.location.replace("/")//can replace with login-successful or something
        }
      })
      .catch((error) => {
        console.log(error)
      })

    }
    Fetch();
  }
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
          <div>
          <h1>Login</h1>
          <form onSubmit={SessionStorage} >
            <input name='username' placeholder="username" defaultValue="johndoe123"/>
            <input name='password' type="password" placeholder="password" defaultValue="P@ssw0rd123"/>
            <input type="submit" />
          </form>
          </div>
          <div>
          <h1>Logout</h1>
          <form onSubmit={Logout} >
            <input type="submit" value="logout"/>
          </form>
          </div>
        </div>
      </div>
      <div className='bottombar'>
          <h1>Basket</h1>
      </div>
    </div>
  );
}
