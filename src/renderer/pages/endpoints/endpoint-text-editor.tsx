import { useState } from "react";

const displayModes = ['default', 'json']
type DisplayMode = typeof displayModes[number];

export function EndpointTextEditor(props: { data: { [p: string]: string } }) {
    const [currentTab, setCurrentTab] = useState(Object.keys(props.data)[0])
    const [displayMode, setDisplayMode] = useState<DisplayMode>('default');

    return <div style={ {
        height: '100%',
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: 'min-content auto min-content',
        backgroundColor: 'var(--theme-bc-3)',
    } }>
        <div style={ {
            display: 'flex',
            width: '100%',
            overflow: 'scroll',
            minHeight: '3em',
        } }>
            { Object.keys(props.data).map((key, i, c) => <div
                key={ `page-tab-${ i }` }
                style={ {
                    width: `${ 100 / c.length }%`,
                    backgroundColor: currentTab === key ? 'var(--theme-bc-3)' : 'var(--theme-bc-2)',
                    transition: 'width 0.2s ease-out, background-color 0.2s',
                    cursor: 'pointer',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0.5em',
                } }
                onClick={ () => setCurrentTab(key) }>
                <button style={ {
                    backgroundColor: 'transparent', color: 'unset', border: 'none', cursor: 'pointer', textAlign: 'center', width: '100%', overflow: 'hidden',
                } }>
                    { key }
                </button>
            </div>) }
        </div>
        <div style={ { height: '100%', overflow: 'hidden' } }>
            { renderContent(props, currentTab, displayMode) }
        </div>
        <div>
            <select style={ {
                height: '100%',
                border: 'none',
                fontSize: '2rem',
                color: 'var(--theme-font-color)',
                backgroundColor: 'var(--theme-bc-2)',
                padding: '0.5em',
                textAlign: 'center',
            } }
                    onChange={ (e) => setDisplayMode((e.nativeEvent.target as HTMLInputElement).value as DisplayMode) }>
                { displayModes.map(x => <option value={ x }
                                                key={ x }>{ x }</option>) }
            </select>
        </div>
    </div>
}

function renderContent(props: { data: { [p: string]: string } }, currentTab: string, mode: DisplayMode,) {
    switch (mode) {
        case 'default':
            return renderContentAsDefault(props, currentTab);
            break;
        case 'json':
            return renderContentAsJson(props, currentTab);
    }
}

function renderContentAsDefault(props: { data: { [p: string]: string } }, currentTab: string) {
    return <></>;
}

function renderContentAsJson(props: { data: { [p: string]: string } }, currentTab: string) {
    let content = '';
    try {
        content = JSON.stringify(JSON.parse(props.data[currentTab]), null, 2);
    } catch (err) {
        content = props.data[currentTab];
    }
    return <textarea style={ {
        height: '100%',
        width: '100%',
        color: 'var(--theme-font-color)',
        backgroundColor: 'var(--theme-bc-3)',
        border: 'none',
        padding: '1em'
    } }
                     defaultValue={ content }
                     key={ content }
                     onChange={ e => props.data[currentTab] = e.target.value }></textarea>
}