import Button from '@mui/material/Button';
import { TextField, IconButton, Alert, createTheme, ThemeProvider } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useNavigate } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateStudio.css';
import default_album from '../../../assets/album.png';
import { useState } from 'react';
import "../Components/MultiLang"
import { useTranslation } from 'react-i18next';
import { backend_address } from '../Components/global';
import { validateData } from '../Components/InputValidation';
import { useCustomEventListener } from 'react-custom-events';

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
      setError(t("nameLengthError"))
      return
    }
    if (validateData(event.target.desc.value, "desciption") == false) {
      setError(t("descLengthError"))
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
    fetch(`${backend_address}/api/studios/`, requestOptions)
      .then((response) => {
        if (response.ok) navigate('/studios', { replace: true })
        else if (response.status == 409) setError(t("nameTakenError"))
        else console.log(response.json())
      })
      .catch(error => console.log(error));

  }
  const [nameLength, setNameLength] = useState(0)
  const [descLength, setDescLength] = useState(0)
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"))
  useCustomEventListener("changeTheme", (theme) => {
    console.log("LOL")
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <div className="all">
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
          <CacheProvider value={cache}>
            <ThemeProvider theme={materialtheme}>
            <form onSubmit={AddStudio}  encType="multipart/form-data">
              <div className="createStudioImage">
                <p className='smallTitle'>{t("studioImagePreview")}</p>
                <img src={pic} />
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
              <div className="createStudioInputs">
                <p className='smallTitle'>{t("studioName")}</p>
                <TextField id="name"
                  helperText={nameLength != 0 ? nameLength + "/30" : t("nameLengthNotif")}
                  label={t("placeholderName")}
                  onChange={(e) => setNameLength(e.target.value.length)}
                />
                <p className='smallTitle'>{t("studioDesc")}</p>
                <TextField id="desc"
                  helperText={descLength != 0 ? descLength + "/100" : t("descLengthNotif")}
                  multiline
                  minRows={6}
                  label={t("placeholderDesc")}
                  onChange={(e) => setDescLength(e.target.value.length)}
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
                  className="createButton"
                  type="submit"
                  disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
                >
                  {t("createStudio")}
                </Button>
              </div>
            </form>
            </ThemeProvider>
          </CacheProvider>
        </div>
      </div>
    </div>
  );
}
