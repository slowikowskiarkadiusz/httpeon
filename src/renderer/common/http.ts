// import { HttpCallParams } from "../../index";
// import { ipcRenderer } from 'electron';
// //
// // const { ipcRenderer } = window.require('electron');
//
// export function callHttp(params: HttpCallParams): Promise<Response> {
//     return new Promise<Response>(resolve => {
//         ipcRenderer.send('make-request', { ...params });
//         ipcRenderer.on('request-response', (event, response) => {
//             console.log('Response from main process:', response);
//             resolve(response);
//         });
//     })
// }
//
// // export function callHttp(input: RequestInfo, init?: RequestInit): Promise<Response> {
// //     return fetch(input, init);
// // }