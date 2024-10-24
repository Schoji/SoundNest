/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable import/order */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './Studio.css';
import React, { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

const backend_address = 'http://localhost:5000';

export default function Studio() {
  const navigate = useNavigate();
  function toCreateStudio() {
    navigate('/createstudio', { replace: true });
  }
  const [data, setData] = useState([]);
  const Fetch = () => {
    fetch(`${backend_address}/api/studios/`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line array-callback-return
    data.map((value) => {
      if (value.id_user === sessionStorage.getItem('id')) {
        returnik = (
          <div className="myStudio">
            {value.studio_dir === '/' ? (
              <img src={default_album} />
            ) : (
              <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
            )}
            <h2>{value.name}</h2>
            <p>{value.desc}</p>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/editstudio/${value.id}`, { replace: true });
              }}
            >
              Edit
            </Button>
          </div>
        );
      }
    });
    return returnik;
  }

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="studios">
          <h1>My Studios</h1>
          <RenderData />
          <Button
            variant="contained"
            className="addStudio"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={toCreateStudio}
          >
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          <h1>Other Studios</h1>
          <div className="otherStudios">
            {data.map((value) => (
              <div className="studio">
                {value.studio_dir === '/' ? (
                  <img src={default_album} />
                ) : (
                  <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
                )}
                <h3>{value.name}</h3>
                <p>{value.desc}</p>
                <Button variant="contained">LEARN MORE</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
