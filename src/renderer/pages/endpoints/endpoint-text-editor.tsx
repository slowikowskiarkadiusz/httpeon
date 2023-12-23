import React, { Component } from 'react';

const displayModes = { 'default': 0, 'text': 0 };
type DisplayMode = keyof typeof displayModes;
const textTypes = { 'json': 0, 'plain': 0, 'xml': 0 };
type TextType = keyof typeof textTypes;

interface ContentEntry {
    key: string;
    value: string;
}

interface EndpointTextEditorProps {
    data: { [p: string]: string };
}

interface EndpointTextEditorState {
    currentTab: string;
    displayMode: DisplayMode;
    textType: TextType;
}

export class EndpointTextEditor extends Component<EndpointTextEditorProps, EndpointTextEditorState> {
    constructor(props: EndpointTextEditorProps) {
        super(props);
        this.state = {
            currentTab: Object.keys(props.data)[0],
            displayMode: 'default',
            textType: 'json',
        };
    }

    render() {
        const { data } = this.props;
        const { currentTab, displayMode } = this.state;

        if (currentTab === 'Body' && displayMode !== 'text')
            this.setState({ displayMode: 'text' });

        const footerSelectStyle = { height: '100%', border: 'none', fontSize: '2rem', color: 'var(--theme-font-color)', backgroundColor: 'var(--theme-bc-2)', padding: '0.5em', textAlign: 'center' as any };

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
                    { currentTab !== 'Body'
                        ? <select
                            style={ footerSelectStyle }
                            defaultValue={ displayMode }
                            onChange={ (e) => this.setDisplayMode((e.nativeEvent.target as HTMLInputElement).value as DisplayMode) }>
                            { Object.keys(displayModes).map((x) => (
                                <option value={ x }
                                        key={ x }>
                                    { x }
                                </option>
                            )) }
                        </select>
                        : undefined }

                    {/*{ displayMode === 'text'*/ }
                    {/*    ?*/ }
                    {/*    <select*/ }
                    {/*        style={ footerSelectStyle }*/ }
                    {/*        onChange={ (e) => this.setState({ textType: ((e.nativeEvent.target as HTMLInputElement).value as TextType) }) }>*/ }
                    {/*        { Object.keys(textTypes).map((x) => (*/ }
                    {/*            <option value={ x }*/ }
                    {/*                    key={ x }>*/ }
                    {/*                { x }*/ }
                    {/*            </option>*/ }
                    {/*        )) }*/ }
                    {/*    </select>*/ }
                    {/*    : undefined }*/ }
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
            case 'text':
                return this.renderContentAsText();
            default:
                return null;
        }
    }

    lastInputRefs = { key: React.createRef<HTMLInputElement>(), value: React.createRef<HTMLInputElement>() };

    renderContentAsDefault() {
        const { data } = this.props;
        const { currentTab } = this.state;

        const content: ContentEntry[] = JSON.parse(data[currentTab]);

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

        return <table className="endpoint-table"
                      style={ { width: '100%' } }>
            <thead>
            <tr>
                <th style={ { width: '25%' } }>Key</th>
                <th style={ { width: 'auto' } }>Value</th>
                <th style={ { width: '3em' } }>On</th>
            </tr>
            </thead>
            <tbody>{ content
                .map((x, i, c) => {
                    return <tr key={ x.key + i }>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   ref={ this.lastInputRefs.key }
                                   style={ inputStyle }
                                   placeholder="key..."
                                   onChange={ e => {
                                       content[i].key = e.target.value;
                                       if (!content[i].key && !content[i].value) {
                                           content.splice(i, 1);
                                           setTimeout(() => this.forceUpdate(), 0);
                                       }
                                       data[currentTab] = JSON.stringify(content);
                                   } }
                                   defaultValue={ x.key }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   ref={ this.lastInputRefs.value }
                                   style={ inputStyle }
                                   placeholder="value..."
                                   onChange={ e => {
                                       content[i].value = e.target.value;
                                       if (!content[i].key && !content[i].value) {
                                           content.splice(i, 1);
                                           setTimeout(() => this.forceUpdate(), 0);
                                       }
                                       data[currentTab] = JSON.stringify(content);
                                   } }
                                   defaultValue={ x.value }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="checkbox"
                                   style={ inputStyle }
                                   defaultValue={ 'false' }/>
                        </td>
                    </tr>
                }) }

            <tr>
                <td style={ { padding: '0 0.5em' } }>
                    <input type="text"
                           style={ inputStyle }
                           onChange={ e => {
                               content.push({ key: e.target.value, value: '' });
                               data[currentTab] = JSON.stringify(content);
                               this.forceUpdate();
                               setTimeout(() => {
                                   this.lastInputRefs.key.current.focus();
                                   e.target.value = '';
                               }, 0);
                           } }
                           placeholder="key..."/>
                </td>
                <td style={ { padding: '0 0.5em' } }>
                    <input type="text"
                           style={ inputStyle }
                           onChange={ e => {
                               content.push({ key: '', value: e.target.value });
                               data[currentTab] = JSON.stringify(content);
                               this.forceUpdate();
                               setTimeout(() => {
                                   this.lastInputRefs.value.current.focus();
                                   e.target.value = '';
                               }, 0);
                           } }
                           placeholder="value..."/>
                </td>
                <td style={ { padding: '0 0.5em' } }>
                    <input type="checkbox"
                           style={ inputStyle }
                           disabled={ true }/>
                </td>
            </tr>
            </tbody>
        </table>;
    }

    renderContentAsText() {
        const { data } = this.props;
        const { currentTab, textType } = this.state;

        let content = '';
        try {
            switch (textType) {
                case "json":
                    content = JSON.stringify(JSON.parse(data[currentTab]), null, 2);
                    break;
                case "plain":
                    content = JSON.parse(data[currentTab]);
                    break;
            }
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