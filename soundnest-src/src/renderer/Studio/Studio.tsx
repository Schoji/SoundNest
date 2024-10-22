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
import { useNavigate } from 'react-router-dom';

import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function Studio() {
  const navigate = useNavigate()
  function toCreateStudio() {
    navigate("/createstudio", {replace:true})
  }
  const [data, setData] = useState([]);
  const Fetch = () => {

    fetch(backend_address + "/api/studios/")
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

function RenderData() {
  //   return (
  //   data.map((value) =>
  //     {value.id_user == sessionStorage.getItem('id') ? (
  //     <div className='studio'>
  //       {value.studio_dir == "/" ? <img src={default_album}></img> : <img src={`data:image/jpeg;base64,${value.studio_dir}`} />}
  //       <h1>{sessionStorage.getItem('id')}</h1>
  //       <h1>{value.name}</h1>
  //       <p>{value.desc}</p>
  //       <Button variant="contained" >Learn more</Button>
  //     </div>
  //     ) : <h1>nic</h1>}
  //   )
  // )
  let returnik;
  data.map((value) => {
    if (value.id_user == sessionStorage.getItem('id')) {
      returnik = <div className='studio'>
      {value.studio_dir == "/" ? <img src={default_album}>
      </img> : <img src={`data:image/jpeg;base64,${value.studio_dir}`} />}
      <h1>{value.name}</h1>
      <p>{value.desc}</p>
      </div>;
      }}
      )
  return(returnik)
}

  return (
    <div className='all'>
      <TopBar />
      <div className='content'>
        <SideBar />
        <div className='main'>
          <div className='studios'>
            <div className='myStudio'>
              <h1>Studios</h1>
              <div className='myStudios'>
                <RenderData/>
                <div className='studio'>
                  <Button variant='contained' className='buttonek' onClick={toCreateStudio}><FontAwesomeIcon icon={faPlus} size="2xl" beat /></Button>
                </div>
              </div>
            </div>
            <div className="lowerStudios">
              <h1>Other Studios</h1>
              <div className='otherStudios'>
              {data.map((value, key) =>
                <div className='studio'>
                  {value.studio_dir == "/" ? <img src={default_album}></img> : <img src={`data:image/jpeg;base64,${value.studio_dir}`} />}
                  <h1>{value.name}</h1>
                  <p>{value.desc}</p>
                  <Button variant="contained">LEARN MORE</Button>
                </div>
          )}
            </div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar/>
    </div>
  );
}
