import { useNavigate } from "react-router-dom";

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

import './AddFunds.css'
import "../Components/MultiLang"

import { backend_address } from "../Components/Global";
import george from '../../../assets/fund_george.png'
import delma from '../../../assets/fund_delma.png'
import monopoly from '../../../assets/fund_monopoly.png'
import pig from '../../../assets/fund_pig.png'
import ratatuj from '../../../assets/fund_ratatuj.png'
import breaking from '../../../assets/fund_breaking.png'
import sonic from '../../../assets/fund_sonic.png'

import { Button } from "@mui/material";

import { useTranslation } from "react-i18next";
import { emitCustomEvent } from "react-custom-events";


export default function AddFunds() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const addFunds = (fund_amount: string | number) => {
    fetch(backend_address + "/api/add_funds/" + sessionStorage.getItem("id") + "/" + fund_amount)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      emitCustomEvent("updateTopBar")
      navigate("/add_funds", {replace: true})
    })
    .catch(error => error)

  }
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>{t("addFunds")}</h1>
        <div className="fundOptions">
          <div className="fundOption">
            <div className="fundImage">
              <img src={ratatuj}/>
            </div>
            <Button onClick={() => addFunds(10)} variant="contained">10$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={sonic}/>
            </div>
            <Button onClick={() => addFunds(20)} variant="contained">20$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={breaking}/>
            </div>
            <Button onClick={() => addFunds(50)} variant="contained">50$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={george}/>
            </div>
            <Button onClick={() => addFunds(100)} variant="contained">100$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={monopoly}/>
            </div>
            <Button onClick={() => addFunds(250)} variant="contained">250$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={pig}/>
            </div>
            <Button onClick={() => addFunds(500)} variant="contained">500$</Button>
          </div>
          <div className="fundOption">
            <div className="fundImage">
              <img src={delma}/>
            </div>
            <Button onClick={() => addFunds(1000)} variant="contained">1000$</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
