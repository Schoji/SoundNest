/* eslint-disable camelcase */
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import default_album from '../../../assets/album.png';
import './TopBar.css';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const backend_address = 'http://localhost:5000';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState();
  let text;
  const min_length = 3;

  function changeSearch(event) {
    event.preventDefault();
    text = event.target.value;
    if (text.length < min_length) {
      document.getElementById('outputBox')?.classList.remove("visible");
    } else {
      document.getElementById('outputBox')?.classList.add("visible");
      fetch(backend_address + '/api/search/' + text + '/')
        .then((response) => response.json())
        .then((d) => setSearchResults(d))
        .catch((error) => console.log(error));
    }
  }
  function SearchOnFocus(event) {
    event.preventDefault();
    if (event.target.value.length > min_length) {
      document.getElementById('outputBox')?.classList.add("visible");
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
        onBlur={() => {
          document.getElementById('outputBox')?.classList.remove("visible");
        }}
      />
      <div
        id="outputBox"
        className="output"
        onClick={() => console.log('todo')}
      >
        {searchResults !== undefined ? (
          searchResults.map((value, index) => (
            <div
              className="outputItem"
              onClick={() => {
                if (value.type === 'product' || value.type === 'track') {
                  navigate(`/item/${value.id}/`, { replace: true });
                } else if (value.type === 'studio') {
                  navigate(`/studio/${value.id}/`, { replace: true });
                } else {
                  console.log('co jest kurwa');
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
