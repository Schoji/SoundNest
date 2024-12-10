/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import { TextField, FormControl, IconButton, MenuItem, Input, Alert, createTheme, Chip, OutlinedInput, Box } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateItem.css';
import default_album from '../../../assets/album.png';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import '../Components/MultiLang'
import { useTranslation } from 'react-i18next';
import { validateData } from '../Components/InputValidation';
import { ThemeProvider } from '@mui/material';
import { useCustomEventListener } from 'react-custom-events';
import { backend_address } from '../Components/global';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

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

  return (
  <div className='createSongList'>
    {inputFields.map((input, index) => {
    return (
      <div className="song" key={index}>
        <TextField required key={"name" + String(index)} variant="outlined" name='name' value={input.name} label={t("nameOfTrack")} onChange={event => handleFormChange(index, event)}/>
        <TextField required key={"producer" + String(index)} variant="outlined" name='producer' value={input.producer} label={t("producer")} onChange={event => handleFormChange(index, event)}/>
        <TextField required key={"duration " + String(index)} variant="outlined" name='duration' value={input.duration} label={t("songDuration")} onChange={event => handleFormChange(index, event)}/>
        <IconButton disableRipple color='primary' onClick={() => removeFields(index)}>
          <RemoveRoundedIcon/>
        </IconButton>
      </div>
    )
  })}
    <IconButton disableRipple color='primary' onClick={addFields}>
      <AddRoundedIcon/>
    </IconButton>
  </div>
)
}

function Tags() {
  const [tagDict, setTagDict] = useState([])
  const [allTags, setAllTags] = useState([])
  function getTags() {
    fetch(backend_address + "/api/tags")
    .then(response => response.json())
    .then(data => {
      setAllTags(data)
      var tempTagDict = []
      data.map((tag, index) => {
        tempTagDict.push(tag.tag_name)
      })
      setTagDict(tempTagDict)
    })
    .catch(error => console.log(error))

  }
  useEffect(() => {
    getTags()
  },[])
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={{width: "100%"}}>
      <InputLabel>Tags</InputLabel>
      <Select
        id="tags"
        multiple
        value={tags}
        onChange={handleChange}
        input={<OutlinedInput id="multipletag" label="Tag" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={tagDict[value + 1]} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {allTags.map((tag) => (
          <MenuItem
            key={tag.tag_name}
            value={tag.id}
          >
            {tag.tag_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function CreateItem() {
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

    if (event.target.multipletag.value == "") {
      setError("Select at least 1 tag.")
      return
    }
    var tags = event.target.multipletag.value.split(",")
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
        tags.map((tag, index) => {
          fetch(backend_address + "/api/producttags/",
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id_product: parseInt(response.id),
                id_tag: parseInt(tag)
              }),
            }
          )
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.log(error))
        })


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
      <FormControl>
        <InputLabel>Studio</InputLabel>
        <Select
          id="studio"
          value={studioValue}
          label="Studio"
          onChange={handleChange}
        >
          {returnvalue}
        </Select>
      </FormControl>
    );
  }
  const { t } = useTranslation()
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
    <ThemeProvider theme={materialtheme}>
      <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
        <TopBar />
        <SideBar />
        <div className="main">
          <div className='createItem'>
            <div className="createItemTitle">
              <IconButton onClick={() => {navigate('/studios', { replace: true });}}>
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <h1>{t("createYourItem")}</h1>
            </div>
            <form onSubmit={AddItem}  encType="multipart/form-data">
              <div className='createStudioImage'>
                <p className='smallTitle'>{t("picPreview")}</p>
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
              <div className='createItemInputs'>
                <p className='smallTitle'>{t("newItemName")}</p>
                <TextField
                  id="album"
                  label={t("newAlbumName")}
                />
                <TextField
                  id="artist"
                  label={t("newAlbumCreator")}
                />
                <TextField
                  id="desc"
                  label={t("newAlbumDescription")}
                  multiline
                  minRows={6}
                />
                <TextField
                  id="price"
                  label={t("newAlbumPrice")}
                />
                <GenerateOptions/>
                <Tags/>
                {error.length > 0 ?
                <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
                : null
                }
              </div>
              <CreateSongs/>
              <Button
                  className="createButton"
                  variant="contained"
                  type="submit"
                  disabled={sessionStorage.getItem("hasKey") == "true" ? false : true}
                >
                  {t("createItem")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
