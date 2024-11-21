import '../App.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';
import { validateData } from '../Components/InputValidation';
import { useState } from 'react';
import { backend_address } from '../Components/global';

export default function LoginWindow() {
  const [error, setError] = useState("")
  const navigate = useNavigate();
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
        <div className='loginForm'>
            <form onSubmit={Login}>
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                defaultValue="johndoe123"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                defaultValue="P@ssw0rd123"
              />
              {error.length > 0 ?
              <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
              : null
              }
              <input type="submit" value="Login"/>
              <Button onClick={() => navigate("/register", {replace: true})}>Don't have an account?</Button>
            </form>
          </div>
      </div>
  );
}
