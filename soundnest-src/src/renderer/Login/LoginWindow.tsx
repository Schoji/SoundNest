import '../App.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import logo from '../../../assets/icons/128x128.png';

const backend_address = 'http://localhost:5000';

export default function LoginWindow() {
  const navigate = useNavigate();
  function Login(event) {
    event.preventDefault();
    const checkCreds = () => {
      fetch(
        `${backend_address}/api/users/${event.target.username.value}/${
          event.target.password.value
        }`,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            console.log('user not found');
          } else {
            console.log('User found');
            window.electron.ipcRenderer.sendMessage('open-main-window', JSON.stringify(data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
                type='text'
                placeholder="username"
                defaultValue="johndoe123"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                defaultValue="P@ssw0rd123"
              />
              <input type="submit" value="Login"/>
              <Button onClick={() => navigate("/register", {replace: true})}>Register</Button>
            </form>
          </div>
      </div>
  );
}
