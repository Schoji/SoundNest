/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import Button from '@mui/material/Button';
import { TextField, FormControl, IconButton, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './CreateItem.css';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const backend_address = 'http://localhost:5000';

export default function CreateStudio() {
  const navigate = useNavigate();
  const [pic, setPic] = useState(default_album);

  const [selectedFile, setSelectedFile] = useState();
  const [fileBase64String, setFileBase64String] = useState("");
  const [studioValue, setStudioValue] = useState("")

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

  function AddItem(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_studio: studioValue,
        album: event.target.name.value,
        artist: event.target.artist.value,
        desc: event.target.desc.value,
        price: event.target.price.value,
        item_path: fileBase64String,
      }),
    };
    // eslint-disable-next-line promise/catch-or-return
    fetch(`${backend_address}/api/products/`, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
    navigate('/katalog', { replace: true });

  }

  useEffect(() => {
    fetchStudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h1>Create your item</h1>
          </div>
          <div className="createStudioForm">
            <form onSubmit={AddItem}  encType="multipart/form-data">
              <FormControl className="form">
                <img src={pic} />
                <div className="formTextFields">
                  <TextField type="file" onChange={ChangePicture} />
                  <TextField id="name" label="Name" variant="outlined" />
                  <TextField id="artist" label="Artist" variant="outlined" />
                  <TextField id="desc" label="Description" multiline variant="outlined" />
                  <TextField id="price" label="Price" variant="outlined" />
                  <InputLabel id="demo-simple-select-label">Studio</InputLabel>
                  <GenerateOptions/>
                  <Button
                    className="createButton"
                    variant="contained"
                    type="submit"
                  >
                    Create Item
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