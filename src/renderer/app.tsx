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
                    columnGap: '10px',
                    backgroundColor: 'var(--theme-bc)',
                    color: 'var(--theme-font-color)',
                    gridTemplateColumns: 'min-content auto',
                } }>
                    <div className="barleft">
                        <Sidebar/>
                    </div>
                    <div className="content">
                        <TabProvider>
                            <Page/>
                        </TabProvider>
                    </div>
                </div>
            </SpacesProvider>
        </ContextMenuProvider>
    );
}