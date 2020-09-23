"use strict";

var _electron = _interopRequireDefault(require("electron"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

require("babel-polyfill");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var app = _electron["default"].app;
var BrowserWindow = _electron["default"].BrowserWindow;
var mainWindow;
var ipcMain = _electron["default"].ipcMain;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: _path["default"].join(__dirname, "/assets/icon.ico"),
    autoHideMenuBar: true,
    show: false,
    backgroundColor: "#fff"
  }); // and load the index.html of the app.
  /// mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.loadURL(_url["default"].format({
    pathname: _path["default"].join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));
  mainWindow.on("closed", function () {
    mainWindow = null;
  }); // Open the DevTools.

  mainWindow.on("ready-to-show", function () {
    mainWindow.show();
  });
  mainWindow.webContents.openDevTools();
} // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.


app.on("ready", createWindow); // Quit when all windows are closed.

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});
app.allowRendererProcessReuse = true; // In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
///logs

ipcMain.on("state", function (event, state) {
  console.log("main.js", state);
  mainWindow.webContents.send("state", state);
});