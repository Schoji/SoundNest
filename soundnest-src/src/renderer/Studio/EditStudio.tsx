/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, TextField, createTheme, ThemeProvider, Alert } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import default_album from '../../../assets/album.png';
import './EditStudio.css'
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useCustomEventListener } from 'react-custom-events';
import { validateData } from '../Components/InputValidation';

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
  const [error, setError] = useState("")
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
    if (validateData(event.target.name.value, "studioName") == false) {
      setError(t("nameLengthError"))
      return
    }
    if (validateData(event.target.desc.value, "desciption") == false) {
      setError(t("descLengthError"))
      return
    }
    fetch(backend_address + "/api/studios/" + studio_id, {
      headers: {
        'Content-Type': 'application/json',
      },
      method:"PATCH",
      body: JSON.stringify({
        'name' : event.target.name.value,
        'desc' : event.target.desc.value,
        'studio_dir': fileBase64String,
      }),
    })
    .then(() => {
      navigate("/studios", {replace:true});
    })
    .catch((error) => console.log(error))
  }
  const [nameLength, setNameLength] = useState(0)
  const [descLength, setDescLength] = useState(0)
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"))
  useCustomEventListener("changeTheme", (theme) => {
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <CacheProvider value={cache}>
        <ThemeProvider theme={materialtheme}>
          <div className="editStudio">
            <div className="editStudioTitle">
              <IconButton onClick={() => {navigate('/studios', { replace: true });}}>
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <h1>{t("editYourStudio")}</h1>
            </div>
            <form encType="multipart/form-data" onSubmit={AlterStudio}>
              <div className='editStudioImage'>
                <p className='smallTitle'>{t("studioImagePreview")}</p>
                <img src={pic}/>
                <div> </div>
                <Button
                  className="uploadPhoto"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FileUploadRoundedIcon />}
                >
                  {t("uploadPhoto")}
                  <input type='file' onChange={ChangePicture} style={{display: 'none'}} />
                </Button>
              </div>
              <div className='editStudioInputs'>
                <p className='smallTitle'>{t("studioNameEdit")}</p>
                <TextField
                  key={data.name}
                  id="name"
                  label={t("placeholderName")}
                  helperText={nameLength != 0 ? nameLength + "/30" : t("nameLengthNotif")}
                  onChange={(e) => setNameLength(e.target.value.length)}
                  defaultValue={data.name}
                />
                <p className='smallTitle'>{t("studioDesc")}</p>
                <TextField
                  id="desc"
                  label={t("placeholderDesc")}
                  InputLabelProps={{ shrink: true }}
                  helperText={descLength != 0 ? descLength + "/100" : t("descLengthNotif")}
                  multiline
                  minRows={6}
                  onChange={(e) => setDescLength(e.target.value.length)}
                  defaultValue={data.desc}
                />
                {error ?
                <Alert id="error"
                  className="error"
                  variant="filled"
                  severity="error">
                    {error}
                </Alert> : <div> </div>
                }
                <p className='smallTitle'>{t("createStudioNotif")}</p>
                <Button
                  className='confirmButton'
                  type="submit"
                >
                  {t("save")}
                </Button>
              </div>
            </form>
          </div>
          </ThemeProvider>
        </CacheProvider>
      </div>
    </div>
  );
}
