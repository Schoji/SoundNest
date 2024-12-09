import '../App.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Checkbox, createTheme, TextField } from "@mui/material";
import logo from '../../../assets/icons/icons-dark/128x128.png';
import { validateData } from '../Components/InputValidation';
import { useEffect, useState } from 'react';
import { backend_address } from '../Components/global';
import { ThemeProvider } from '@mui/material';

export default function LoginWindow() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("visitedRegister") == "true") {
      sessionStorage.setItem("visitedRegister", "false")
      setTimeout(() => {
        document.getElementById("loginScreen").style.gridTemplateRows="220px 1fr"
        document.getElementById("appLogo").style.marginBottom="32px"
      }, 1)
    }
    else {
      document.getElementById("loginScreen").style.gridTemplateRows="220px 1fr"
      document.getElementById("appLogo").style.marginBottom="32px"
    }
  },[])


  let materialtheme = createTheme({
    palette: {
      mode: "dark"
    }
  })
  function Login(event) {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    let keepSigned = event.target.keepSigned.checked
    if (validateData(username, "username") == false  && validateData(password, "password") == false){
      console.log("Creds did not pass validation.")
      setError("Please provide proper data.")
      return
    }

    const checkCreds = () => {
      fetch(`${backend_address}/api/users/${username}/${password}/${keepSigned}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          console.log("Invalid username and password.")
          setError("Invalid username or password.")
        }
      })
      .then(data => {
        if (data) {
          window.electron.ipcRenderer.sendMessage('open-main-window', JSON.stringify(data));
        }
      })
      .catch(error => console.log(error))
    };
    checkCreds();
  }
  return (
      <div className='loginScreen' id='loginScreen'>
        <div className='loginLogo'>
          <img src={logo} alt="appLogo" id='appLogo'/>
        </div>
        <ThemeProvider theme={materialtheme}>
        <div className='loginForm'>
            <form onSubmit={Login}>
              <TextField
                id="username"
                label="Username"
                type="text"
                defaultValue="johndoe123"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                defaultValue="P@ssw0rd123"
              />
              <div className='checkbox'>
                <Checkbox
                  id="keepSigned"
                  disableRipple
                />
                <p>Keep me signed in</p>
              </div>
              {error.length > 0 ?
              <Alert id="error"
                className="error"
                variant="filled"
                severity="error"
              >
                {error}
              </Alert> : <div> </div>
              }
              <Button className='loginButton' variant="contained" type="submit" value="Login">Login</Button>
              <Button className='registerButton' onClick={() => navigate("/register", {replace: true})}>Don't have an account?</Button>
            </form>
          </div>
          </ThemeProvider>
      </div>
  );
}
