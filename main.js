const { app, BrowserWindow, ipcMain } = require('electron')
const osc = require('node-osc');
const PORT = 3333;
const oscClient = new osc.Client('localhost', PORT);

function createWindow () {
  console.log('hello');
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadFile('./camera.html');

  ipcMain.on('toOsc', (e, keypoints) => {
    console.log(keypoints);
    keypoints.forEach(keypoint => {
      const { position, score, part} = keypoint
      const path = '/' + part;
      const data = JSON.stringify({ position, score });
      oscClient.send(path, data);
    });
  });
}

app.on('ready', createWindow);
