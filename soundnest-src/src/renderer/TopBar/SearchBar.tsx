import { Input, TextField } from "@mui/material";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import "./TopBar.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import default_album from '../../../assets/album.png';

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
    text = event.target.value
    if (text.length < min_length) {
      document.getElementById("outputBox").style.display = "none";
    }
    else {
      document.getElementById("outputBox").style.display = "block";
      fetch(backend_address + "/api/search/" + text + "/")
      .then((response) => response.json())
      .then((d) => setSearchResults(d))
      .catch((error) => console.log(error))
    }
  }
  function SearchOnFocus(event) {
    event.preventDefault()
    if (event.target.value.length > min_length) {
      document.getElementById("outputBox").style.display = "block";
    }
  }

  return (
    <CacheProvider value={cache}>
      <input type="text" id="input" className="searchInput" placeholder="Search"
      onChange={(e) => changeSearch(e)
      }
      onFocus={(e) => SearchOnFocus(e)}
      onBlur={() => {
        document.getElementById("outputBox").style.display = "none";
      }}
      />
      <div id="outputBox" className="output" onClick={() => console.log("todo")}>
        {searchResults !== undefined ? searchResults.map((value, index) => (
        <div className="outputItem" onClick={() =>
        {
          if (value.type === "product" || value.type === "track") {
            navigate(`/item/${value.id}`, { replace: true });
          }
          else if (value.type === "studio") {
            navigate(`/studio/${value.id}`, { replace: true });
          }
          else {
            console.log("co jest kurwa");
          }
        }
        }>
          {value.result_pic != "/" ?
          <img src={`data:image/jpeg;base64,${value.result_pic}`} key={index}/>
          :
          <img src={default_album} key={index}/>
          }
          {value.result_name}
          <span style={{fontWeight: 800}}> {value.type}</span>
        </div>
         )): <h1>To kurwa nie powinno być otwarte</h1>}
      </div>
    </CacheProvider>
  );
}
