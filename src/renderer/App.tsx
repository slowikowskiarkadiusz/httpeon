import './index.scss';
import { Sidebar } from './sidebar/Sidebar';
import { useState } from "react";
import { SpacesProvider } from "./common/spaces.context";

export function App() {
    const [constr, setconstr] = useState('nothing??');
    return (
        <SpacesProvider>
            <div style={ {
                fontSize: '2rem',
                display: 'grid',
                height: '100vh',
                columnGap: '10px',
                backgroundColor: 'var(--theme-background-color)',
                color: 'var(--theme-font-color)',
                gridTemplateColumns: 'var(--sidebar-size-px) auto',
            } }>
                <div className="barleft"><Sidebar onPageSelect={ (code) => setconstr(code) }/></div>
                <div className="content">
                    { constr }
                </div>
            </div>
        </SpacesProvider>
    );
}