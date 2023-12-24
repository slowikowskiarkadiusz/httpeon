import { HttpCallParams } from "../../index";

const ipcRenderer = window.require('electron').ipcRenderer;

export function callHttp(params: HttpCallParams): Promise<Response> {
    return new Promise<Response>(resolve => {
        ipcRenderer.send('make-request', { ...params });
        ipcRenderer.on('request-response', (event, response) => {
            resolve(response);
        });
    })
}

// export function callHttp(input: RequestInfo, init?: RequestInit): Promise<Response> {
//     return fetch(input, init);
// }