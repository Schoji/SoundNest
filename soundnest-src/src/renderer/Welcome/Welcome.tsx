import '../App.css';
import './Welcome.css'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';
import { ClassNames } from '@emotion/react';

const backend_address = 'http://localhost:5000';

export default function WelcomeWindow() {
  const navigate = useNavigate();
  return (
      <div className='container'>
        <div className='logo'>
          <img src={logo} alt="appLogo" />
        </div>
        <p className='dupa1'>Welcome</p>
        <Button onClick={() => navigate("/login", {replace: true})} className='dupa' variant='contained'>Continue</Button>
      </div>
  );
}
