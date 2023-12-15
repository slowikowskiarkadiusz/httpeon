import { useTabs } from "../nav/tab.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { TabSetup } from "./tab-setup";

export function Page() {
    const { tabs, currentTabIndex, addTab, removeTab, setCurrentTab } = useTabs();

    useEffect(() => window.addEventListener('sidebar_list_item_selected', (e: CustomEvent) => addTab(e.detail as TabSetup<any>)), []);

    return <div style={ {
        display: 'flex',
        'flexDirection': 'column',
    } }>
        <div style={ { display: 'flex', width: '100%' } }>
            { tabs.map((x, i, c) => <div
                key={ `page-tab-${ i }` }
                className="kurwadzialaj"
                style={ {
                    width: `${ 100 / c.length }%`,
                    height: '100%',
                    backgroundColor: currentTabIndex === i ? 'var(--theme-bc)' : 'var(--theme-bc-2)',
                    transition: 'width 0.2s ease-out, background-color 0.2s',
                    cursor: 'pointer',
                    flex: 1, textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0.5em 1em',
                } }
                onClick={ () => setCurrentTab(i) }>
                <FontAwesomeIcon className="ikonka"
                                 style={ { margin: 'auto', marginRight: '0.5em' } }
                                 onClick={ () => removeTab(i) }
                                 icon={ faTimes }/>
                <div className="tekscik"
                     style={ { display: 'flex', width: '100%', } }>
                    <span style={ {
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    } }>
                        { x.title.substring(0, x.title.length / 2) }
                    </span>
                    <span style={ {
                        whiteSpace: 'nowrap',
                        direction: 'rtl',
                    } }>
                        { x.title.substring(x.title.length / 2, x.title.length) }
                    </span>
                </div>
            </div>) }
        </div>
        <div>abc</div>
    </div>
}