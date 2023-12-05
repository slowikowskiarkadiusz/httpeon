import { faCog, faLocationDot, faScroll } from "@fortawesome/free-solid-svg-icons";
import { PageButton } from "./PageButton";
import { useState } from "react";

const pageIcons = [
    { icon: faCog },
    { icon: faLocationDot },
    { icon: faScroll },
]

export function Sidebar() {
    const [selectedPageIndex, setSelectedPageIndex] = useState(1);

    return <div style={ {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateAreas: `
            'pages config'
            'pages content'`,
        gridTemplateColumns: 'min-content 1fr',
        gridTemplateRows: 'min-content 1fr'
    } }>
        <ul style={ {
            gridArea: 'pages',
            listStyleType: 'none',
            padding: '0',
            margin: '0',
        } }>
            { pageIcons.map((x, i) =>
                <li key={ `page-icon-${ i }` }>
                    <PageButton { ...x }
                                isSelected={ i === selectedPageIndex }
                                onClick={ () => setSelectedPageIndex(i) }/>
                </li>
            ) }
        </ul>

        <div style={ {
            gridArea: 'config',
        } }>

        </div>

        <div style={ {
            gridArea: 'content',
            backgroundColor: 'var(--theme-background-color-d1)',
        } }>

        </div>
    </div>
}