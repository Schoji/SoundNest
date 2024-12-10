import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

import '../App.css';
import './Studio.css';
import "../Components/MultiLang"

import default_album from '../../../assets/album.png';
import { backend_address } from '../Components/Global';

import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Skeleton } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { emitCustomEvent } from 'react-custom-events';

export default function Studio() {
  const { studio_id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [sp_data, sp_setData] = useState({})
  const [otherStudiosData, setOtherStudiosData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [userProductsIDs, setUserProductsIDs] = useState(JSON.parse(`[${sessionStorage.getItem('cart')}]`))

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

  const getUserProducts = () => {
    fetch(`${backend_address}/api/userproducts/${sessionStorage.getItem("id")}`)
      .then((response) => response.json())
      .then((data) => {
        var productIDs = []
        data.map((product, index) => {
          productIDs.push(product.id)
        })
        setUserProductsIDs(productIDs)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')}]`))
    getStudio();
    getStudiosProducts();
    getOtherStudios();
  }, [studio_id]);

  function addToCart(item_id) {
    setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')}]`));
    console.log('Cart status', cartItems);
    if (cartItems.indexOf(parseInt(item_id)) === -1) {
      var fasterCart = JSON.parse(`[${sessionStorage.getItem('cart')},${item_id}]`)
      setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')},${item_id}]`));
      sessionStorage.setItem(
        'cart',
        `${sessionStorage.getItem('cart')},${item_id}`,
      );
      emitCustomEvent("updateCart", fasterCart)
    } else {
      console.log('Item is present, ignoring...');
    }
  }


  function changeSite(id) {
    navigate("/studios/" + id + "/", { replace: true});
    //weird behaviour
  }

  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
      {Object.keys(data).length > 1 ?
        <div className="studioMain">
            <h1>{t("studioDetails")}</h1>
            <div className='studioDetails'>
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
              <div className='studioOwner'>
                <h3>{t("studioOwned")}:</h3>
                {data.user_picture !== '/' ? (
                  <img
                    src={`data:image/jpeg;base64,${data.user_picture}`}
                    alt="Loading..."
                  />
                ) : (
                  <img src={default_album} />
                )}
                <h2>{data.user_name} {data.user_surname}</h2>
                <Button onClick={() => navigate("/user/" + data.id_user, { replace: true })}>{t("viewProfile")}</Button>
              </div>
            </div>
            <h1>{t("studioAlbums")}</h1>
            {Object.keys(sp_data).length > 1 ?
            <div className='studioAlbums'>
              {sp_data.map((product, index) => (
                <div className="studioAlbum">
                  <div className="studioAlbumImage">
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
                    {t("viewDetails")}
                  </Button>
                  <IconButton
                    disabled={sessionStorage.getItem("hasKey") == "false" ||
                    (JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(product.id)) != -1) ||
                    (userProductsIDs.indexOf(parseInt(product.id)) != -1) ? true : false}
                    onClick={() => {
                      addToCart(product.id);
                    }}
                  >
                    <ShoppingCartRoundedIcon />
                  </IconButton>
              </div>
              ))}
            </div>
            :
            <div className='studioAlbums'>
            {[...Array(4)].map((element, index) =>
              <div className='studioAlbum'>
                <div className='studioAlbumImage'>
                  <Skeleton animation="wave" variant="rounded" width={"250px"} height={"250px"} />
                </div>
                <Skeleton animation="wave" variant="rounded" width={"100px"} height={"40px"} />
                <Skeleton animation="wave" variant="rounded" width={"125px"} height={"40px"} />
                <Skeleton animation="wave" variant="rounded" width={"75px"} height={"40px"} />
                <div className='kobuch'>
                  <Skeleton animation="wave" variant="rounded" width={"50px"} height={"40px"} />
                </div>
                <Skeleton animation="wave" variant="rounded" width={"225px"} height={"40px"} />
              </div>
            )}
          </div>

            }
            <h1>{t("otherStudios")}</h1>
            <div className='otherStudios2'>
              {otherStudiosData?.map((studio, key) => (
                <div className="otherStudio">
                  <div className="otherStudioImage">
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
                        }}>{t("viewDetails")}</Button>
                </div>
                    ))}
              </div>
        </div>
        :
        <div className='studioMainSkeleton'>
          <h1>{t("studioDetails")}</h1>
          <div className='studioDetails'>
            <Skeleton id="imageSkeleton" animation="wave" variant="rounded" width={"300px"} height={"300px"} />
            <Skeleton animation="wave" variant="rounded" width={"350px"} height={"50px"} />
            <Skeleton animation="wave" variant="rounded" width={"600px"} height={"50px"} />
            <div className='studioOwner'>
              <Skeleton id="skeletonH3" animation="wave" variant="rounded" width={"140px"} height={"30px"} />
              <Skeleton id="imageSkeleton2" animation="wave" variant="rounded" width={"100px"} height={"100px"} />
              <Skeleton sx={{marginLeft: "20px"}} animation="wave" variant="rounded" width={"200px"} height={"50px"} />
              <Skeleton sx={{marginLeft: "20px"}} animation="wave" variant="rounded" width={"550px"} height={"50px"} />
            </div>
          </div>
          <h1>{t("studioAlbums")}</h1>
          <div className='studioAlbums'>
            {[...Array(4)].map((element, index) =>
              <div className='studioAlbum'>
                <div className='studioAlbumImage'>
                  <Skeleton animation="wave" variant="rounded" width={"250px"} height={"250px"} />
                </div>
                <Skeleton animation="wave" variant="rounded" width={"100px"} height={"40px"} />
                <Skeleton animation="wave" variant="rounded" width={"125px"} height={"40px"} />
                <Skeleton animation="wave" variant="rounded" width={"75px"} height={"40px"} />
                <div className='kobuch'>
                  <Skeleton animation="wave" variant="rounded" width={"50px"} height={"40px"} />
                </div>
                <Skeleton animation="wave" variant="rounded" width={"225px"} height={"40px"} />
              </div>
            )}
          </div>
          <h1>{t("otherStudios")}</h1>
          <div className='otherStudios2'>
            {[...Array(4)].map((element, index) =>
            <div className="otherStudio">
              <div className='otherStudioImage'>
                <Skeleton animation="wave" variant="rounded" width={"250px"} height={"250px"} />
              </div>
              <Skeleton animation="wave" variant="rounded" width={"100px"} height={"40px"} />
              <Skeleton animation="wave" variant="rounded" width={"125px"} height={"40px"} />
              <Skeleton animation="wave" variant="rounded" width={"150px"} height={"30px"} />
            </div>
            )}
          </div>
        </div>
        }
      </div>
    </div>
  );
}
