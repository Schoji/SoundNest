import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

import '../App.css';
import './Library.css';
import '../Components/MultiLang'

import { backend_address } from '../Components/Global';
import default_album from '../../../assets/album.png';

import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';

export default function Library() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Loading")
  const navigate = useNavigate();
  const { t } = useTranslation()
  const Fetch = () => {
    fetch(backend_address + "/api/userproducts/" + sessionStorage.getItem('id'))
      .then((response) => {
        if (response.ok) {
          setStatus("OK")
        }
        if (response.status === 404) {
          setStatus("No resource")
          console.log(status)
        }
        return response.json()
      })
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
        setStatus("No connection")
      });
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
          {status == "OK" ?
          <div className="libraryAlbums">
            {data.map((value) => (
              <div className="libraryProduct" onClick={() => navigate(`/item/${value.id}`)}>
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
              </div>
            ))}
          </div>
          : status == "No resource" ?
          <p>{t("noProducts")}</p>
          :
          <div className="libraryAlbums">
            {[...Array(6)].map((element, index) =>
            <div className="libraryProductLoading">
              <div className='libraryProductImage'>
                <Skeleton variant="rectangular" animation="wave" width={"300px"} height={"300px"}/>
              </div>
              <Skeleton variant="rectangular" animation="wave" height={"60px"}/>
              <Skeleton variant="rectangular" animation="wave" height={"40px"}/>
              <Skeleton variant="rectangular" animation="wave" height={"70px"}/>
            </div>
           )}
          </div>
          }
        </div>
      </div>
    </div>
  );
}
