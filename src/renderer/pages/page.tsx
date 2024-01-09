import "./page.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { TabSetup } from "./tab-setup";
import { Endpoint } from "./endpoints/endpoint";
import { useSpaces } from "../common/spaces.context";
import { debounceTime, fromEvent } from "rxjs";

let update_spaces_cache_event = undefined;
let a = 1;

export function Page() {
    const { tabs, currentTabIndex, updateCache, addTab, removeTab, setCurrentTab, updateTab } = useSpaces();
    const [_, setA] = useState(a);
    const tabsParentRef = useRef<HTMLDivElement>();

    if (!update_spaces_cache_event)
        update_spaces_cache_event = fromEvent(window, 'update_spaces_cache')
            .pipe(debounceTime(1000))
            .subscribe(() => updateCache());

    useEffect(() => {
        window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => {
            let targetIndex = tabs().findIndex(x => x.title == (e.detail as TabSetup<any>).title);
            if (targetIndex === -1)
                targetIndex = addTab(e.detail as TabSetup<any>);
            setCurrentTab(targetIndex);
            setTimeout(() => {
                if (tabsParentRef.current.children[targetIndex])
                    tabsParentRef.current.children[targetIndex].scrollIntoView({ behavior: 'smooth' })
            }, 1);
            setA(a *= -1);
        });

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'w' && (e.ctrlKey || e.metaKey)) {
                const currentIndex = tabs().findIndex(x => x.active);
                if (currentIndex > -1) {
                    removeTab(currentIndex);
                    setA(a *= -1);
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }
        })
    }, []);

    return <div style={ {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--app-gap)',
    } }>
        <div ref={ tabsParentRef }
             style={ {
                 display: 'flex',
                 width: '100%',
                 overflow: 'auto',
                 height: 'min-content',
                 flexShrink: 0,
             } }>
            { tabs().map((x, i, c) =>
                <div key={ `page-tab-${ i }` }
                     style={ {
                         width: `${ 100 / c.length }%`,
                         minWidth: '15em',
                         borderLeft: '1px solid var(--theme-bc-3)',
                         borderRight: '1px solid var(--theme-bc-3)',
                         backgroundColor: currentTabIndex === i ? 'var(--theme-bc)' : 'var(--theme-bc-3)',
                         transition: 'width 0.2s ease-out, background-color 0.2s',
                         cursor: 'pointer',
                         flex: '1 0 auto',
                         fontSize: '1.5rem',
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
                    <div style={ { display: 'flex', width: '100%', overflow: 'hidden', paddingRight: '1em' } }>
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