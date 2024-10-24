/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import { TextField, FormControl, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateStudio.css';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';

const backend_address = 'http://localhost:5000';

export default function CreateStudio() {
  const navigate = useNavigate();
  function AddStudio(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_user: sessionStorage.getItem('id'),
        name: event.target.name.value,
        desc: event.target.desc.value,
      }),
    };
    // eslint-disable-next-line promise/catch-or-return
    fetch(`${backend_address}/api/studios/`, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
    navigate('/Studio', { replace: true });
  }
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="createStudio">
          <div className="createStudioTitle">
            <IconButton
              color="primary"
              className="back"
              onClick={() => {
                navigate('/Studio', { replace: true });
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <h1>Create your studio</h1>
          </div>
          <div className="createStudioForm">
            <form onSubmit={AddStudio}>
              <FormControl className="form">
                <img src={default_album} />
                <div className="formTextFields">
                  <TextField type="file" />
                  <TextField id="name" label="Name" variant="outlined" />
                  <TextField id="desc" label="Description" variant="outlined" />
                  <Button
                    className="createButton"
                    variant="outlined"
                    type="submit"
                  >
                    Create studio
                  </Button>
                </div>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
