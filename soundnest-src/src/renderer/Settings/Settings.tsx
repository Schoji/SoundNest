/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, createTheme, Radio, TextareaAutosize, TextField, ThemeProvider } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './Settings.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import JSZip from 'jszip';
import { useTranslation } from 'react-i18next';
import '../Components/MultiLang'
import { useCustomEventListener } from 'react-custom-events';
import { green, grey, lightBlue, pink, red, yellow } from '@mui/material/colors';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { backend_address } from '../Components/global';
import avatarIcon from '../../../assets/user.png'

export default function Settings() {

  const navigate = useNavigate();
  const [pic, setPic] = useState("data:image/jpeg;base64," + String(sessionStorage.getItem("avatar_dir")));
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileBase64String, setFileBase64String] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);

  }

  var picChanged = false;

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

function ChangePicture(event) {
    event.preventDefault();

    const cachedURL = URL.createObjectURL(event.target.files[0])
    encodeFileBase64(event.target.files[0])
    setPic(cachedURL)
    picChanged = true;
    console.log("PicChanged")
  }

  function AlterUser(event) {
    event.preventDefault();
    fetch(`${backend_address}/api/users/${sessionStorage.getItem("id")}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method:"PATCH",
      body: JSON.stringify({
        'username' : event.target.username.value,
        'name' : event.target.name.value,
        'surname' : event.target.surname.value,
        'email' : event.target.email.value,
        'avatar_dir': fileBase64String
      })
    }).catch((error) => console.log(error))


    fetch(
      `${backend_address}/api/users/${sessionStorage.getItem("id")}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
        } else {
          console.log(JSON.stringify(data));
          sessionStorage.clear();
          sessionStorage.setItem('id', data.id);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('name', data.name);
          sessionStorage.setItem('surname', data.surname);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('prefered_theme', data.prefered_theme);
          sessionStorage.setItem('credits', data.credits);
          sessionStorage.setItem('avatar_dir', data.avatar_dir);
          sessionStorage.setItem('is_admin', data.is_admin);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/studios", {replace:true});
  }

  const exportUserInfo = async() => {
    const zip = new JSZip
    var content = "{"
    Object.keys(sessionStorage).forEach(element => {
      content += "\"" + element + "\":\"" + sessionStorage.getItem(element) + "\","
    });
    content += "}"
    const file = new Blob([content], { type: "text/plain" })
    const file_zipped = zip.file("user-info.json", file)
    const zipData = await zip.generateAsync({
      type: "blob",
      streamFiles: true
    })
    const url = URL.createObjectURL(zipData)
    console.log(file_zipped)
    const link = document.createElement("a")
    link.download = "user-info.zip"
    link.href = url
    link.click()
  }
  const { t } = useTranslation()
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"))
  useCustomEventListener("changeTheme", (theme) => {
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })
  const [selectedValue, setSelectedValue] = useState(sessionStorage.getItem("logo"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    changeLogo(parseInt(event.target.value))
    fetch(backend_address + "/api/change_colour/" + sessionStorage.getItem("id") + "/" + String(parseInt(event.target.value)))
        .then(response => response.json())
        .catch(error => console.log(error))
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    inputProps: { 'aria-label': item },
  });

  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
        <TopBar />
        <SideBar />
        <div className="main">
          <div className="settings">
            <h1>Profile Settings</h1>
            <form encType="multipart/form-data" onSubmit={AlterUser}>
              <div className='settingsAvatar'>
                <img src={pic !== "data:image/jpeg;base64,/" ? pic : avatarIcon}/>
                <Button
                  className="uploadPhoto"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<FileUploadRoundedIcon />}
                >
                  {t("uploadPhoto")}
                  <input id="file" type='file' onChange={ChangePicture} style={{display: 'none'}} />
                </Button>
              </div>
              <div className='settingsInputs'>
              <ThemeProvider theme={materialtheme}>
                <TextField id="name"
                  label="Name"
                  defaultValue={sessionStorage.getItem('name')}
                />
                <TextField id="surname"
                  label="Surname"
                  defaultValue={sessionStorage.getItem('surname')}
                />
                <TextField id="username"
                  label="Username"
                  defaultValue={sessionStorage.getItem('username')}
                />
                <TextField id="email"
                  label="Email"
                  defaultValue={sessionStorage.getItem('email')}
                />
                <TextField id="bio"
                  label="Bio"
                  multiline
                  minRows={5}
                  defaultValue={sessionStorage.getItem('bio') != "null" ? sessionStorage.getItem('bio') : "You have no bio."}
                />
                <Button
                  type="submit"
                  className="confirmButton"
                  startIcon={<SaveRoundedIcon />}
                >
                  {t("save")}
                </Button>
              </ThemeProvider>
              </div>
            </form>
            <h1>Other Settings</h1>
            <div className='otherSettings'>
              <h3>Themes</h3>
              <div className='themeSettings'>
                <Radio {...controlProps('0')}
                  disableRipple
                />
                <Radio {...controlProps('1')}
                  disableRipple
                />
                <Radio {...controlProps('2')}
                  disableRipple
                />
                <Radio {...controlProps('3')}
                  disableRipple
                />
                <Radio {...controlProps('4')}
                  disableRipple
                />
              </div>
              <h3>Private Data</h3>
              <div className='dataSettings'>
                <Button
                  className='exportInfoButton'
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={exportUserInfo}
                >
                  {t("exportUserInfo")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function changeLogo(logoValue) {
  sessionStorage.setItem("logo", logoValue);

}
