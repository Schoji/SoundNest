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
import { useNavigate } from 'react-router-dom';
import { Box, Button, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import UpdateUserInfo from '../Components/UpdateUserInfo';
import "../Components/MultiLang.ts"
import { useTranslation } from 'react-i18next';
const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Store() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { t } = useTranslation()
  const Fetch = () => {
    fetch(`${backend_address}/api/products/`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    Fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addToCart(item_id) {
    const cart_items = JSON.parse(`[${sessionStorage.getItem('cart')}]`);
    console.log('Cart status', cart_items);
    if (cart_items.indexOf(parseInt(item_id)) === -1) {
      sessionStorage.setItem(
        'cart',
        `${sessionStorage.getItem('cart')},${item_id}`,
      );
      navigate(0);
    } else {
      console.log('Item is present, ignoring...');
    }
  }

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        {data ?
        <div className="store">
          <h1>{t('store')}</h1>
          <Button
            onClick={() => {
              navigate("/createitem", { replace: true });
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          <div className="storeProducts">
            {data?.map((value) => (
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
                  <h3>{value.price.toFixed(2)}$</h3>
                  <Button
                    onClick={() => {
                      navigate(`/item/${value.id}`, { replace: true });
                    }}
                  >
                    {t("viewDetails")}
                  </Button>
                  <IconButton
                    onClick={() => {
                      addToCart(value.id);
                    }}
                  >
                    <ShoppingCartRoundedIcon />
                  </IconButton>
                </CacheProvider>
              </div>
            ))}
          </div>
        </div>
        :
        <div>
          <Skeleton animation="wave" variant="rounded" width={800} height={600} />
        </div>}
      </div>
    </div>
  );
}
