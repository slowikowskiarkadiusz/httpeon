import './index.scss';
import { Sidebar } from './sidebar/sidebar';
import { SpacesProvider } from "./common/spaces.context";
import { ContextMenuProvider } from "./common/context-menu/context-menu.context";
import { Page } from "./pages/page";

export function App() {
    return (
        <ContextMenuProvider>
            <SpacesProvider>
                <div id="context-menu-parent"
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
    );
}

export function dispatchUpdateCacheEvent(){
    window.dispatchEvent(new CustomEvent('update_spaces_cache', {}));
}