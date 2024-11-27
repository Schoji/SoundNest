import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import '../App.css';
import './BuyKey.css';
import { useState, useEffect } from 'react';
import default_album from '../../../assets/album.png';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { replace, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../Components/MultiLang"
import { backend_address } from '../Components/global';
import { Alert } from '@mui/material';
import { validateData } from '../Components/InputValidation';
import UpdateUserInfo from '../Components/UpdateUserInfo';


export default function BuyKey() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [key, setKey] = useState("")
  const [error, setError] = useState("")

  const buyLicenseKey = () => {
    fetch(backend_address + "/api/get_key/" + sessionStorage.getItem("id"))
    .then(response => response.json())
    .then(data => setKey(data))
    .catch(error => console.log(error))
  }

  const verifyKey = (event) => {
    event.preventDefault()
    if (validateData(event.target.keyInput.value, "key") == false) {
      setError("Invalid key format.")
      return
    }
    fetch(backend_address + "/api/assign_key/" + sessionStorage.getItem("id") + "/" + event.target.keyInput.value)
    .then(response => {
      if (response.ok) {
        UpdateUserInfo()
        sessionStorage.setItem("hasKey", "true")
        navigate("/", {replace: true})
        return response.json()
      }
      else {setError("Invalid key."); return}
    })
    .catch(error => console.log(error))
  }

  function copyToClipboard(event) {
    event.preventDefault()
    navigator.clipboard.writeText(event.target.textContent)
  }
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <h1>Pricing</h1>
        <div className='choiceList'>
          <div className='choice'>
            <Button variant='contained' color="success" onClick={buyLicenseKey}>Buy license key</Button>
            <p id="key" onClick={(e) => copyToClipboard(e)}>{key}</p>
          </div>
        </div>
        <form onSubmit={verifyKey}>
          <input id="keyInput" placeholder="Enter your key here"/>
          <Button type="submit" variant='contained'>Verify</Button>
          {error.length > 0 ?
            <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
            : null
            }
        </form>
      </div>
    </div>
  );
}
