import Button from '@mui/material/Button';
import { TextField, FormControl, IconButton, Alert } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateStudio.css';
import default_album from '../../../assets/album.png';
import { useState, useEffect } from 'react';
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';
import { validateData } from '../Components/InputValidation';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function CreateStudio() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pic, setPic] = useState(default_album);
  const [error, setError] = useState("")
  const [fileBase64String, setFileBase64String] = useState("");

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
    if (validateData(event.target.name.value, "studioName") == false) {
      setError("Provide a valid studio name (at least 3 characters long).")
      return
    }
    if (validateData(event.target.desc.value, "desciption") == false) {
      setError("Provide a valid studio description (at least 10 characters long).")
      return
    }
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
      .then((response) => {
        if (response.ok) navigate('/studios', { replace: true })
        else if (response.status == 409) setError("Studio name is already taken.")
        else console.log(response.json())
      })
      .catch(error => console.log(error));

  }
  return (
    <div className="all">
      <CacheProvider value={cache}>
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="createStudio">
          <div className="createStudioTitle">
            <IconButton onClick={() => {navigate('/studios', { replace: true });}}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <h1>{t("createYourStudio")}</h1>
          </div>
          <form onSubmit={AddStudio}  encType="multipart/form-data">
            <FormControl className="form">
              <img src={pic} />
              <TextField type="file" onChange={ChangePicture} />
              <TextField id="name" label="Name" variant="outlined" />
              <TextField id="desc" label="Description" variant="outlined" />
              {error ?
              <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert> : null
              }
              <Button
                className="createButton"
                variant="outlined"
                type="submit"
                disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
              >
                {t("createStudio")}
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      </CacheProvider>
    </div>
  );
}
