'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
var configuration = require('./configuration');
var ipc = require('ipc');

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  if (configuration.readSettings('pantalla-Id')) {

  }
  mainWindow = new BrowserWindow({
    fullscreen:true,
    });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


function setGlobalInfo() {
    globalInfo.unregisterAll();

    var IdKey = configuration.readSettings('pantalla-Id');
    var CategoriaKey = configuration.readSettings('pantalla-Categoria');
    var UbicacionKey = configuration.readSettings('pantalla-Ubicacion');
    var LatKey = configuration.readSettings('pantalla-Lat');
    var LngKey = configuration.readSettings('pantalla-Lng');

    globalInfo.register(IdKey, function () {
        mainWindow.webContents.send('global-info', 0);
    });
    globalInfo.register(CategoriaKey, function () {
        mainWindow.webContents.send('global-info', 1);
    });
    globalInfo.register(UbicacionKey, function () {
        mainWindow.webContents.send('global-info', 2);
    });
    globalInfo.register(LatKey, function () {
        mainWindow.webContents.send('global-info', 3);
    });
    globalInfo.register(LngKey, function () {
        mainWindow.webContents.send('global-info', 4);
    });
}

ipc.on('set-global-Info', function () {
    setGlobalInfo();
});
