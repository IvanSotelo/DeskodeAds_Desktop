'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    fullscreen:true,
    });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
