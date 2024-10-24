/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';

const backend_address = 'http://localhost:5000';

export default function EditStudio() {
  const [data, setData] = useState({});
  const { studio_id } = useParams();
  console.log(studio_id);
  const Fetch = () => {
    fetch(`${backend_address}/api/studios/${studio_id}`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log('ERRORR');
        console.log(error);
      });
  };
  console.log(data);

  console.log(`${backend_address}/api/studios/${studio_id}`);
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="studioSettings">
          {data.studio_dir === '/' ? (
            <img src={default_album} />
          ) : (
            <img src={`data:image/jpeg;base64,${data.studio_dir}`} />
          )}
          <p>
            Studio name:
            {data.name}
          </p>

          <p>
            Studio desc:
            {data.desc}
          </p>
          <Button color="success" variant="contained">
            Save
          </Button>
          <Button color="error" variant="contained">
            Cancel
          </Button>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
