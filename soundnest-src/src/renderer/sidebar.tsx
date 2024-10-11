import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './App.css';

export default function SideBar() {
  return (
    <div className="sidebuttons">
      <div className="sideobject">
        <Link to="/" className="link1">
          <FontAwesomeIcon icon={faCoffee} />
          <p>dupa</p>
        </Link>
      </div>
      <div className="sideobject">
        <Link to="/main" className="link1">
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
        </Link>
      </div>
      <div className="sideobject">
        <Link to="/katalog" className="link1">
          <div>
            <FontAwesomeIcon icon={faCoffee} />
          </div>
        </Link>
      </div>
    </div>
  );
}
