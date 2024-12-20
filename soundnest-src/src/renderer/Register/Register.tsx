import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import './Register.css'

import { backend_address } from '../Components/Global';
import logo from '../../../assets/icons/icons-dark/128x128.png';
import { validateData } from '../Components/InputValidation';

import { Alert, Button, createTheme, TextField, ThemeProvider } from "@mui/material";

export default function RegisterWindow() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  sessionStorage.setItem("visitedRegister", "true")
  setTimeout(() => {
    document.getElementById("registerScreen").classList.add("clicked");
    document.getElementById("appLogo").style.marginBottom="145px";
  }, 1)

  let materialtheme = createTheme({
    palette: {
      mode: "dark"
    }
  })
  const register = (event) => {
    event.preventDefault();
    let name = event.target.name.value
    let surname = event.target.surname.value
    let username = event.target.username.value
    let email = event.target.email.value
    let password = event.target.password.value
    let password1 = event.target.password1.value

    if (validateData(name, "name") == false) {
      setError("Provide a valid name.")
      return
    }
    else if (validateData(surname, "surname") == false) {
      setError("Provide a valid surname.")
      return
    }
    else if (validateData(username, "username") == false) {
      setError("Provide a valid username.")
      return
    }
    else if (validateData(email, "email") == false) {
      setError("Provide a valid email address.")
      return
    }
    else if (validateData(password, "password") == false) {
      setError("Provide a strong and secure password. At least 8 characters long with 1 special sign.")
      return
    }
    if (password != password1) {
      setError("Passwords do not match.")
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        "name" : name,
        "surname": surname,
        "username": username,
        "email": email,
        "password": password
        }),
      }
    fetch(backend_address + "/api/users/", requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    navigate("/login", {replace: true})
    }

  return (
      <div className='registerScreen' id='registerScreen'>
        <div className='registerLogo'>
          <img src={logo} alt="appLogo" id="appLogo"/>
        </div>
        <ThemeProvider theme={materialtheme}>
        <div className='registerForm'>
            <form onSubmit={(event) => register(event)} onClick={() => {document.getElementById("registerScreen").classList.add("clicked")}}>
              <TextField
                id="name"
                label="Name"
                type='text'
              />
              <TextField
                id="surname"
                label="Surname"
                type='text'
              />
              <TextField
                id="email"
                label="Email"
                type='text'
              />
              <TextField
                id="username"
                label="Username"
                type='text'
              />
              <TextField
                id="password"
                label="Password"
                type="password"
              />
               <TextField
                id="password1"
                label="Repeat password"
                type="password"
              />
                {error.length > 0 ?
                <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
                : <div> </div>
                }
                <Button className='createButton' variant="contained" type="submit" value='Create an account'>Create an account</Button>
                <Button className='backButton' onClick={() => navigate("/login", {replace: true})}>Already have an account?</Button>
            </form>
          </div>
          </ThemeProvider>
      </div>
  );
}
