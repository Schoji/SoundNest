/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './Store.css';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const backend_address = 'http://localhost:5000';

export default function Katalog() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const Fetch = () => {
    fetch(`${backend_address}/api/products/`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  function toCreateItem() {
    console.log("XD")
  }
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        {data.map((value) => (
          <div className="product">
            {value.item_path === '/' ? (
              <img src={default_album} />
            ) : (
              <img src={`data:image/jpeg;base64,${value.item_path}`} />
            )}
            <h1>{value.album}</h1>
            <p>{value.artist}</p>
            <p className="product desc">{value.desc}</p>
            <button
              onClick={() => {
                navigate(`/item/${value.id}`, { replace: true });
              }}
            >
              Learn more
            </button>
          </div>
        ))}
        <Button
            variant="contained"
            className="addStudio"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => {
              navigate("/createitem", { replace: true });
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
      </div>
      <BottomBar />
    </div>
  );
}
