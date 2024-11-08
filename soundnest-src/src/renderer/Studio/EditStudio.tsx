/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormControl, TextField } from '@mui/material';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import default_album from '../../../assets/album.png';
import BottomBar from '../BottomBar/BottomBar';
import './Studio.css'
const backend_address = 'http://localhost:5000';

export default function EditStudio() {
  const navigate = useNavigate();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="studioSettings">
          <img src={pic}/>
          <form encType="multipart/form-data" onSubmit={AlterStudio}>
            <FormControl>
              <TextField id="file" type="file" onChange={ChangePicture}/>
              <TextField id="studio_name" label="Studio name" variant="outlined" defaultValue={data.name}/>
              <TextField id="desc" label="Description" multiline variant="outlined" defaultValue={data.desc}/>
              <Button color="success" variant="contained" type="submit">
                Save
              </Button>
              <Button color="error" variant="contained">
                Cancel
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
