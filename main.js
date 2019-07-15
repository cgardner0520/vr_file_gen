'use strict'

const { app, BrowserWindow } = require('electron');

// For development -- automatically reloads changes w/o restarting the app
require('electron-reload')(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`)
});

// Create a global ref of the app window so it isn't garbage collected
let win;

function createWindow() {
	// Create the browser window
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		show: false
	});

	// Load the index.html for the app
	win.loadFile('./src/html/index.html');

	// Show dev tools (for debugging)
	// win.webContents.openDevTools();

	win.once('ready-to-show', () => {
		win.show();
	});

	// Dereference the window object when the window is closed
	win.on('closed', () => {
		win = null;
	});
}

// Create the app window once Electron has finished initializing
app.on('ready', createWindow);

// Quit the app once all related windows are closed
app.on('window-all-closed', () => {
	// macOS users must explicitly quit with cmd + q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// macOS users can recreate the window if they haven't
	// explicitly quit the app but no app windows are open
	if (win === null) {
		createWindow();
	}
});