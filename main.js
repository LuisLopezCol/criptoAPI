//Importing the objects from electron
const { app, ipcMain, BrowserWindow } = require("electron");
let appWin; //To store the window

//Creating the window and its properties.
createWindow = () => {
  appWin = new BrowserWindow({
    width: 500,
    height: 800,
    x: 600,
    y: 0,
    backgroundColor: "#C2EABD",
    title: "The Bitcoin Data Analyst",
    icon: "file://${__dirname}/assets/bitcoin-icon.png",
  });

  //Loading the app from url
  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.setMenu(null);
  appWin.webContents.openDevTools(); //Chrome devtools
  appWin.on("closed", () => {
    appWin = null;
  });
};

//Creating the window on electron inizialization
app.on("ready", createWindow);

//Quit when all windos are closed
app.on("window-all-closed", () => app.quit());
