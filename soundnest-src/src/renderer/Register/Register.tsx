import '../App.css';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { Alert, Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';
import { backend_address } from '../Components/global';
import { useState } from 'react';
import { validateData } from '../Components/InputValidation';

export default function RegisterWindow() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const register = (event) => {
    event.preventDefault();
    let name = event.target.name.value
    let surname = event.target.surname.value
    let username = event.target.username.value
    let email = event.target.email.value
    let password = event.target.password.value

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
      <div className='registerScreen'>
        <div className='registerLogo'>
          <img src={logo} alt="appLogo" />
        </div>
        <div className='registerForm'>
            <form onSubmit={(event) => register(event)}>
              <div>
                <input
                  id="name"
                  type='text'
                  placeholder="Name"
                />
                <input
                  id="surname"
                  type='text'
                  placeholder="Surname"
                />
              </div>
              <input
                id="username"
                type='text'
                placeholder="Username"
              />
              <input
                id="email"
                type='text'
                placeholder="E-mail"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
              />
               <input
                id="repeat-password"
                type="password"
                placeholder="Repeat Password"
              />
                {error.length > 0 ?
                <Alert id="error" className="error" variant="filled" severity="error">{error}</Alert>
                : null
                }
                <input type="submit" value='Create an account'/>
                <Button onClick={() => navigate("/login", {replace: true})}>Already have an account?</Button>
            </form>

          </div>
      </div>
  );
}
