// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, promptWindow, transferData = 0

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1920, height: 1080, minHeight: 720, minWidth: 720})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function promptModal(options, callback) {

  let opt = {
    width: options.width,
    height: options.height,
    title: options.title,
    resizable: false,
    alwaysOnTop: false,
    parent: mainWindow,
    show: false,
    fullscreen: false,
    webPreferences : { 
      nodeIntegration: true,
      sandbox: false 
    }   
  }
  promptWindow = new BrowserWindow(opt)
  promptWindow.loadFile(options.file)
  promptWindow.on('ready-to-show', () => promptWindow.show())
  promptWindow.on('closed', function () {
    promptWindow = null
    callback()
    transferData = 0
  })
}

ipcMain.on("newDialog", function (event, data) {
  promptModal(data, function () {
    event.returnValue = transferData
  })
})

ipcMain.on('closeDialog', function (event, data) {
  transferData = data
  promptWindow.close()
  promptWindow = null
})