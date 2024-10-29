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
import { useNavigate } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

const backend_address = 'http://localhost:5000';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function RenderData() {
    //   return (
    //   data.map((value) =>
    //     {value.id_user == sessionStorage.getItem('id') ? (
    //     <div className='studio'>
    //       {value.studio_dir == "/" ? <img src={default_album}></img> : <img src={`data:image/jpeg;base64,${value.studio_dir}`} />}
    //       <h1>{sessionStorage.getItem('id')}</h1>
    //       <h1>{value.name}</h1>
    //       <p>{value.desc}</p>
    //       <Button variant="contained" >Learn more</Button>
    //     </div>
    //     ) : <h1>nic</h1>}
    //   )
    // )
    // eslint-disable-next-line array-callback-return
    //
    // BUG
    //

    const returnik = data.map((value) =>
      value.id_user === sessionStorage.getItem('id') ?
          <div className="myStudio">
            {value.studio_dir === '/' ? (
              <img src={default_album} />
            ) : (
              <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
            )}
            <h2>{value.name}</h2>
            <p>{value.desc}</p>
            <Button
              variant="outlined"
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
          <h1>My Studios</h1>
          <RenderData />
          <Button
            variant="contained"
            className="addStudio"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={toCreateStudio}
          >
            <FontAwesomeIcon icon={faPlus} size="2xl" beat />
          </Button>
          <h1>Other Studios</h1>
          <div className="otherStudios">
            {data.map((value) => (
              <div className="studio">
                {value.studio_dir === '/' ? (
                  <img src={default_album} />
                ) : (
                  <img src={`data:image/jpeg;base64,${value.studio_dir}`} />
                )}
                <h3>{value.name}</h3>
                <p>{value.desc}</p>
                <Button variant="contained">LEARN MORE</Button>
                {sessionStorage.getItem("is_admin") == "true" ? <AlertDialog studio_id={value.id}/> : null}

              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
