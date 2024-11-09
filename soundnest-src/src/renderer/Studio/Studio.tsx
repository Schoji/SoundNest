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

export default function Studio() {
  const { studio_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [sp_data, sp_setData] = useState(null)
  const [otherStudiosData, setOtherStudiosData] = useState(null)

  const getStudio = () => {
    fetch(backend_address + "/api/studio_with_user/" + studio_id)
    .then(response => response.json())
    .then((data) => setData(data))
    .catch((error) => console.log(error))
  }

  const getStudiosProducts = () => {
    fetch(backend_address + "/api/studios_products/" + studio_id)
    .then(response => response.json())
    .then((data) => sp_setData(data))
    .catch((error) => console.log(error))
  }

  const getOtherStudios = () => {
    fetch(backend_address + "/api/other_studios/" + studio_id)
    .then(response => response.json())
    .then((data) => setOtherStudiosData(data))
    .catch((error) => console.log(error))
  }


  useEffect(() => {
    getStudio();
    getStudiosProducts();
    getOtherStudios();
  }, [studio_id]);

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


  function changeSite(id) {
    navigate("/studios/" + id + "/", { replace: true});
    //weird behaviour
  }

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
      {data ?
        <div className="item" id="item">
          <CacheProvider value={cache}>
            <div className="itemTitle">
              <IconButton
                onClick={() => {
                  navigate('/studios', { replace: true });
                }}
              >
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <h1>Studio details</h1>
            </div>
            <div className="itemDesc">
              {data.studio_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${data.studio_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h2>{data.name}</h2>
              <p>{data.desc}</p>
              <h2>Studio is owned by:</h2>
              {data.user_picture !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${data.user_picture}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <p>{data.user_name}</p>
              <p>{data.user_surname}</p>
              <Button onClick={() => navigate("/user/" + data.id_user, { replace: true })}>Check out</Button>
            </div>
            {sp_data ?
            <div>
              {sp_data.map((product, index) => (
                <div className="storeProduct">
                <CacheProvider value={cache}>
                  <div className="storeProductImage">
                    {product.item_path === '/' ? (
                      <img src={default_album} />
                    ) : (
                      <img src={`data:image/jpeg;base64,${product.item_path}`} />
                    )}
                  </div>
                  <h2>{product.album}</h2>
                  <p>{product.artist}</p>
                  <p>{product.desc}</p>
                  <h3>{product.price.toFixed(2)}$</h3>
                  <Button
                    onClick={() => {
                      navigate(`/item/${product.id}`, { replace: true });
                    }}
                  >
                    View details
                  </Button>
                  <IconButton
                    onClick={() => {
                      addToCart(product.id);
                    }}
                  >
                    <ShoppingCartRoundedIcon />
                  </IconButton>
                </CacheProvider>
              </div>
              ))}
            </div>
            : null }
            <div>
              <IconButton
                onClick={() => {
                  navigate('/studios', { replace: true });
                }}
              >
                <AlbumRoundedIcon />
              </IconButton>
              <h1>Other studios</h1>
              <div className='otherStudios'>
                {otherStudiosData?.map((studio, key) => (
                  <div className="product">
                    <div className="productImage">
                      {studio.studio_dir === '/' ? (
                        <img src={default_album} />
                      ) : (
                        <img src={`data:image/jpeg;base64,${studio.studio_dir}`} />
                      )}
                    </div>
                    <h2>{studio.name}</h2>
                    <p>{studio.desc}</p>
                    <Button key={key} onClick={() => {
                      document.getElementById("item")?.scrollIntoView({ behavior: 'smooth' });
                            changeSite(studio.id);
                          }}>View details</Button>
                  </div>
                      ))}
                </div>
            </div>
          </CacheProvider>
        </div>
        : null
        }
      </div>
      <BottomBar />
    </div>
  );
}
