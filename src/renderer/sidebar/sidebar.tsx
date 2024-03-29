import './sidebar.scss';
import { faArrowRightToBracket, faCog, faLocationDot, faPlus, faScroll } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { PageButton } from "./page-button";
import React, { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ConfigChooser } from "./config-chooser";
import { ConfigChooserModalProvider } from "./config-chooser.modal.context";
import { EndpointsList } from "../pages/endpoints/endpoints.list";
import { makeTabSetup, PageCode } from "../pages/tab-setup";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useContextMenu } from "../common/context-menu/context-menu.context";
import { ContextMenuItem } from "../common/context-menu/context-menu";
import { Endpoints, fromOpenApi } from "../pages/endpoints/endpoints.utils";
import { EnvConfig, useSpaces } from "../common/spaces.context";
import { upload } from "../app";
import { EnvTabContent } from "../pages/env/env.tab-content";

const pageIcons: { icon: IconDefinition, code: PageCode }[] = [
    { icon: faCog, code: 'settings' },
    { icon: faLocationDot, code: 'endpoints' },
    { icon: faScroll, code: 'scenarios' },
];

const configChoosersSize = 50;

export function Sidebar() {
    const [_, setDummy] = useState(0);
    const defaultPage = 1;
    const { spaces, addEndpoints, baseUrl, getActiveConfig, setActiveConfig } = useSpaces();
    const { invokeContextMenu } = useContextMenu();
    const [selectedPageIndex, setSelectedPageIndex] = useState(defaultPage);

    const addEndpointsAndReload = (newEndpoints: Endpoints) => {
        addEndpoints(newEndpoints);
        setDummy(x => x + 1);
    };

    const openEnvTab = () => {
        const myConfig = getActiveConfig(['envs']) as EnvConfig;
        const tabSetup = makeTabSetup<EnvTabContent>('envs', myConfig.name, `env_${ myConfig.name }`, true, {
            env: myConfig.name,
            tabs: {
                Variables: { content: JSON.stringify(myConfig.values) },
            }
        });
        window.dispatchEvent(new CustomEvent('open_tab', { detail: tabSetup }));
    }

    return <div id="configChooserModalParent"
                style={ {
                    fontSize: '2rem',
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateAreas: `
            'pages config'
            'pages content'`,
                    gridTemplateColumns: 'min-content auto',
                    gridTemplateRows: `${ configChoosersSize }px calc(100vh - ${ configChoosersSize }px)`,
                    position: 'relative',
                } }>
        <ul style={ {
            fontSize: '3rem',
            gridArea: 'pages',
            listStyleType: 'none',
            padding: '0',
            margin: '0',
        } }>
            { pageIcons.map((x, i) =>
                <li key={ `page-icon-${ i }` }>
                    <PageButton { ...x }
                                isSelected={ i === selectedPageIndex }
                                onClick={ () => {
                                    setSelectedPageIndex(i);
                                } }/>
                </li>
            ) }
        </ul>

        <div style={ {
            gridArea: 'config',
            display: 'flex',
            justifyContent: 'space-between',
        } }>
            <ConfigChooserModalProvider parent={ () => document.getElementById('configChooserModalParent') }>
                <ConfigChooser label={ 'Space' }
                               onClose={ (value, index) => setActiveConfig([], value) }
                               configKeyPath={ [] }/>
                { spaces.length > 0
                    ? <div style={ { display: 'flex', flexDirection: 'row' } }>
                        <ConfigChooser label={ 'Env' }
                                       style={ { paddingRight: '0.25em' } }
                                       configKeyPath={ ['envs'] }
                                       onClose={ (chosen) => {
                                           if (chosen) {
                                               setActiveConfig(['envs'], chosen)
                                               openEnvTab();
                                           }
                                       } }/>
                        <button className="config-chooser"
                                style={ {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    userSelect: 'none',
                                    borderRadius: 'var(--border-radius)',
                                    padding: '1em',
                                    paddingLeft: '0.25em',
                                    margin: '0.1em 0',
                                    color: !baseUrl ? 'var(--red-color)' : 'unset',
                                    border: 'none',
                                    cursor: 'pointer',
                                } }
                                onClick={ openEnvTab }>
                            <FontAwesomeIcon style={ { margin: 'auto' } }
                                             icon={ faRectangleList }/>
                        </button>
                    </div>
                    : null }
            </ConfigChooserModalProvider>
        </div>

        <div style={ {
            gridArea: 'content',
            borderRadius: 'var(--border-radius)',
            backgroundColor: 'var(--theme-bc-2)',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '30px auto calc(100% - 31px)',
        } }>
            <div style={ { margin: '0 1em', display: 'flex', justifyContent: 'space-between' } }>
                <b style={ { margin: 'auto 0' } }>{ pageIcons[selectedPageIndex].code }</b>
                <div style={ {
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                } }>
                    { getEndpointActions(pageIcons[selectedPageIndex].code, invokeContextMenu, addEndpointsAndReload).map(y =>
                        <div className="sidebar-action-button"
                             key={ y.title }
                             style={ {
                                 padding: '0 calc(var(--app-gap) / 2)',
                                 cursor: 'pointer',
                                 height: '100%',
                                 display: 'flex'
                             } }
                             title={ y.title }
                             onClick={ e => y.action(e.nativeEvent) }>
                            <FontAwesomeIcon { ...y.icon } style={ { margin: 'auto' } }/>
                        </div>) }
                </div>
            </div>
            <hr style={ {
                border: 'none',
                borderTop: '1px solid var(--theme-bc)',
                margin: '0',
            } }/>
            <div style={ { overflowX: 'auto' } }>
                <ul className="sidebar-content"
                    style={ {
                        listStyleType: 'none',
                        padding: '0',
                        margin: '0.5em 1em',
                    } }>
                    { renderList(pageIcons[selectedPageIndex].code) }
                </ul>
            </div>
        </div>
    </div>
}

