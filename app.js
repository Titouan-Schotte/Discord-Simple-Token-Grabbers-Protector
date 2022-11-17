const {app, BrowserWindow, Menu, ipcMain, ipcRenderer, dialog, remote} = require('electron'),
    Store = require('electron-store'),
    store = new Store(),
    EventEmitter = require('events'),
    loadingEvents = new EventEmitter(),
    {exec,spawn, execFile} = require('child_process'),
    path = require("path"),
    url = require("url"),
    os = require("os"),
    fs = require("fs")
;

// Disable error dialogs by overriding
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};




const userInfo = os.userInfo();
var timeout = 5000;
var timerIn = null;
//       //
//Windows//
//       //


//CREATE LOADING SCREEN
const createLoadScreen = () => new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    },
    center: true,
    resizable: false,
    frame: false,
    width: 250,
    height: 300,
    show: false,

})



//Create Main
function createMainWindow() {
    timeout=store.get("timeout")
    let winMain = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, //this must be true
        },
        frame: true,
        width: 350,
        height: 450,
        resizable: false,
        center: true,
        title: 'Discord No Token Grabber',
        icon: 'assets/icon.png',
        show: false
    })
    const mainMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mainMenu)
    winMain.once('ready-to-show', () => {
        winMain.show()
    })
    winMain.loadURL(url.format({pathname: path.join(__dirname, 'windows/mainWindow.html'), protocol: 'file:', slashes:true}));

    winMain.on('close', function () {
        app.quit()
    })
}

//              //
//PROG PRINCIPAL//
//              //
app.whenReady().then(async () => {
    createMainWindow()


})


const command = (commandLine, errorMessage, isFinish,event,normalError) => {
    execFile(commandLine, [],(error, stdout, stderr) => {
        if (error&&!normalError) {
            event.sender.send("error",errorMessage);
            event.sender.send("logger","Exception : "+errorMessage);
            return;
        } else {
            isFinish();
        }
    });

}

function startInterval(event){
    event.sender.send("logger","New Cleaner every "+timeout/1000+"s");
    timerIn = setInterval(() => {
        event.sender.send("logger","Token Auto-Cleaned !");
        command('C:\\ProgramData\\'+userInfo.username+'\\Discord\\Update.exe',"I cannot access the following file : C:\\ProgramData\\"+userInfo.username+"\\app-1.0.9007\\Update.exe\nI need to access to this file to launch your discord !", ()=>{},event,true)
    }, timeout);

}
const directories = source => fs.readdirSync(source, {
    withFileTypes: true
}).reduce((a, c) => {
    c.isDirectory() && a.push(c.name)
    return a
}, [])
ipcMain.on('secure-launch', async (event, args) => {
    event.sender.send("logger","Launch Discord");
    if(timerIn!=null){
        clearInterval(timerIn)
    }
    if(store.get("timeout")!="OFF"){
        startInterval(event);
    }
    var dirs = directories('C:\\ProgramData\\'+userInfo.username+'\\Discord\\');
    var appDir
    for(var dir=0;dir<dirs.length;dir++){
        if(dirs[dir].includes("app")){
            appDir=dirs[dir]
        }
    }
    command('C:\\ProgramData\\'+userInfo.username+'\\Discord\\'+appDir+'\\Discord.exe', "I cannot access the following file : C:\\ProgramData\\"+userInfo.username+"\\app-1.0.9007\\Discord.exe\nI need to access to this file to launch your discord !", () => {},event,false)

})

ipcMain.on('clean-now', async (event, args) => {
    event.sender.send("logger","Token Cleaned !");

    command('C:\\ProgramData\\'+userInfo.username+'\\Discord\\Update.exe',"I cannot access the following file : C:\\ProgramData\\"+userInfo.username+"\\app-1.0.9007\\Discord.exe\nI need to access to this file to launch your discord !", ()=>{},event,true)
})

ipcMain.on('change-timeout',async (event, args) => {
    store.set("timeout", args)
    if(args=="OFF"){
        clearInterval(timerIn)
        event.sender.send("logger","Disable Token auto-clean \nWARNING : You must activate the autocleaner when you launch discord otherwise your Token will have a chance to be grabbed for a short time.");
        return
    }
    timeout=args;
    clearInterval(timerIn)
    startInterval(event)
})