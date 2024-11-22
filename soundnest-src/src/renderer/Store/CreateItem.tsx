/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import { TextField, FormControl, IconButton, MenuItem, Input, Alert } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateItem.css';
import default_album from '../../../assets/album.png';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../Components/MultiLang'
import { useTranslation } from 'react-i18next';
import { validateData } from '../Components/InputValidation';
const backend_address = 'http://localhost:5000';

export function CreateSongs() {
  const { t } = useTranslation();
  const [inputFields, setInputFields] = useState([{
    name: '', producer:'', duration: ''
  }])
  const handleFormChange = (index, event) => {
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    sessionStorage.setItem("songs", JSON.stringify(inputFields));
  }

  const addFields = () => {
    let newField = { name:'', producer:'', duration:''}
    setInputFields([...inputFields, newField])
  }

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  return (<div>
    {inputFields.map((input, index) => {
    return (
      <div key={index}>
        <TextField required key={"name" + String(index)} variant="outlined" name='name' value={input.name} placeholder={t("nameOfTrack")} onChange={event => handleFormChange(index, event)}/>
        <TextField required key={"producer" + String(index)} variant="outlined" name='producer' value={input.producer} placeholder={t("producer")} onChange={event => handleFormChange(index, event)}/>
        <TextField required key={"duration " + String(index)} variant="outlined" name='duration' value={input.duration} placeholder={t("songDuration")} onChange={event => handleFormChange(index, event)}/>
        <IconButton color='primary' onClick={() => removeFields(index)}>
        <FontAwesomeIcon icon={faMinus}/>
        </IconButton>
    </div>
    )
  })}
  <IconButton color='primary' onClick={addFields}>
        <FontAwesomeIcon icon={faPlus}/>
        </IconButton>
  </div>
)
}

export default function CreateStudio() {
  const navigate = useNavigate();
  const [pic, setPic] = useState(default_album);

  const [fileBase64String, setFileBase64String] = useState("Null");
  const [studioValue, setStudioValue] = useState()
  const [error, setError] = useState("")
  const [data, setData] = useState([])

  function fetchStudio() {
    fetch(backend_address + "/api/studios/")
      .then((response) => response.json())
      .then((d) => setData(d))
      .then(() => console.log(data))
      .catch((error) => {
        console.log(error);
      });
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

  function AddItem(event) {
    event.preventDefault();
    if (validateData(event.target.album.value) == false) {
      setError("Provide a valid product name.")
      return
    }
    if (validateData(event.target.artist.value) == false) {
      setError("Provide a valid artist name.")
      return
    }
    if (validateData(event.target.desc.value, "description") == false) {
      setError("Provide a valid description (at least 10 characters long).")
      return
    }
    if (validateData(event.target.price.value, "price") == false) {
      setError("Provide a valid price.")
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_studio: studioValue,
        album: event.target.album.value,
        artist: event.target.artist.value,
        desc: event.target.desc.value,
        price: event.target.price.value,
        item_path: fileBase64String,
      }),
    };
    fetch(`${backend_address}/api/products/`, requestOptions)
      .then((response) => {
        if (response.ok) return response.json()
        else if (response.status == 409) {setError("Product name is already taken."); return}
        else console.log(response.json())
      })
      .then((response) => {
        var songs = JSON.parse(sessionStorage.getItem("songs"))
        songs.map((value, index: any) => {
          if (validateData(value.name) == false) {
            setError("Some of the songs' titles were invalid.")
            return
          }
          if (validateData(value.producer) == false) {
            setError("Some of the songs' producers were invalid.")
            return
          }
          const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id_product: response.id,
              name: value.name,
              producer: value.producer,
              length: parseInt(value.duration)
            }),
          };
          fetch(`${backend_address}/api/tracks/`, requestOptions1)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => {
              console.log(error);
            });
        })
        navigate(`/store`, { replace: true });
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStudio();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setStudioValue(event.target.value as string);
  };

  function GenerateOptions() {
    const returnvalue = data.map((value) =>
      value.id_user != sessionStorage.getItem("id") ? null:
      <MenuItem value={parseInt(value.id)}>{value.name}</MenuItem>
    )
    return (
              <Select
                id="studio"
                value={studioValue}
                label="Studio"
                onChange={handleChange}
              >
                {returnvalue}
              </Select>
    );
  }
  const { t } = useTranslation()
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
                navigate('/Store', { replace: true });
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <h1>{t("createYourItem")}</h1>
          </div>
          <div className="createStudioForm">
            <form onSubmit={AddItem}  encType="multipart/form-data">
              <FormControl className="form">
                <img src={pic} />
                <div className="formTextFields">
                  <TextField type="file" onChange={ChangePicture} />
                  <TextField required id="album" label="Album name" variant="outlined" />
                  <TextField required id="artist" label="Artist" variant="outlined" />
                  <TextField required id="desc" label="Description" multiline variant="outlined" />
                  <TextField required id="price" label="Price" variant="outlined" />
                  <InputLabel required id="demo-simple-select-label">{t("studio")}</InputLabel>
                  <GenerateOptions/>
                  <CreateSongs/>
                  {error.length > 0 ?
                  <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
                  : null
                  }
                  <Button
                    className="createButton"
                    variant="contained"
                    type="submit"
                    disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
                  >
                    {t("createItem")}
                  </Button>
                </div>

              </FormControl>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
