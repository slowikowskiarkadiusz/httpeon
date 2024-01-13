import './index.scss';
import { Sidebar } from './sidebar/sidebar';
import { SpacesProvider } from "./common/spaces.context";
import { ContextMenuProvider } from "./common/context-menu/context-menu.context";
import { Page } from "./pages/page";
import { ModalProvider } from "./common/modal/modal.context";

export function App() {
    return <ModalProvider parent={ () => document.getElementById("modal-parent") as HTMLDivElement }>
        <ContextMenuProvider>
            <SpacesProvider>
                <div id="modal-parent"
                     style={ { zIndex: 1, position: 'relative', width: '0', height: '0' } }></div>
                <div style={ {
                    fontSize: '2rem',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100vh',
                    width: '100%',
                    columnGap: 'var(--app-gap)',
                    backgroundColor: 'var(--theme-bc)',
                    color: 'var(--theme-font-color)',
                } }>
                    <div className="barleft"
                         style={ { width: 'var(--sidebar-content-size)' } }>
                        <Sidebar/>
                    </div>
                    <div style={ {
                        flex: '0 1 auto',
                        width: 'calc(100vw - calc(var(--app-gap) + var(--sidebar-content-size)))'
                    } }>
                        <Page/>
                    </div>
                </div>
            </SpacesProvider>
        </ContextMenuProvider>
    </ModalProvider>;
}

export function dispatchUpdateCacheEvent() {
    window.dispatchEvent(new CustomEvent('update_spaces_cache', {}));
}

export function download(filename: string, text: string) {
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }

    pom.remove();
}

export function upload(formats: string[], callback: (this: HTMLInputElement, ev: Event) => any) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.accept = formats.join(', ');
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
    fileInput.addEventListener('change', callback);
}

export function clamp(value: number, min: number, max: number): number {
    if (value < min)
        return min;
    else if (value > max)
        return max;
    else
        return value;
}