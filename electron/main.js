// Versão desktop (Linux .deb): abre o jogo numa janela própria, sem barra de menus.
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 800, minHeight: 450, backgroundColor: '#050505', title: 'Entusiasta',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, backgroundThrottling: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  win.webContents.on('before-input-event', (e, input) => { if (input.key === 'F11' && input.type === 'keyDown') win.setFullScreen(!win.isFullScreen()); });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