function renderList(pageCode: string) {
    switch (pageCode) {
        case 'settings':
            return <div></div>
        case 'endpoints':
            return <EndpointsList/>
        case 'scenarios':
            return <div></div>
    }
}

function getEndpointActions(code: PageCode,
                            invokeContextMenu: (event: MouseEvent, items: ContextMenuItem[]) => void,
                            addEndpoints: (newEndpoints: Endpoints) => void): {
    action: (event: MouseEvent) => void,
    title: string,
    icon: FontAwesomeIconProps
}[] {
    switch (code) {
        case "settings":
            return [];
        case "endpoints":
            return [{
                icon: { icon: faArrowRightToBracket, transform: { rotate: 90 } },
                title: 'Import API specs',
                action: (event: MouseEvent) => invokeContextMenu(event, [{
                    label: 'Import OpenAPI specs',
                    action: () => openFileUploadWindow(['.json'], fromOpenApi, addEndpoints)
                }, {
                    label: 'Import some other specs',
                    action: () => openFileUploadWindow(['.json'], x => {return {}}, addEndpoints)
                }])
            }, {
                icon: { icon: faPlus },
                title: 'New tab',
                action: (event: MouseEvent) => {}
            }];
        case "scenarios":
            return [];
    }
}

function openFileUploadWindow(formats: string[],
                              callback: (apiSpecs: { [p: string]: any }) => Endpoints,
                              addEndpoints: (newEndpoints: Endpoints) => void) {
    upload(formats, e => handleFileSelect(e, callback, addEndpoints));
}

function handleFileSelect(event: Event,
                          process: (apiSpecs: { [p: string]: any }) => Endpoints,
                          addEndpoints: (newEndpoints: Endpoints) => void) {
    const selectedFile = (event.target as HTMLInputElement).files[0];
    selectedFile.text().then(content => {
        switch (selectedFile.type) {
            case 'application/json':
                const json = JSON.parse(content);
                console.log(content, json);
                const endpoints = process(json);
                addEndpoints(endpoints);
                break;
            case 'application/xml':
                break;
            default:
                console.error(`File type ${ selectedFile.type } is not supported`);
                break;
        }
    })
}