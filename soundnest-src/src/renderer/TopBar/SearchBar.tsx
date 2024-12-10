import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './TopBar.css';

import { backend_address } from '../Components/Global';
import default_album from '../../../assets/album.png';

import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { createTheme, InputAdornment, TextField, ThemeProvider } from '@mui/material';

import { useCustomEventListener } from 'react-custom-events';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchBarVisible, setSearchBarVisible] = useState(false)
  const [searchResults, setSearchResults] = useState();
  let text;
  const min_length = 3;
  const [theme, setTheme] = useState(sessionStorage.getItem("theme") || "dark")
  useCustomEventListener("changeTheme", (theme) => {
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })

  function changeSearch(event) {
    event.preventDefault();
    text = event.target.value;
    if (text.length < min_length) {
      setSearchBarVisible(false)
    } else {
      setSearchBarVisible(true)
      fetch(backend_address + '/api/search/' + text + '/')
        .then((response) => response.json())
        .then((d) => setSearchResults(d))
        .catch((error) => console.log(error));
    }
  }
  function SearchOnFocus(event) {
    event.preventDefault();
    if (event.target.value.length > min_length) {
      setSearchBarVisible(true)
    }
  }
  return (
    <ThemeProvider theme={materialtheme}>
        <TextField
          id="input"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{
                    transform: "scaleX(-1)",
                    marginRight: "5px",
                  }}/>
                  <p style={{fontWeight: "bolder"}}>|</p>
                </InputAdornment>
              ),
            },
          }}
          placeholder={t("search")}
          onChange={(e) => changeSearch(e)}
          onFocus={(e) => SearchOnFocus(e)}
          onBlur={() => setSearchBarVisible(false)}
        />
      <div
        id="outputBox"
        className="output"
      >
        {searchBarVisible && searchResults !== undefined ? (
          searchResults.map((value, index) => (
            <div
              className="outputItem"
              onMouseDown={() => {
                switch(value.type) {
                  case "product":
                    navigate(`/item/${value.result_id}/`, {replace: true})
                    break
                  case "track": {
                    navigate(`/item/${value.result_id}/`, {replace: true})
                    break
                  }
                  case "studio": {
                    navigate(`/studios/${value.result_id}/`, {replace: true})
                    break
                  }
                  case "user": {
                    navigate(`/user/${value.result_id}/`, {replace: true})
                    break
                  }
                }
              }}
            >
              {value.result_pic != '/' ? (
                <img
                  src={`data:image/jpeg;base64,${value.result_pic}`}
                  key={index}
                />
              ) : (
                <img src={default_album} key={index} />
              )}
              <h4>{value.result_name}</h4>
              <div>
              {value.type == 'product' ? (
                <AlbumRoundedIcon />
              ) : value.type == 'studio' ? (
                <GroupsRoundedIcon />
              ) : value.type == 'track' ? (
                <AudiotrackRoundedIcon />
              ) : null}
              <p>{value.type == 'product' ? 'Album' : value.type}</p>
              </div>
            </div>
          ))
        ) : ( null )}
      </div>
    </ThemeProvider>
  );
}
