import { faCog, faLocationDot, faScroll } from "@fortawesome/free-solid-svg-icons";
import { PageButton } from "./page-button";
import { useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ConfigChooser } from "./config-chooser";
import { ConfigChooserModalProvider } from "./config-chooser.modal.context";
import { Endpoints } from "./lists/endpoints";

type PageCode = 'settings' | 'endpoints' | 'scenarios';

const pageIcons: { icon: IconDefinition, code: PageCode }[] = [
    { icon: faCog, code: 'settings' },
    { icon: faLocationDot, code: 'endpoints' },
    { icon: faScroll, code: 'scenarios' },
];

export function Sidebar(props: { onPageSelect: (pageCode: PageCode) => void }) {
    const defaultPage = 1;
    const [selectedPageIndex, setSelectedPageIndex] = useState(defaultPage);

    useEffect(() => props.onPageSelect(pageIcons[defaultPage].code), []);

    return <div id="configChooserModalParent"
                style={ {
                    fontSize: '2rem',
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateAreas: `
            'pages config'
            'pages content'`,
                    gridTemplateColumns: 'min-content 1fr',
                    gridTemplateRows: 'min-content 1fr',
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
                                    props.onPageSelect(x.code);
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
            backgroundColor: 'var(--theme-background-color-2)'
        } }>
            <div style={ { margin: '0.5em 1em', } }><b>{ pageIcons[selectedPageIndex].code }</b></div>
            <hr style={ {
                border: 'none',
                borderTop: '1px solid var(--theme-background-color)',
                margin: '0',
            } }/>
            <div style={ { overflowX: 'scroll' } }>
                <ul style={ {
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
            return <Endpoints/>
        case 'scenarios':
            return <div></div>
    }
}