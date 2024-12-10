import { useEffect, useState } from 'react';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

import './Statute.css';

import { backend_address } from '../Components/Global';

import { useCustomEventListener } from 'react-custom-events';
import parse from 'html-react-parser';

export default function Regulamin() {
  const [statute, setStatute] = useState("")

  const getStatute = () => {
    fetch(backend_address + "/api/statute/" + sessionStorage.getItem("lang"))
    .then(response => response.json())
    .then(data => setStatute(data))
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
  useCustomEventListener("changeLanguage", () => {
    getStatute()
  })
  useEffect(() => {
    getStatute()
  }, [])
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        {parse(statute)}
      </div>
    </div>
  );
}
