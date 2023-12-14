import './index.scss';
import { Sidebar } from './sidebar/sidebar';
import { SpacesProvider } from "./common/spaces.context";
import { ContextMenuProvider } from "./common/context-menu/context-menu.context";
import { Page } from "./pages/page";
import { TabProvider } from "./nav/tab.context";

export function App() {
    return (
        <ContextMenuProvider>
            <SpacesProvider>
                <div id="context-menu-parent"
                     style={ { zIndex: 1, position: 'relative', width: '0', height: '0' } }></div>
                <div style={ {
                    fontSize: '2rem',
                    display: 'grid',
                    height: '100vh',
                    width: '100%',
                    columnGap: '10px',
                    backgroundColor: 'var(--theme-bc)',
                    color: 'var(--theme-font-color)',
                    gridTemplateColumns: 'var(--sidebar-content-size) auto',
                } }>
                    <div className="barleft">
                        <Sidebar/>
                    </div>
                    <div style={ {
                        flex: '0 1 auto',
                        width: 'calc(100% - var(--sidebar-content-size))'
                    } }>
                        <TabProvider>
                            <Page/>
                        </TabProvider>
                    </div>
                </div>
            </SpacesProvider>
        </ContextMenuProvider>
    );
}