import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { backend_address } from "../Components/global";
import './AddFunds.css'
import { Button } from "@mui/material";
import UpdateUserInfo from "../Components/UpdateUserInfo";
import george from '../../../assets/fund_george.png'
import delma from '../../../assets/fund_delma.png'
import monopoly from '../../../assets/fund_monopoly.png'
import pig from '../../../assets/fund_pig.png'
import { useNavigate } from "react-router-dom";
import "../Components/MultiLang"
import { useTranslation } from "react-i18next";
export default function AddFunds() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const addFunds = (fund_amount: string | number) => {
    fetch(backend_address + "/api/add_funds/" + sessionStorage.getItem("id") + "/" + fund_amount)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      UpdateUserInfo()
      navigate("/add_funds", {replace: true})
    })
    .catch(error => error)

  }
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>{t("addFunds")}</h1>
        <div className="fundOptions">
          <img src={george} style={{backgroundColor: "green"}}/>
          <img src={delma} style={{backgroundColor: "#b3b300"}}/>
          <img src={monopoly} style={{backgroundColor: "purple"}} />
          <img src={pig} style={{backgroundColor: "#00ace6"}}/>

          <Button onClick={() => addFunds(100)} variant="contained" color="success" sx={{backgroundColor: "green"}}>100$</Button>
          <Button onClick={() => addFunds(200)} variant="contained" color="success" sx={{backgroundColor: "#b3b300"}}>200$</Button>
          <Button onClick={() => addFunds(300)} variant="contained" color="success" sx={{backgroundColor: "purple"}}>300$</Button>
          <Button onClick={() => addFunds(400)} variant="contained" color="success" sx={{backgroundColor: "#00ace6"}}>400$</Button>
        </div>
      </div>
    </div>
  )
}
