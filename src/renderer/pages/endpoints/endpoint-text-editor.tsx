import React, { Component } from 'react';

const displayModes = ['default', 'json'];
type DisplayMode = typeof displayModes[number];

interface EndpointTextEditorProps {
    data: { [p: string]: string };
}

interface EndpointTextEditorState {
    currentTab: string;
    displayMode: DisplayMode;
}

export class EndpointTextEditor extends Component<EndpointTextEditorProps, EndpointTextEditorState> {
    constructor(props: EndpointTextEditorProps) {
        super(props);
        this.state = {
            currentTab: Object.keys(props.data)[0],
            displayMode: 'default',
        };
    }

    render() {
        const { data } = this.props;
        const { currentTab, displayMode } = this.state;

        return (
            <div style={ {
                fontSize: '2rem',
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
                    { Object.keys(data).map((key, i, c) => (
                        <div
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
                            onClick={ () => this.setCurrentTab(key) }>
                            <button
                                style={ {
                                    backgroundColor: 'transparent',
                                    color: 'unset',
                                    border: 'none',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    width: '100%',
                                    overflow: 'hidden',
                                } }>
                                { key }
                            </button>
                        </div>
                    )) }
                </div>
                <div style={ { height: '100%', overflow: 'hidden' } }>{ this.renderContent() }</div>
                <div>
                    <select
                        style={ {
                            height: '100%',
                            border: 'none',
                            fontSize: '2rem',
                            color: 'var(--theme-font-color)',
                            backgroundColor: 'var(--theme-bc-2)',
                            padding: '0.5em',
                            textAlign: 'center',
                        } }
                        onChange={ (e) => this.setDisplayMode((e.nativeEvent.target as HTMLInputElement).value as DisplayMode) }>
                        { displayModes.map((x) => (
                            <option value={ x }
                                    key={ x }>
                                { x }
                            </option>
                        )) }
                    </select>
                </div>
            </div>
        );
    }

    setCurrentTab(tab: string) {
        this.setState({ currentTab: tab });
    }

    setDisplayMode(mode: DisplayMode) {
        this.setState({ displayMode: mode });
    }

    renderContent() {
        const { displayMode } = this.state;

        switch (displayMode) {
            case 'default':
                return this.renderContentAsDefault();
            case 'json':
                return this.renderContentAsJson();
            default:
                return null;
        }
    }

    renderContentAsDefault() {
        const { data } = this.props;
        const { currentTab } = this.state;

        let content = JSON.parse(data[currentTab]);

        const inputStyle = {
            width: '100%',
            backgroundColor: 'var(--theme-bc-2)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'none',
            border: 'none',
            padding: '0.5em',
            fontFamily: 'Menlo',
            color: 'var(--theme-font-color)',
            outline: 'none',
            fontSize: '2rem',
        };
        console.log(content, Object.keys(content));

        return <table className="endpoint-table"
                      style={ { width: '100%' } }>
            <tr>
                <th style={ { width: '25%' } }>Name</th>
                <th style={ { width: 'auto' } }>Value</th>
                <th style={ { width: '3em' } }>On</th>
            </tr>
            { Object.keys(content)
                .map(x => {
                    return <tr key={ x }>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   style={ inputStyle }
                                   defaultValue={ x }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   style={ inputStyle }
                                   defaultValue={ content[x] }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="checkbox"
                                   style={ inputStyle }
                                   defaultValue={ 'false' }/>
                        </td>
                    </tr>
                }) }
        </table>;
    }

    renderContentAsJson() {
        const { data } = this.props;
        const { currentTab } = this.state;

        let content = '';
        try {
            content = JSON.stringify(JSON.parse(data[currentTab]), null, 2);
        } catch (err) {
            content = data[currentTab];
        }

        return (
            <textarea
                style={ {
                    height: '100%',
                    width: '100%',
                    color: 'var(--theme-font-color)',
                    backgroundColor: 'var(--theme-bc-3)',
                    border: 'none',
                    padding: '1em',
                } }
                defaultValue={ content }
                key={ content }
                onChange={ (e) => (data[currentTab] = e.target.value) }></textarea>
        );
    }
}
