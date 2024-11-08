/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './Settings.css';
import BottomBar from '../BottomBar/BottomBar';
import { useNavigate, useParams, Link } from 'react-router-dom';

import logo from '../../../assets/icons/logo.png';
import logodark from '../../../assets/icons/logo-dark.png';

import logo_red from '../../../assets/icons/logo-red.png';
import logo_yellow from '../../../assets/icons/logo-yellow.png';
import logo_green from '../../../assets/icons/logo-green.png';
import logo_pink from '../../../assets/icons/logo-pink.png';

import logo_red_darker from '../../../assets/icons/logo-red-darker.png';
import logo_yellow_darker from '../../../assets/icons/logo-yellow-darker.png';
import logo_green_darker from '../../../assets/icons/logo-green-darker.png';
import logo_pink_darker from '../../../assets/icons/logo-pink-darker.png';


const backend_address = 'http://localhost:5000';

export default function Settings() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { studio_id } = useParams();
  const [pic, setPic] = useState("data:image/jpeg;base64," + String(sessionStorage.getItem("avatar_dir")));
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileBase64String, setFileBase64String] = useState("");
  const onFileChange = (e) => {
    setSelectedFile(e.target.files);

  }

  var picChanged = false;

  const encodeFileBase64 = (file) => {
    var reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result
        setFileBase64String(Base64);
      };
      reader.onerror = function (error) {
        console.log("error", error)
      }
    }
  }

function ChangePicture(event) {
    event.preventDefault();

    const cachedURL = URL.createObjectURL(event.target.files[0])
    encodeFileBase64(event.target.files[0])
    setPic(cachedURL)
    picChanged = true;
    console.log("PicChanged")
  }

  function AlterUser(event) {
    event.preventDefault();
    fetch(`${backend_address}/api/users/${sessionStorage.getItem("id")}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method:"PATCH",
      body: JSON.stringify({
        'username' : event.target.username.value,
        'name' : event.target.name.value,
        'surname' : event.target.surname.value,
        'email' : event.target.email.value,
        'avatar_dir': fileBase64String
      })
    }).catch((error) => console.log(error))


    fetch(
      `${backend_address}/api/users/${sessionStorage.getItem("id")}`
    )
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line promise/always-return
        if (data.length === 0) {
        } else {
          console.log(JSON.stringify(data));
          sessionStorage.clear();
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('surname', data.surname);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('prefered_theme', data.prefered_theme);
          sessionStorage.setItem('credits', data.credits);
          sessionStorage.setItem('avatar_dir', data.avatar_dir);
          sessionStorage.setItem('is_admin', data.is_admin);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/studio", {replace:true});
  }


  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        {sessionStorage.getItem('id') === null ? (
          <h1>Login to use settings</h1>
        ) : (
          <div className="settings">
            <div className="settingsContent">
              <div className="avatar">
                <form encType="multipart/form-data" onSubmit={AlterUser}>
                  <FormControl>
                  <img src={pic}></img>
                    <TextField id="file" type="file" onChange={ChangePicture}/>
                    <TextField id="name" label="Name" variant="outlined" defaultValue={sessionStorage.getItem('name')}/>
                    <TextField id="surname" label="Surname" variant="outlined" defaultValue={sessionStorage.getItem('surname')}/>
                    <TextField id="username" label="Username" variant="outlined" defaultValue={sessionStorage.getItem('username')}/>
                    <TextField id="email" label="Email" variant="outlined" defaultValue={sessionStorage.getItem('email')}/>
                    <TextField id="bio" label="Your bio" multiline variant="outlined" defaultValue="TODO"/>
                    <Button color="success" variant="contained" type="submit">
                      Save
                    </Button>
                    <Button color="error" variant="contained">
                      Cancel
                    </Button>
                    {sessionStorage.getItem('is_admin') ? (<div>
                      <p>You are an Admin</p>
                      <Button color="error" variant="contained">Resign from Administrator</Button>
                    </div>) : null}
                  </FormControl>
                </form>

              </div>
              <div className='setLogo'>
                <Link onClick={() => changeLogo(0)} to="/settings" className="link1">
                    <img src={sessionStorage.getItem("theme") === "light" ? logo : logodark} />
                </Link>
                <Link onClick={() => changeLogo(1)} to="/settings" className="link1">
                    <img src={sessionStorage.getItem("theme") === "light" ? logo_red : logo_red_darker}/>
                </Link>
                <Link onClick={() => changeLogo(2)} to="/settings" className="link1">
                    <img src={sessionStorage.getItem("theme") === "light" ? logo_yellow : logo_yellow_darker}/>
                </Link>
                <Link onClick={() => changeLogo(3)} to="/settings" className="link1">
                    <img src={sessionStorage.getItem("theme") === "light" ? logo_green : logo_green_darker}/>
                </Link>
                <Link onClick={() => changeLogo(4)} to="/settings" className="link1">
                    <img src={sessionStorage.getItem("theme") === "light" ? logo_pink : logo_pink_darker} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomBar />
    </div>
  );
}

// function changeLogo(logoValue) {
//   if (logoValue === 1) {
//     sessionStorage.setItem("logo", "1");
//   }
//   else if(logoValue === 2) {
//     sessionStorage.setItem("logo", "2");
//   }
//   else if(logoValue === 3) {
//     sessionStorage.setItem("logo", "3");
//   }
// }
function changeLogo(logoValue) {
  sessionStorage.setItem("logo", logoValue);
}
