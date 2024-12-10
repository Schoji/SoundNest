import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import "../Components/MultiLang.ts"

import user from '../../../assets/user.png'
import { backend_address } from '../Components/Global';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from '@mui/material';
import { Gavel, ShoppingBasket } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import Flag from "react-flagkit"
import { emitCustomEvent } from 'react-custom-events';

export default function AccountMenu() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let materialtheme = createTheme({
    palette: {
      mode: sessionStorage.getItem("theme") == "dark" ? "dark" : "light"
    }
  })
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeUserLang = (lang) => {
    fetch(backend_address + "/api/change_lang/" + sessionStorage.getItem("id") + "/" + lang)
    .then(response => response.json())
    .catch(error => console.log(error))
    sessionStorage.setItem("lang", lang)
    emitCustomEvent("changeLanguage")
  }

  function changeUserUI(language: string) {
    document.getElementsByClassName("all")[0].classList.remove("english")
    document.getElementsByClassName("all")[0].classList.remove("polish")
    document.getElementsByClassName("all")[0].classList.remove("german")
    document.getElementsByClassName("all")[0].classList.add(language)
  }
  return (
    <React.Fragment>
      <ThemeProvider theme={materialtheme}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            disableRipple
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {sessionStorage.getItem('avatar_dir') === "/" ? <img src={user} className="profileButton"/> : <img src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`} className='profileButton' />}
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          if (sessionStorage.getItem("id") === null) {
            navigate("/", {replace:true});
          }
          else {
            navigate("/settings", {replace:true});
          }
        }}>
          {sessionStorage.getItem('avatar_dir') === "/" ? <Avatar src={user}/> : <Avatar src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`} />}
          {sessionStorage.getItem("id") === null ? "Guest" : String(sessionStorage.getItem("name")) + String(" ") + String(sessionStorage.getItem("surname")) }
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {
          navigate("/purchasehistory", {replace:true});
        }}>
          <ListItemIcon>
            <ShoppingBasket fontSize="small" />
          </ListItemIcon>
          {t("purchaseHistory")}
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/statute", {replace:true});
        }}>
          <ListItemIcon>
            <Gavel fontSize="small" />
          </ListItemIcon>
          {t("termsOfUse")}
        </MenuItem>
        <Divider />
        <MenuItem sx={{justifyContent: 'space-evenly', cursor: 'default'}}>
          <ListItemIcon sx={{justifyContent: 'center', cursor: 'pointer'}} onClick={() => {
          i18n.changeLanguage("pl")
          changeUserLang("pl")
          changeUserUI("polish");
        }}>
            <Flag country="PL"/>
          </ListItemIcon>
          <ListItemIcon sx={{justifyContent: 'center', cursor: 'pointer'}} onClick={() => {
          i18n.changeLanguage("en")
          changeUserLang("en")
          changeUserUI("english");
        }}>
            <Flag role="button" country="GB"/>
          </ListItemIcon>
          <ListItemIcon sx={{justifyContent: 'center', cursor: 'pointer'}} onClick={() => {
          i18n.changeLanguage("de")
          changeUserLang("de")
          changeUserUI("german");
        }}>
            <Flag role="button" country="DE"/>
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/settings", {replace:true});
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t("settings")}
        </MenuItem>
        <MenuItem onClick={() => {
          localStorage.clear();
          localStorage.setItem("token", "undefined")
          sessionStorage.clear();
          window.electron.ipcRenderer.sendMessage('open-login-window', "LOL");
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
      </Menu>
      </ThemeProvider>
    </React.Fragment>
  );
}
