import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

import '../App.css';
import './BuyKey.css';
import "../Components/MultiLang"

import { validateData } from '../Components/InputValidation';
import UpdateUserInfo from '../Components/UpdateUserInfo';
import { backend_address } from '../Components/Global';

import { Alert, createTheme, TextField, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';

import { useTranslation } from 'react-i18next';
import { useCustomEventListener } from 'react-custom-events';

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
  const [theme, setTheme] = useState(sessionStorage.getItem("theme"))
  useCustomEventListener("changeTheme", (theme) => {
    console.log("LOL")
    setTheme(theme)
  })
  let materialtheme = createTheme({
    palette: {
      mode: theme
    }
  })
  return (
    <div className={sessionStorage.getItem("lang") === "en" ? "all english" : sessionStorage.getItem("lang") === "pl" ? "all polish" : sessionStorage.getItem("lang") === "de" ? "all german" : "all"}>
      <TopBar />
      <SideBar />
      <div className="main">
        <div className='activationPage'>
          <ThemeProvider theme={materialtheme}>
          <h1>{t("appActivation")}</h1>
          <form className='verifyKey' onSubmit={verifyKey}>
            <TextField
              id='keyInput'
              label="Activation key"
              variant='outlined'
            />
            {error.length > 0 ?
              <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
              : null
              }
            <Button type="submit" variant='contained'>{t("verify")}</Button>
          </form>
          <h1>{t("keyPurchase")}</h1>
          <div className='buyKey'>
            <Button variant='contained' color="success" onClick={buyLicenseKey}>{t("buyLicenseKey")}</Button>
            <span id='copyKey'>
              {key.length > 0 ?
                <p id='copy'>{t("clickToCopy")}</p>
                : null
              }
              <p id="key" onClick={(e) => copyToClipboard(e)}>{key}</p>
            </span>
          </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
