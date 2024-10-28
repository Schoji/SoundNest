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
import { useState, useEffect } from 'react';

const backend_address = 'http://localhost:5000';

export default function CreateStudio() {
  const navigate = useNavigate();
  const [pic, setPic] = useState(default_album);

  const [selectedFile, setSelectedFile] = useState();
  const [fileBase64String, setFileBase64String] = useState("");
  const onFileChange = (e) => {
    setSelectedFile(e.target.files);

  }
  const encodeFileBase64 = (file) => {
    var reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result
        setFileBase64String(Base64);
      };
      reader.onerror = function (error) {
        console.log("error", error)
      }
    }
  }
  var picChanged = false;
  function ChangePicture(event) {
    event.preventDefault();


    const cachedURL = URL.createObjectURL(event.target.files[0])
    encodeFileBase64(event.target.files[0])
    setPic(cachedURL)
    picChanged = true;
  }

  function AddStudio(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_user: sessionStorage.getItem('id'),
        name: event.target.name.value,
        desc: event.target.desc.value,
        studio_dir: fileBase64String,
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
            <form onSubmit={AddStudio}  encType="multipart/form-data">
              <FormControl className="form">
                <img src={pic} />
                <div className="formTextFields">
                  <TextField type="file" onChange={ChangePicture} />
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
