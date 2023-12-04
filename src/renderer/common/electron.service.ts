import * as childProcess from 'child_process';
import { ipcRenderer, webFrame } from 'electron';
import * as fs from 'fs';
import { ConsoleResponse } from "../git/models";

export interface ConsoleResponse {
    date: string;
    command: string;
    exit_status: number;
    stdout: string;
    stderr: string;
}

export class ElectronService {
    private readonly ipcRenderer?: typeof ipcRenderer;
    private readonly webFrame!: typeof webFrame;
    private readonly childProcess!: typeof childProcess;
    private readonly fs?: typeof fs;

    constructor() {
        if (!!(window?.process?.type)) { // isElectron
            this.ipcRenderer! = window.require('electron').ipcRenderer;

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }

    public async invokeGit(command: string, path?: string, withoutOutput?: boolean): Promise<ConsoleResponse> {
        return await this.ipcRenderer!.invoke('run-git', command, path, { withoutOutput: withoutOutput });

        // return new Promise<ConsoleResponse>((resolve, reject) => {
        //     this.childProcess.exec(`git ${command}`, { cwd: path }, (error: any, stdout: any, stderr: any) => {
        //         return resolve({ command: command, stdout: stdout, stderr: stderr });
        //     });
        // });
    }

    public async doesDirExist(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => { return resolve(this.fs?.existsSync(path) ?? false); });
    }
}
