'use strict'

const { app, BrowserWindow } = require('electron');

// Create a global reference of the window object.
// This prevents the app from being closed when the JS
// obj is garbage collected.
let win;


function createWindow() {
	// Create the browser window
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	// Load the index.html for the app
	win.loadFile('./src/html/index.html');

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