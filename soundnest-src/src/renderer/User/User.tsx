import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { replace, useNavigate, useParams } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang"

const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function User() {
  const { user_id } = useParams();
  const { t } = useTranslation();
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
              <h1>{t("userDetails")}</h1>
            </div>
            <div className="itemDesc">
              {data.avatar_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${data.avatar_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h2>{data.name}</h2>
              <h2>{data.surname}</h2>
              <p>{data.bio}</p>
              <Button
              disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
              onClick={() => {
                navigate(`/tradeoffer/${data.id}`, {replace: true})
              }}>
                {t("tradeOffer")}
              </Button>
            </div>
          </CacheProvider>
        </div>
        : null
        }
        { studio_data ?
        <div>
          {studio_data.map((studio, index) => (
            <div className="itemDesc">
              {studio.studio_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${studio.studio_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h2>{studio.name}</h2>
              <p>{studio.desc}</p>
              <Button onClick={() => navigate("/studios/" + studio.id, { replace: true })}>{t("checkout")}</Button>
            </div>
          ))}
        </div>
        : null }
      </div>
    </div>
  );
}
