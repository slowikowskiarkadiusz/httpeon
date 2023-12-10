import './index.scss';
import { Sidebar } from './sidebar/sidebar';
import { useEffect, useState } from "react";
import { SpacesProvider } from "./common/spaces.context";
import { ContextMenuProvider } from "./common/context-menu/context-menu.context";

export function App() {
    const [contentPageCode, setContentPageCode] = useState('nothing??');
    const [selectedEndpoint, setSelectedEndpoint] = useState('');

    useEffect(() => window.addEventListener('endpoint_selected', (e: CustomEvent) => setSelectedEndpoint(JSON.stringify(e.detail))), []);

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
                        <Sidebar onPageSelect={ (code) => setContentPageCode(code) }/>
                    </div>
                    <div className="content">
                        { contentPageCode }
                        { selectedEndpoint }
                    </div>
                </div>
            </SpacesProvider>
        </ContextMenuProvider>
    );
}