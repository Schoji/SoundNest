import { createRoot } from 'react-dom/client';
import App from './App';
import { useEffect } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { lime, purple } from '@mui/material/colors';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <App />
);
const view = String(global.location.search).slice(-1)
console.log(view)
// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('soundnest-ipc', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
window.electron.ipcRenderer.sendMessage('did-finish-load', "yes");

