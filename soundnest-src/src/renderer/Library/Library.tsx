/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../App.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import BottomBar from '../BottomBar/BottomBar';
import default_album from '../../../assets/album.png';

import './Library.css';

const backend_address = 'http://localhost:5000';

export default function Library() {
  const [data, setData] = useState([]);
  const Fetch = () => {
    fetch(`${backend_address}/api/userproducts/${sessionStorage.getItem('id')}`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    // console.log(data)
  };
  useEffect(() => {
    Fetch();
  }, []);
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="library">
          <div className="header">
            {sessionStorage.getItem('id') === null ? (
              <h1>There is nothing to see here</h1>
            ) : (
              <h1>
                Library of: {sessionStorage.getItem('name')}{' '}
                {sessionStorage.getItem('surname')}
              </h1>
            )}
          </div>

          <div className="albums">
            {data.map((value, key) => (
              <div className="product">
                {value.item_path === '/' ? (
                  <img src={default_album} />
                ) : (
                  <img src={`data:image/jpeg;base64,${value.item_path}`} />
                )}
                <h1>{value.album}</h1>
                <p>{value.artist}</p>
                <p className="product desc">{value.desc}</p>
                {
                  // eslint-disable-next-line react/button-has-type
                  <button>Learn more</button>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
