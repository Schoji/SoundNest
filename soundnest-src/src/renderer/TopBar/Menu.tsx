import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import logo from '../../../assets/icons/1024x1024.png';
import { ThemeProvider, createTheme } from '@mui/material';
import Switch from '@mui/material/Switch';
import { DefaultTheme } from '@mui/private-theming';
import { useNavigate } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect, useState } from 'react';
import { Gavel, ShoppingBasket } from '@mui/icons-material';

export const Theme = () => {
  var dark;
  if (sessionStorage.getItem("theme") == "dark") {
    sessionStorage.setItem("theme", "dark");
    dark = true
  }
  else {
    sessionStorage.setItem("theme", "light");
    dark = false
  }
  const [isDark, setIsDark] = useState(dark);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      sessionStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark")
      sessionStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
  <Switch
        edge="end"
        checked={isDark}
        onChange={event => setIsDark(event.target.checked)}
        aria-label="Dark mode"
      />
  )
}

export default function AccountMenu() {

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

  return (
    <React.Fragment>
      <ThemeProvider theme={materialtheme}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {sessionStorage.getItem('id') === null ? <img src={logo} className="profileButton"/> : <img src={`data:image/jpeg;base64,${sessionStorage.getItem("avatar_dir")}`} className='profileButton' />}
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
          <Avatar /> {sessionStorage.getItem("id") === null ? "Guest" : String(sessionStorage.getItem("name")) + String(" ") + String(sessionStorage.getItem("surname")) }
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          Dark Mode
          <Theme />
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/regulamin", {replace:true});
        }}>
          <ListItemIcon>
            <Gavel fontSize="small" />
          </ListItemIcon>
          Terms of use
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/settings", {replace:true});
        }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => {
          navigate("/purchasehistory", {replace:true});
        }}>
          <ListItemIcon>
            <ShoppingBasket fontSize="small" />
          </ListItemIcon>
          Purchase history
        </MenuItem>
        <MenuItem onClick={() => {
          sessionStorage.clear();
        }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </ThemeProvider>
    </React.Fragment>
  );
}
