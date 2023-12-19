import "./page.scss";
import { useTabs } from "../nav/tab.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { TabSetup } from "./tab-setup";
import { Endpoint } from "./endpoints/endpoint";

export function Page() {
    const { tabs, currentTabIndex, addTab, removeTab, setCurrentTab } = useTabs();

    useEffect(() => window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => setCurrentTab(addTab(e.detail as TabSetup<any>))), []);

    return <div style={ {
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
    } }>
        <div style={ {
            display: 'flex',
            width: '100%',
            overflow: 'scroll',
            minHeight: '3em',
        } }>
            { tabs.map((x, i, c) => <div
                key={ `page-tab-${ i }` }
                style={ {
                    width: `${ 100 / c.length }%`,
                    height: '100%',
                    minWidth: '15em',
                    backgroundColor: currentTabIndex === i ? 'var(--theme-bc-3)' : 'var(--theme-bc-2)',
                    transition: 'width 0.2s ease-out, background-color 0.2s',
                    cursor: 'pointer',
                    flex: 1, textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '1em',
                } }
                onClick={ () => setCurrentTab(i) }>
                <FontAwesomeIcon className="tab-close"
                                 style={ { margin: 'auto', marginRight: '0.5em' } }
                                 onClick={ () => removeTab(i) }
                                 icon={ faTimes }/>
                <div style={ { display: 'flex', width: '100%', overflow: 'hidden', } }>
                    <span style={ {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        direction: 'rtl',
                        width: '100%',
                    } }>
                        { x.title }
                    </span>
                </div>
            </div>) }
        </div>
        <div style={ { paddingRight: '10px' } }>{ renderContent(currentTabIndex > -1 ? tabs[currentTabIndex] : undefined) }</div>
    </div>
}

function renderContent(tabSetup?: TabSetup<any>) {
    switch (tabSetup?.pageCode) {
        case "settings":
            break;
        case "endpoints":
            return <Endpoint setup={ tabSetup }/>
        case "scenarios":
            break;
    }
}