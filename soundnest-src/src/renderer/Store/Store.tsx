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
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

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
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="store">
          <h1>Store</h1>
          <Button
            onClick={() => {
              navigate("/createitem", { replace: true });
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          <div className="storeProducts">
            {data.map((value) => (
              <div className="storeProduct">
                <CacheProvider value={cache}>
                  <div className="storeProductImage">
                    {value.item_path === '/' ? (
                      <img src={default_album} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${value.item_path}`} />
                    )}
                  </div>
                  <h2>{value.album}</h2>
                  <p>{value.artist}</p>
                  <p>{value.desc}</p>
                  <Button
                    onClick={() => {
                      navigate(`/item/${value.id}`, { replace: true });
                    }}
                  >
                    Learn more
                  </Button>
                </CacheProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
