import '../App.css';
import './Welcome.css'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';

export default function WelcomeWindow() {
  const navigate = useNavigate();
  return (
      <div className='container'>
        <div className='logo'>
          <img src={logo} alt="appLogo" />
        </div>
        <div className='loader'>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
        </div>
        <p className='welcome'>Welcome</p>
        <Button onClick={() => navigate("/login", {replace: true})} className='continue' variant='contained'>Continue</Button>
      </div>
  );
}
