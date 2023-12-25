import "./page.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { TabSetup } from "./tab-setup";
import { Endpoint } from "./endpoints/endpoint";
import { useSpaces } from "../common/spaces.context";
import { fromEvent, throttleTime } from "rxjs";

let update_spaces_cache_event = undefined;

export function Page() {
    const { tabs, currentTabIndex, updateCache, addTab, removeTab, setCurrentTab, updateTab } = useSpaces();
    const [a, setA] = useState(0);

    if (!update_spaces_cache_event)
        update_spaces_cache_event = fromEvent(window, 'update_spaces_cache')
            .pipe(throttleTime(2000))
            .subscribe(() => updateCache());

    useEffect(() => window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => {
        setCurrentTab(addTab(e.detail as TabSetup<any>));
        setA(a + 1);
    }), []);

    return <div style={ {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--app-gap)',
        // gridTemplateRows: '3em calc(100vh - calc(3em + var(--app-gap))'
    } }>
        <div style={ {
            display: 'flex',
            width: '100%',
            overflow: 'scroll',
            height: 'min-content',
            flexShrink: 0,
        } }>
            { tabs().map((x, i, c) => <div
                key={ `page-tab-${ i }` }
                style={ {
                    width: `${ 100 / c.length }%`,
                    minWidth: '15em',
                    backgroundColor: currentTabIndex === i ? 'var(--theme-bc-3)' : 'var(--theme-bc-2)',
                    transition: 'width 0.2s ease-out, background-color 0.2s',
                    cursor: 'pointer',
                    flex: '1 0 auto',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    height: '3em',
                    display: 'flex',
                    flexDirection: 'row',
                } }
                onClick={ () => {
                    setCurrentTab(i);
                    setA(a + 1);
                } }>
                <FontAwesomeIcon className="tab-close"
                                 style={ { margin: 'auto 0.5em' } }
                                 onClick={ () => removeTab(i) }
                                 icon={ faTimes }/>
                <div style={ { display: 'flex', width: '100%', overflow: 'hidden', } }>
                    <span style={ {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        direction: 'rtl',
                        margin: 'auto',
                        width: '100%',
                    } }>
                        { x.title }
                    </span>
                </div>
            </div>) }
        </div>
        { renderContent(currentTabIndex > -1 ? tabs()[currentTabIndex] : null,
            (setup) => {
                updateTab(currentTabIndex, setup);
            }) }
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