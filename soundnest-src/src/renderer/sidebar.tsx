import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect} from "react";

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
    <div className='sidebuttons'>
      <div className='sideobject'>
          <div onClick={jedynka}>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <button onClick={jedynka}>
           lol </button>
          </div>
      </div>
      <div className="sideobject">
      <div>
      <button onClick={dwojka}>
           lol </button>
          <FontAwesomeIcon icon={faCoffee} />
          </div>
          <div>
            <p>XD</p>
          </div>
      </div>
      <div className='sideobject'>
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
