import './index.scss';
import { Sidebar } from './sidebar/Sidebar';
import { useState } from "react";

export function App() {
    const [constr, setconstr] = useState('nothing??');
    return (
        <div className="app">
            <div className="barleft"><Sidebar onPageSelect={ (code) => setconstr(code) }/></div>
            <div className="content">
                { constr }
            </div>
        </div>
    );
}