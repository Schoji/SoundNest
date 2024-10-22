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
import { Input, TextField } from '@mui/material';

import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function CreateStudio() {

  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar />
        <div className='main'>
          <div className='studios'>
            <div className='myStudio'>
              <h1>Create your studio</h1>
            </div>
            <div className='studioForm'>
              <img src={default_album}></img>
              <TextField type="file" />
              <TextField id="outlined-basic" label="Name" variant="outlined"/>
              <TextField id="outlined-basic" label="Description" variant="outlined"/>
              <Button variant="outlined">Create studio</Button>
            </div>
          </div>
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
