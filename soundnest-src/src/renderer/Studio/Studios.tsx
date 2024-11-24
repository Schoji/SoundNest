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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { replace, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';
import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export function AlertDialog({ studio_id }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const DeleteStudio = (studio_id) => {
    fetch(`${backend_address}/api/studios/${studio_id}`, {method: "DELETE"})
    .then(response => response.json())
    .then(() => {
      emitCustomEvent("updateStudios")
      navigate("/studios", {replace: true})
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <IconButton className="deleteButton" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small"></DeleteIcon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you really sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("studioDeletionMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='error' onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color='success' onClick={() => {
            DeleteStudio(studio_id);
            handleClose();
            }} autoFocus>
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default function Studio() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [myStudiosData, setMyStudiosData] = useState([]);
  const [otherStudiosData, setOtherStudiosData] = useState([]);
  function toCreateStudio() {
    navigate('/createstudio', { replace: true });
  }
  const getMyStudios = () => {
    fetch(`${backend_address}/api/userstudios/${sessionStorage.getItem("id")}`)
      .then((response) => {
        if (response.ok) return response.json()
      })
      .then((data) => setMyStudiosData(data))
      .catch((error) => {
        console.log(error);
      });
  };
  const getOtherStudios = () => {
    fetch(`${backend_address}/api/studios_not_from/${sessionStorage.getItem("id")}`)
      .then((response) => response.json())
      .then((data) => setOtherStudiosData(data))
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMyStudios();
    getOtherStudios();
  }, []);
  useCustomEventListener("updateStudios", () => {
    getMyStudios();
    getOtherStudios();
  })
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="studios">
        <CacheProvider value={cache}>
          <h1>{t("myStudios")}</h1>
          <Button onClick={toCreateStudio}>
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          {myStudiosData?.length > 0 ?
            <div className="myStudios">
              {myStudiosData.map((myStudio, index) => (
                <div className="myStudio">
                  <div className="myStudioImage">
                    {myStudio.studio_dir === '/' ?
                      <img src={default_album} />
                    :
                      <img src={`data:image/jpeg;base64,${myStudio.studio_dir}`} />
                    }
                    </div>
                  <h2>{myStudio.name}</h2>
                  <p>{String(myStudio.desc).split(/\s+/).filter(Boolean).length < 3 && String(myStudio.desc).length > 60 ? String(myStudio.desc).replace(/[\n\r]+/g, "")
                     .replace(/(.{10})/g, "$1\n") : myStudio.desc}</p>
                  <Button
                    className="editStudio"
                    onClick={() => {
                      navigate(`/editstudio/${myStudio.id}`, { replace: true });
                    }}
                  >
                    {t("edit")}
                  </Button>
                </div>
              ))}
            </div>
            : <CircularProgress /> }
          <h1>{t("otherStudios")}</h1>
          <div className="otherStudios">
            {otherStudiosData.length > 0 ? otherStudiosData?.map((value, index) => (
              <div className="studio">
                <div className='studioImage'>
                  {value.studio_dir === '/' ?
                    <img src={default_album} />
                  :
                    <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
                  }
                </div>
                <h3>{value.name}</h3>
                <p>{value.desc}</p>
                <Button onClick={() => navigate("/studios/" + value.id,  { replace: true })}>{t("learnMore")}</Button>
                {sessionStorage.getItem("is_admin") == "true" ? <AlertDialog studio_id={value.id}/>: null}
              </div>
            )) : null}
            </div>
          </CacheProvider>
        </div>
      </div>
    </div>
  );
}
