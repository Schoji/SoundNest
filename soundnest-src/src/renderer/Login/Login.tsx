/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';
import BottomBar from '../BottomBar/BottomBar';
import './Login.css';

const backend_address = 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate();
  function Logout() {
    sessionStorage.clear();
    navigate('library', { replace: true });
  }
  function SessionStorage(event) {
    event.preventDefault();
    const Fetch = () => {
      fetch(
        `${backend_address}/api/users/${event.target.username.value}/${
          event.target.password.value
        }`,
      )
        .then((response) => response.json())
        .then((data) => {
          // eslint-disable-next-line promise/always-return
          if (data.length === 0) {
            console.log('user not found');
          } else {
            console.log('User found');
            console.log(JSON.stringify(data));
            sessionStorage.clear();
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('surname', data.surname);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('prefered_theme', data.prefered_theme);
            sessionStorage.setItem('credits', data.credits);
            sessionStorage.setItem('avatar_dir', data.avatar_dir);
            sessionStorage.setItem('is_admin', data.is_admin);
            navigate('library', { replace: true }); // can replace with login-successful or something
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Fetch();
  }
  return (
    <div className="all">
      <TopBar />
      <SideBar />
      <div className="main">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={SessionStorage}>
            <input
              name="username"
              placeholder="username"
              defaultValue="johndoe123"
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              defaultValue="P@ssw0rd123"
            />
            <input type="submit" />
          </form>
        </div>
        <div>
          <h1>Logout</h1>
          {
            // eslint-disable-next-line react/jsx-no-bind
            <Button variant="contained" onClick={Logout}>
              Logout
            </Button>
          }
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
