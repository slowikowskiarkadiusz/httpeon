import './sidebar.scss';
import { faArrowRightToBracket, faCog, faLocationDot, faPlus, faScroll } from "@fortawesome/free-solid-svg-icons";
import { PageButton } from "./page-button";
import React, { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ConfigChooser } from "./config-chooser";
import { ConfigChooserModalProvider } from "./config-chooser.modal.context";
import { EndpointsList } from "../pages/endpoints/endpoints.list";
import { PageCode } from "../pages/tab-setup";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useContextMenu } from "../common/context-menu/context-menu.context";
import { ContextMenuItem } from "../common/context-menu/context-menu";

const pageIcons: { icon: IconDefinition, code: PageCode }[] = [
    { icon: faCog, code: 'settings' },
    { icon: faLocationDot, code: 'endpoints' },
    { icon: faScroll, code: 'scenarios' },
];

const configChoosersSize = 50;

export function Sidebar() {
    const defaultPage = 1;
    const { invokeContextMenu } = useContextMenu();
    const [selectedPageIndex, setSelectedPageIndex] = useState(defaultPage);

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
                <ConfigChooser label={ 'Space' }/>
                <ConfigChooser label={ 'Env' }
                               configKeyPath={ ['envs'] }/>
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
                    { getEndpointActions(pageIcons[selectedPageIndex].code, invokeContextMenu).map(y =>
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
                            invokeContextMenu: (event: MouseEvent, items: ContextMenuItem[]) => void): {
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
                    action: () => openFileUploadWindow(['.json'])
                }, {
                    label: 'Import some other specs',
                    action: () => openFileUploadWindow(['.json'])
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

function openFileUploadWindow(formats: string[]) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.accept = formats.join(', ');
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
    fileInput.addEventListener('change', handleFileSelect);
}

function handleFileSelect(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files[0];

    if (selectedFile) {
        console.log('Selected file:', selectedFile);
    }
}