/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable import/order */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import React, { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';

const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function TradeOffer() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [studio_data, setStudioData] = useState(null);

  const getUser = () => {
    fetch(backend_address + "/api/users/" + user_id)
    .then(response => response.json())
    .then((data) => setData(data))
    .catch((error) => console.log(error))
  }

  const getStudio = () => {
    fetch(backend_address + "/api/userstudios/" + user_id)
    .then(response => response.json())
    .then((data) => setStudioData(data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUser();
    getStudio();
  }, [user_id]);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
      <h1>Hello world</h1>
      </div>
      <BottomBar />
    </div>
  );
}
