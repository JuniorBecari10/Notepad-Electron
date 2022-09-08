// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, MenuItem} = require("electron")
const path = require("path")

const template = [
    {
        label: "File",
        submenu: [
            {
                label: "New"
            },
            {
                label: "Open"
            },
            {
                type: "separator"
            },
            {
                label: "Save"
            },
            {
                label: "Save As"
            },
            {
                type: "separator"
            },
            {
                label: "Exit",
                click() {
                    app.quit()
                }
            },
        ]
    },
    {
        label: "Edit",
        submenu: [
            {
                role: "undo"
            },
            {
                role: "redo"
            },
            {
                type: "separator"
            },
            {
                role: "copy"
            },
            {
                role: "cut"
            },
            {
                role: "paste"
            },
            {
                type: "separator"
            },
            {
                role: "selectall"
            },
        ]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Zoom",
                submenu: [
                    {
                        role: "zoomin"
                    },
                    {
                        role: "zoomout"
                    },
                    {
                        role: "resetzoom"
                    }
                ]
            },
            {
               type: "separator"
            },
            {
                role: "reload"
            },
            {
                role: "togglefullscreen"
            }
        ]
    },
    {
        role: "window",
        submenu: [
            {
                role: "minimize"
            },
            {
                role: "close"
            }
        ]
    }
]

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile("index.html")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    // On macOS it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
