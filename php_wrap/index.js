const { app, BrowserWindow }  = require ('electron');
const { ipcMain } = require('electron');
const { exec } = require('child_process');
const exePath = require('./config.json').exePath;

// 窗口实例保存在静态区防止被回收
let win;

// 创建窗口实例
function createWindow(){
    win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // 打开控制台
    win.webContents.openDevTools({'mod': 'bottom'});

    // 加载view
    win.loadFile('index.html');

    // 监听关闭应用
    win.on('close', () => {
        win = null;
    });
}

// 监听实例准备完成，创建窗口
app.on('ready', createWindow);

// 接收渲染进程产生的 PHP code
ipcMain.on('synchronous-message', (event, arg) => {
    exec(exePath + ' ./code.php', function(e, res){
        if(e){
            event.returnValue = e
        }
        event.returnValue = res
    });
});

// 子进程执行PHP
// exec('php.exe --help', function(e, date){
//     if(e){
//         console.log('执行错误:', e);
//     }
//     console.log(date);
// });


