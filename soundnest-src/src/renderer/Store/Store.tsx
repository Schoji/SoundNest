import { useState, useEffect } from 'react';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './Store.css';
import default_album from '../../../assets/album.png';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import "../Components/MultiLang.ts"
import { useTranslation } from 'react-i18next';
import { emitCustomEvent } from 'react-custom-events';
import { backend_address } from '../Components/global';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Store() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [userProductsIDs, setUserProductsIDs] = useState(JSON.parse(`[${sessionStorage.getItem('cart')}]`))
  const [userProducts, setUserProducts] = useState(null);
  const [cartItems, setCartItems] = useState([])
  const { t } = useTranslation()
  const Fetch = () => {
    fetch(`${backend_address}/api/products/`)
      .then((response) => response.json())
      .then((d) => setProducts(d))
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserProducts = () => {
    fetch(`${backend_address}/api/userproducts/${sessionStorage.getItem("id")}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        if (response.status == 404) {
          setUserProducts(true)
          throw new Error("User has no products.")

        }
      })
      .then((data) => {
        var productIDs = []
        data.map((product, index) => {
          productIDs.push(product.id)
        })
        setUserProductsIDs(productIDs)
        setUserProducts(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    setCartItems(JSON.parse(`[${sessionStorage.getItem('cart')}]`))
    Fetch();
    getUserProducts();
  }, []);
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
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        {products && userProducts?
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
            {products?.map((value) => (
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
                    disabled={sessionStorage.getItem("hasKey") == "false" || (JSON.parse("[" + sessionStorage.getItem('cart') + "]").indexOf(parseInt(value.id)) != -1) || (userProductsIDs.indexOf(parseInt(value.id)) != -1) ? true : false}
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

        <div className="store">
          <h1>{t('store')}</h1>
          <div className="storeProducts">
          {[...Array(12)].map((element, index) =>
            <div className="storeProductLoading">
              <div className="kobuch">
                <Skeleton animation="wave" variant="rounded" width={"240px"} height={"240px"} />
              </div>
              <Skeleton animation="wave" variant="rounded" width={"210px"} height={"40px"} />
              <Skeleton animation="wave" variant="rounded" width={"180px"} height={"20px"} />
              <Skeleton animation="wave" variant="rounded" width={"215px"} height={"60px"} />
              <div className='kobuch'>
                <Skeleton animation="wave" variant="rounded" width={"70px"} height={"30px"} />
              </div>
              <div className='kobuch'>
                <Skeleton animation="wave" variant="rounded" width={"130px"} height={"40px"} />
                <Skeleton animation="wave" variant="rounded" width={"70px"} height={"40px"} />
              </div>
              <div className='margin'></div>
            </div>
            )}
          </div>
        </div>
        }
      </div>
    </div>
  );
}
