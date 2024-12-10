import { useNavigate } from 'react-router-dom';

import '../App.css';
import './Welcome.css'

import logo from '../../../assets/icons/icons-dark/128x128.png';

import { Button } from "@mui/material";

export default function WelcomeWindow() {
  const navigate = useNavigate();
  return (
      <div className='container'>
        <div className='logo'>
          <img src={logo} alt="appLogo" />
        </div>
        <div className='content'>
          <h1>Welcome</h1>
          <div className='loader'>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
          </div>
          <Button onClick={() => navigate("/login", {replace: true})} className='continue' variant='contained'>Continue</Button>
        </div>
      </div>
  );
}
