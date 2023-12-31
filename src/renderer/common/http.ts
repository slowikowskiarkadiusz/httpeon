import { HttpCallParams, HttpCallResponse } from "../../index";

const ipcRenderer = window.require('electron').ipcRenderer;

export function callHttp(params: HttpCallParams): Promise<HttpCallResponse> {
    return new Promise<HttpCallResponse>(resolve => {
        ipcRenderer.send('make-request', { ...params });
        ipcRenderer.on('request-response', (event, response) => {
            console.log(response);
            resolve(response);
        });
    })
}

// export function callHttp(input: RequestInfo, init?: RequestInit): Promise<Response> {
//     return fetch(input, init);
// }