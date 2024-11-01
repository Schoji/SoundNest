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
import { useNavigate } from 'react-router-dom';
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

const backend_address = 'http://localhost:5000';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export function AlertDialog({ studio_id }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const DeleteStudio = (studio_id) => {
    fetch(`${backend_address}/api/studios/${studio_id}`, {method: "DELETE"})
      // .then((response) => console.log(response.json()))
      .catch((error) => {
        console.log(error);
      });
      navigate('/studio', { replace: true });
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
            This action cannot be undone. Once you do this you will remove it from database.
            {studio_id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='error' onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color='success' onClick={() => {
            handleClose
            DeleteStudio(studio_id)
            }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default function Studio() {
  const navigate = useNavigate();
  function toCreateStudio() {
    navigate('/createstudio', { replace: true });
  }
  const [data, setData] = useState<any[]>([]);
  const Fetch = () => {
    fetch(`${backend_address}/api/studios/`)
      .then((response) => response.json())
      .then((d) => setData(d))
      .catch((error) => {
        console.log(error);
      });
    // console.log(data);
  };
  useEffect(() => {
    Fetch();
  }, []);

  function RenderData() {
    // BUG
    //
    if (data.length == 0) {
      return <CircularProgress />
    }
    const returnik = data.map((value) =>
      value.id_user === sessionStorage.getItem('id') ?
          <div className="myStudio">
            <div className="myStudioImage">
              {value.studio_dir === '/' ? (
                <img src={default_album} />
              ) : (
                <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
              )}
            </div>           
            <h2>{value.name}</h2>
            <p>{value.desc}</p>
            <Button
              className="editStudio"
              onClick={() => {
                navigate(`/editstudio/${value.id}`, { replace: true });
              }}
            >
              Edit
            </Button>
          </div> : null
    );
    console.log(returnik)
    return returnik;
  }

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="studios">
        <CacheProvider value={cache}>
          <h1>My Studios</h1>
          <Button onClick={toCreateStudio}>
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          <div className="myStudios">
            <RenderData />
          </div> 
          <h1>Other Studios</h1>
          <div className="otherStudios">
            {data.map((value) => (
              <div className="studio">
                <div className='studioImage'>
                  {value.studio_dir === '/' ? (
                    <img src={default_album} />
                  ) : (
                    <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
                  )}
                </div>              
                <h3>{value.name}</h3>
                <p>{value.desc}</p>
                <Button>LEARN MORE</Button>
                {sessionStorage.getItem("is_admin") == "true" ? <AlertDialog studio_id={value.id}/> : null}

              </div>
            ))}
          </div>
          </CacheProvider>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
