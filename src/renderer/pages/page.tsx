import { useTabs } from "../nav/tab.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { TabSetup } from "./tab-setup";

export function Page() {
    const { tabs, currentTabIndex, addTab, removeTab, setCurrentTab } = useTabs();

    useEffect(() => window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => addTab(e.detail as TabSetup<any>)), []);

    return <div style={ {
        display: 'grid',
        gridTemplateRows: '2em calc(100% - 2em)',
    } }>
        <div style={ { display: 'grid', width: '100%', gridTemplateColumns: tabs.map((x, i, c) => `${ 100 / c.length }%`).join(' ') } }>
            { tabs.map((x, i, c) => <div
                key={ `page-tab-${ i }` }
                style={ {
                    display: 'grid',
                    gridTemplateColumns: '2em 1fr',
                    height: '100%',
                    textOverflow: 'ellipsis',
                    backgroundColor: currentTabIndex === i ? 'var(--theme-bc)' : 'var(--theme-bc-2)',
                    transition: 'width 0.2s ease-out, background-color 0.2s',
                    cursor: 'pointer',
                } }
                onClick={ () => setCurrentTab(i) }>
                <FontAwesomeIcon style={ { margin: 'auto', } }
                                 onClick={ () => removeTab(i) }
                                 icon={ faTimes }/>
                <span style={ { margin: 'auto', display: 'inline' } }>{ x.title }</span>
            </div>) }
        </div>
        <div>abc</div>
    </div>
}