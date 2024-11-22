/* eslint-disable camelcase */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import default_album from '../../../assets/album.png';
import './TopBar.css';
import { backend_address } from '../Components/global';

const cache = createCache({
  key: 'css',
  prepend: true,
});


export default function SearchBar() {
  const navigate = useNavigate();
  const [searchBarVisible, setSearchBarVisible] = useState(false)
  const [searchResults, setSearchResults] = useState();
  let text;
  const min_length = 3;

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
    <CacheProvider value={cache}>
        <input
          type="text"
          id="input"
          className="searchInput"
          placeholder="Search"
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
    </CacheProvider>
  );
}
