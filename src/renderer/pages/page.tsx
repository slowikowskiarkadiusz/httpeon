import "./page.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { TabSetup } from "./tab-setup";
import { Endpoint } from "./endpoints/endpoint";
import { useSpaces } from "../common/spaces.context";

export function Page() {
    const { tabs, currentTabIndex, addTab, removeTab, setCurrentTab, updateTab } = useSpaces();
    const [a, setA] = useState(0);

    useEffect(() => window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => {
        setCurrentTab(addTab(e.detail as TabSetup<any>));
        setA(a + 1);
    }), []);

    return <div style={ {
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        height: '100%',
    } }>
        <div style={ {
            display: 'flex',
            width: '100%',
            overflow: 'scroll',
            minHeight: '3em',
        } }>
            { tabs().map((x, i, c) => <div
                key={ `page-tab-${ i }` }
                style={ {
                    width: `${ 100 / c.length }%`,
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
        <div style={ { paddingRight: '10px', flex: '1 0 auto' } }>
            { renderContent(currentTabIndex > -1 ? tabs()[currentTabIndex] : null,
                (setup) => {
                    updateTab(currentTabIndex, setup);
                }) }
        </div>
    </div>
}

function renderContent(tabSetup: TabSetup<any> | null, updateSetup: (setup: TabSetup<any>) => void) {
    switch (tabSetup?.pageCode) {
        case "settings":
            break;
        case "endpoints":
            return <Endpoint setup={ tabSetup }
                             updateSetup={ updateSetup }/>
        case "scenarios":
            break;
    }
}