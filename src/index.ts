import { app, BrowserWindow, ipcMain, net } from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    // // Handle messages from the renderer process
    ipcMain.on('make-request', (event, { url, method, body, headers }: HttpCallParams) => {
        // Make an HTTP request using the net module
        const request = net.request({
            method,
            url,
        });

        if (body)
            request.write(JSON.stringify(body));
        if (headers)
            headers.forEach(pair => request.setHeader(pair.key, pair.value));

        // Listen for the response
        request.on('response', (response) => {
            let responseData = '';

            // Accumulate chunks of data
            response.on('data', (chunk) => {
                responseData += chunk;
            });

            // When the response is complete, send it back to the renderer process
            response.on('end', () => {
                event.sender.send('request-response', responseData);
            });
        });

        // Handle errors
        request.on('error', (error) => {
            console.error('HTTP request error:', error.message);
            event.sender.send('request-response', { error: error.message });
        });

        // End the request
        request.end();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


export interface HttpCallParams {
    url: string,
    method: string,
    body?: any,
    headers: { key: string, value: string }[],
}

// app.whenReady().then(() => {
//
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
