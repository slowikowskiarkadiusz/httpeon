import { app, BrowserWindow, ipcMain } from 'electron';
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
            webSecurity: false,
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

app.on('ready', () => {
    createWindow();

    ipcMain.on('make-request', (event, { url, method, body, headers }: HttpCallParams) => {
        const startTime = performance.now();

        const requestHeaders = new Headers();
        headers
            .filter(x => x[0] !== 'transfer-encoding')
            .forEach(header => requestHeaders.append(header[0], header[1]));
        const options = {
            method,
            body: undefined,
            headers: requestHeaders,
        };

        if (!['get', 'head'].includes(method.toLowerCase()))
            options.body = body;

        fetch(url, options).then(response => {
            const elapsedTime = performance.now() - startTime;
            let responseHeaders = [...response.headers];
            response.text().then(body => {
                event.sender.send('request-response', {
                    callResponse: {
                        status: response.status,
                        statusText: response.statusText,
                        body: body,
                        headers: responseHeaders,
                    },
                    execTime: elapsedTime,
                } as HttpCallResponse);
            });
        })
            .catch((err: Error) => {
                const elapsedTime = performance.now() - startTime;
                event.sender.send('request-response', {
                    internalError: err.message,
                    execTime: elapsedTime,
                } as HttpCallResponse)
            });
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

export interface HttpCallResponse {
    callResponse?: {
        status: number;
        statusText: string;
        body: string;
        headers: [string, string][];
    }
    internalError?: string;
    execTime: number;
}

export interface HttpCallParams {
    url: string,
    method: string,
    body?: string,
    headers: [string, string][],
}

// app.whenReady().then(() => {
//
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
