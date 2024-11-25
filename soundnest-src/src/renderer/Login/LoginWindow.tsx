import '../App.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, createTheme, TextField } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';
import { validateData } from '../Components/InputValidation';
import { useState } from 'react';
import { backend_address } from '../Components/global';
import { ThemeProvider } from '@mui/material';

export default function LoginWindow() {
  const [error, setError] = useState("")
  const navigate = useNavigate();
  let materialtheme = createTheme({
    palette: {
      mode: "dark"
    }
  })
  function Login(event) {
    event.preventDefault();
    let username = event.target.username.value
    let password = event.target.password.value
    if (validateData(username, "username") == false  && validateData(password, "password") == false){
      console.log("Creds did not pass validation.")
      setError("Please provide proper data.")
      return
    }

    const checkCreds = () => {
      fetch(`${backend_address}/api/users/${username}/${password}`)
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
      <div className='loginScreen'>
        <div className='loginLogo'>
          <img src={logo} alt="appLogo" />
        </div>
        <ThemeProvider theme={materialtheme}>
        <div className='loginForm'>
            <form onSubmit={Login}>
              <TextField
                id="username"
                label="Username"
                type="text"
                placeholder="Username"
                defaultValue="johndoe123"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                defaultValue="P@ssw0rd123"
              />
              {error.length > 0 ?
              <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
              : null
              }
              <Button variant="contained" type="submit" value="Login">Login</Button>
              <Button onClick={() => navigate("/register", {replace: true})}>Don't have an account?</Button>
            </form>
          </div>
          </ThemeProvider>
      </div>
  );
}
