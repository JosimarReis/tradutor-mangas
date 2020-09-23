const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");

let win;
var state = {
  model: "",
  caminho: {
    local: "",
    pastas: [],
    arquivos: {
      imagens: 0,
      pdfs: 0,
    },
  },
  progresso: {
    sucesso: 0,
    parar: false,
    progresso: 0,
    atual: 0,
    total: 0,
    progresso2: 0,
    atual2: 0,
    total2: 0,
    loading: false,
    pdf: false,
  },
  options: {
    imagens: false,
    pdf: false,
  },
  logs: ["Arguardando seleção da pasta..."],
  logText: "Arguardando seleção da pasta...",
};
function createWindow() {
  // BrowserWindow.addDevToolsExtension(
  // path.join('', './src/security/nhmnbfancnhcmiboehcofmonfaodamlb')
  // )
  win = new BrowserWindow({
    width: 1024,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
    show: false,
  });
  //icon:'./public/assets/icon.ico'
  // win.show();
  win.loadFile("./src/layout/index.html");

  // Open the DevTools.
  win.webContents.openDevTools();
  win.on("ready-to-show", () => {
    win.webContents.send("state", state);

    win.show();
  });
  win.on("closed", () => {
    win = null;
  });
}
app.allowRendererProcessReuse = true;
app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

//TROCA DE INFORMACOES
ipcMain.on("state", (event, stateEvent) => {
  state = stateEvent;
  console.log("main", state);

  win.webContents.send("state", state);
});
