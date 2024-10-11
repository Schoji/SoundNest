import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './App.css';

export let CurrentWindow = 0;

export default function SideBar() {
  const [window, changeWindow] = useState(0);

  function jedynka() {
    changeWindow(1);
    CurrentWindow = 1;
    console.log(CurrentWindow);
  }
  function dwojka() {
    changeWindow(0);
    CurrentWindow = 0;
    console.log(CurrentWindow);
  }

  return (
    <div className="sidebuttons">
      <div className="sideobject">
        <Link to="/main" className="link1">
              <FontAwesomeIcon icon={faCoffee} />
              <p>dupa</p>
          </Link>
      </div>
      <div className="sideobject">
        <Link to="/" className="link1">
        <div>
          <FontAwesomeIcon icon={faCoffee} />
          </div>
          </Link>
      </div>
      <div className="sideobject">
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <p>XD</p>
          </div>
      </div>
    </div>
  );
}
