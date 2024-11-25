/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, IconButton, TextField } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import default_album from '../../../assets/album.png';
import './EditStudio.css'
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function EditStudio() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const { studio_id } = useParams();
  const [pic, setPic] = useState(default_album);


  const [selectedFile, setSelectedFile] = useState([]);
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
  const Fetch = () => {
    fetch(`${backend_address}/api/studios/${studio_id}`)
      .then((response) => response.json())
      .then((d) => {
        setData(d)
        if (d.studio_dir != "/") {
          let picture = "data:image/jpeg;base64," + String(d.studio_dir);
          setPic(picture);
        }})
      .catch((error) => {
        console.log('ERRORR');
        console.log(error);
      });
  };
  useEffect(() => {
    Fetch();
  }, []);

  function ChangePicture(event) {
    event.preventDefault();
    const cachedURL = URL.createObjectURL(event.target.files[0])
    encodeFileBase64(event.target.files[0])
    setPic(cachedURL)
    picChanged = true;
  }
  function AlterStudio(event) {
    event.preventDefault();
    fetch(backend_address + "/api/studios/" + studio_id, {
      headers: {
        'Content-Type': 'application/json',
      },
      method:"PATCH",
      body: JSON.stringify({
        'name' : event.target.studio_name.value,
        'desc' : event.target.desc.value,
        'studio_dir': fileBase64String
      })
    }).catch((error) => console.log(error))
    navigate("/studios", {replace:true});
  }

  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <CacheProvider value={cache}>
          <div className="title">
            <IconButton
              className='icon'
              onClick={() => {
                navigate('/studios', { replace: true });
              }}
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <h1>{t("albumDetails")}</h1>
          </div>
          <form encType="multipart/form-data" onSubmit={AlterStudio} className='studioDesc'>
            <div className='pictureSelection'>
              <img src={pic}/>
              <TextField id="file" type="file" onChange={ChangePicture}/>
            </div>
            <div className='otherInputs'>
              <TextField id="studio_name" label="Studio name" variant="outlined" defaultValue={data.name}/>
              <TextField id="desc" label="Description" multiline variant="outlined" defaultValue={data.desc}/>
              <Button variant="contained" type="submit">
                {t("save")}
              </Button>
            </div>
          </form>
        </CacheProvider>
      </div>
    </div>
  );
}
