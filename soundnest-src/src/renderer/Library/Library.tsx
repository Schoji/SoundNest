/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../App.css';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import default_album from '../../../assets/album.png';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import './Library.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../Components/MultiLang'
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Library() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation()
  const Fetch = () => {
    fetch(backend_address + "/api/userproducts/" + sessionStorage.getItem('id'))
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
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="library">
          <h1>{t("yourLibrary")}</h1>
          {data.length > 0?
          <div className="libraryAlbums">
            {data.map((value) => (
              <div className="libraryProduct">
                <CacheProvider value={cache}>
                  <div className="libraryProductImage">
                    {value.item_path === '/' ? (
                      <img src={default_album} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${value.item_path}`} />
                    )}
                  </div>
                  <h2>{value.album}</h2>
                  <p>{value.artist}</p>
                  <p>{value.desc}</p>
                </CacheProvider>
              </div>
            ))}
          </div>
          : <p>You have no owned products.</p>}
        </div>
      </div>
    </div>
  );
}
