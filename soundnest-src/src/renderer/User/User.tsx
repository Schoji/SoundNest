import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './User.css'
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
import { backend_address } from '../Components/global';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function User() {
  const { user_id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [studio_data, setStudioData] = useState({});

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
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
      {Object.keys(data).length > 1 ?
        <div className="user">
          <CacheProvider value={cache}>
            <h1>{t("userDetails")}</h1>
            <div className="userData">
              {data.avatar_dir !== '/' ? (
                <img
                  src={`data:image/jpeg;base64,${data.avatar_dir}`}
                  alt="Loading..."
                />
              ) : (
                <img src={default_album} />
              )}
              <h1>{data.name} {data.surname}</h1>
              <p>{data.bio}</p>
              <Button
              disabled={sessionStorage.getItem("hasKey") == "false" || data.id == sessionStorage.getItem("id") ? true : false}
              onClick={() => {
                navigate(`/tradeoffer/${data.id}`, {replace: true})
              }}>
                {t("tradeOffer")}
              </Button>
            </div>
            <h1>User Studios</h1> {/*Tutaj trzeba dodać tłumaczenie pls */}
            {Object.keys(studio_data).length > 1 ?
            <div className='userStudios'>
            {studio_data.map((studio) => (
              <div className="userStudioDetails">
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
              <Button onClick={() => navigate("/studios/" + studio.id, { replace: true })}>{t("checkout")}</Button> {/*Tutaj też do tego guzika nowy tekst*/}
              </div>
            ))}
            </div>
            : null }
          </CacheProvider>
        </div>
        :
        <div className='user'>
          <h1>{t("userDetails")}</h1>
          <div className='userData'>

          </div>
        </div>
        }
      </div>
    </div>
  );
}
