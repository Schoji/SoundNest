import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBar from '../TopBar/TopBar';
import SideBar from "../SideBar/SideBar";
import '.././App.css';
import './Studio.css';
import React, { useState, useEffect } from "react";
import default_album from "../../../assets/album.png";
import BottomBar from '../BottomBar/BottomBar';
const backend_address = "http://localhost:5000";
import Button from "@mui/material/Button";
import { Input, TextField, FormControl, IconButton} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function CreateStudio() {
  const navigate = useNavigate()
  function AddStudio(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        "id_user" : sessionStorage.getItem("id"),
        "name" : event.target.name.value,
        "desc" : event.target.desc.value
      })
  };
  fetch(backend_address + "/api/studios/", requestOptions)
        .then(response => response.json())
        .then(response => console.log(response))
  navigate("/Studio", {replace:true})
}
  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar />
        <div className='main'>
          <div className='studios'>
            <div className='myStudio'>
              <IconButton color='primary' onClick={() => {navigate("/Studio", {replace:true})}}>
                <ArrowBackIosIcon/>
              </IconButton>
              <h1>Create your studio</h1>
            </div>
            <div className='studioForm'>
              <form onSubmit={AddStudio}>
              <FormControl>
                <img src={default_album}></img>
                <TextField type="file" />
                <TextField id="name" label="Name" variant="outlined"/>
                <TextField id="desc" label="Description" variant="outlined"/>
                <Button variant="outlined" type="submit">Create studio</Button>
              </FormControl>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
