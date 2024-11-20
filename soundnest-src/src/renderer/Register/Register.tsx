import '../App.css';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';

const backend_address = 'http://localhost:5000';

export default function RegisterWindow() {
  const navigate = useNavigate();
  return (
      <div className='registerScreen'>
        <div className='registerLogo'>
          <img src={logo} alt="appLogo" />
        </div>
        <div className='registerForm'>
            <form>
              <input
                name="username"
                type='text'
                placeholder="username"
              />
              <input
                name="surname"
                type='text'
                placeholder="surname"
              />
              <input
                name="username"
                type='text'
                placeholder="username"
              />
              <input
                name="email"
                type='text'
                placeholder="e-mail"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
              />
              <input
                name='avatar'
                type='file'
              />
              <input type="submit" value='Rejestruj'/>
              <Button onClick={() => navigate("/login", {replace: true})}>Log in</Button>
            </form>
          </div>
      </div>
  );
}
