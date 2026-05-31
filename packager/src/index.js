const { app, Menu, BrowserWindow, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const menuTemplate = require('./menu');
const { hasAcceptedLicense, saveLicenseAcceptance, showLicenseWindow } = require('./license');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const miyukiDist = process.env.MIYUKI_DIST || "pdep";

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  mainWindow.maximize();
  mainWindow.show();

  if (hasAcceptedLicense()) {
    startMiyuki();
  } else {
    showLicenseWindow(mainWindow);
  }
});

ipcMain.on('license-response', (event, accepted) => {
  if (accepted) {
    saveLicenseAcceptance();
    startMiyuki();
  } else {
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function startMiyuki() {
  mainWindow.loadFile(path.join(__dirname, 'loading/loading.html'));

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  })

  // TODO start runners
  // const dockerProcess = spawn("docker", [
  //   'compose',
  //   '-f', path.join(process.resourcesPath, 'docker', 'docker-compose.yml'),
  //   '-f', path.join(process.resourcesPath, 'docker', `docker-compose.${miyukiDist}.yml`),
  //   'up',
  //   '-d'
  // ])

  // dockerProcess.stdout.on('data', (data) => {
  //   sendLog(`[INFO] ${data.toString()}`);
  // });

  // dockerProcess.stderr.on('data', (data) => {
  //   sendLog(`[INFO] ${data.toString()}`)
  // });

  // dockerProcess.on('error', (error) => {
  //   sendLog(`[ERROR]: Error iniciando el subproceso: ${error.message}`);
  // });

  // dockerProcess.on('close', (code) => {
  //   if (code === 0) {
  //     sendLog(`[SUCCESS]: Containers iniciados correctamente.`);
  //     waitForServer("http://localhost:3000", () => {
  //       sendLog("Aplicación lista, cargando...");
  //       mainWindow.loadURL("http://localhost:3000");
  //     });
  //   } else {
  //     sendLog(`[CRITIC]: Código de error: ${code}.`);
  //   }
  // });

  // TODO remove
  mainWindow.webContents.openDevTools()
  // TODO this won't probably work
  mainWindow.loadFile(path.join(__dirname, '../miyuki-laboratory/index.html'));
}

function sendLog(message) {
  mainWindow.webContents.send('log-message', message);
}

function waitForServer(url, callback) {
  const interval = setInterval(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          clearInterval(interval);
          callback();
        }
      })
      .catch(() => sendLog("Esperando a que el servidor esté disponible."));
  }, 3000);
}