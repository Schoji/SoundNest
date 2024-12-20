/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { backend_address } from '../renderer/Components/global';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let loginWindow: BrowserWindow | null = null
let splashWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: '#FFFFFF',
      height: 60,
    },
    width: 1280,
    minWidth: 770,
    height: 768,
    minHeight: 625,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.on('close', () => {
    mainWindow = null;
    app.quit()
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  new AppUpdater();
};



const createLoginWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  loginWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: '#FFFFFF',
      height: 60,
    },
    width: 450,
    minWidth: 450,
    maxWidth: 450,
    height: 700,
    minHeight: 700,
    maxHeight: 700,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  loginWindow.loadURL(resolveHtmlPath('index.html', 2));

  loginWindow.once('ready-to-show', () => {
      splashWindow?.hide();
      splashWindow?.webContents.closeDevTools();
      loginWindow?.show();
      ipcMain.emit("loginWindowCreated", true)
  });

  loginWindow.on('closed', () => {
    loginWindow = null;
    app.exit()
  });
  loginWindow.on("close", function () {
    app.quit()
  })

  // Open urls in the user's browser
  loginWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};
const createSplashWindow = async() => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  splashWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    width: 240,
    height: 320,
    maxWidth: 240,
    maxHeight: 320,
    resizable: false,
    maximizable: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      devTools: false,
      preload: app.isPackaged
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, '../../.erb/dll/preload.js'),
      }

  });
    splashWindow.loadFile(resolveHtmlPath('splash.html'))


    splashWindow.on("close", function () {
      app.quit()
    })
}


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
  app.quit();
});

app
  .whenReady()
  .then(() => {
    createSplashWindow();
    loginWindow?.hide();
    createLoginWindow()


    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(error => console.log(error));

ipcMain.once("loginWindowCreated", async (event, arg) => {
  loginWindow?.webContents
    .executeJavaScript('localStorage.getItem("token");', true)
    .then(token => {
      console.log("Executing TokenLogin")
      console.log("TOKEN:", token)
      if (token !== "undefined" && token !== null && token !== "None")
      ipcMain.emit("open-main-window-token", token)
    })
  console.log("Login window created")
})


ipcMain.on('open-main-window-token', (token) => {
  console.log("Logged with token.")
  fetch(backend_address + "/api/user_with_token/" + token)
  .then(response => response.json())
  .then(data => {
    loginWindow?.hide();
    loginWindow?.webContents.closeDevTools();
    createWindow()
    ipcMain.on("did-finish-load", async (event, arg) => {
      console.log("finished loading..")
      mainWindow?.webContents.on("dom-ready", () => {
        mainWindow?.webContents.send("soundnest-ipc", JSON.stringify(data))
        mainWindow?.show()
      })
    })
  })

})

ipcMain.on('open-login-window', async (event, arg) => {
  mainWindow?.hide();
  loginWindow?.webContents.executeJavaScript('localStorage.clear();');
  mainWindow?.webContents.closeDevTools();
  createLoginWindow();
  })


ipcMain.on('open-main-window', async (event, creds) => {
  loginWindow?.hide();
  loginWindow?.webContents.closeDevTools();
  createWindow()
  ipcMain.on("did-finish-load", async (event, arg) => {
    console.log("finished loading..")
    mainWindow?.webContents.on("dom-ready", () => {
    mainWindow?.webContents.send("soundnest-ipc", creds)
    })
  })
})
