import React, { Component } from 'react';
import { dispatchUpdateCacheEvent } from "../../app";

const displayModes = { 'default': 0, 'text': 0 };
type DisplayMode = keyof typeof displayModes;
const textTypes = { 'json': 0, 'plain': 0, 'xml': 0 };
type TextType = keyof typeof textTypes;

interface ContentEntry {
    key: string;
    value: string;
}

export interface EndpointTextEditorData {
    [tabName: string]: {
        content: string,
        allowedDisplayModes?: DisplayMode[],
        currentDisplayMode?: DisplayMode,
        currentTextType?: TextType,
        isReadOnly?: boolean,
    }
}

interface EndpointTextEditorProps {
    data: EndpointTextEditorData;
}

interface EndpointTextEditorState {
    currentTab: string;
    textType: TextType;
}

export class EndpointTextEditor extends Component<EndpointTextEditorProps, EndpointTextEditorState> {
    constructor(props: EndpointTextEditorProps) {
        super(props);
        this.state = {
            currentTab: Object.keys(props.data)[0],
            textType: 'json',
        };
    }

    render() {
        const { data } = this.props;
        const { currentTab } = this.state;

        if (!data[currentTab].currentDisplayMode) {
            let value: DisplayMode = 'default';
            if (!!data[currentTab].allowedDisplayModes)
                value = data[currentTab].allowedDisplayModes[0];
            if (data[currentTab].currentDisplayMode !== value)
                data[currentTab].currentDisplayMode = value;

            dispatchUpdateCacheEvent();
            this.forceUpdate();
        }

        const footerSelectStyle = { height: '100%', border: 'none', fontSize: '2rem', color: 'var(--theme-font-color)', backgroundColor: 'var(--theme-bc-2)', padding: '0.5em', textAlign: 'center' as any, borderRadius: 'var(--border-radius)', };

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
                <div style={ { padding: '0.25em' } }>
                    { <select
                        style={ footerSelectStyle }
                        onChange={ (e) => {
                            data[currentTab].currentDisplayMode = (e.nativeEvent.target as HTMLInputElement).value as DisplayMode;
                            this.forceUpdate();
                            dispatchUpdateCacheEvent();
                        } }>
                        { Object.keys(displayModes)
                            .filter((x: DisplayMode) => !data[currentTab].allowedDisplayModes || data[currentTab].allowedDisplayModes.includes(x))
                            .map((x) => (
                                <option value={ x }
                                        key={ x }
                                        selected={ x === data[currentTab].currentDisplayMode }>
                                    { x }
                                </option>
                            )) }
                    </select> }

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

    renderContent() {
        const { data } = this.props;
        const { currentTab } = this.state;

        switch (data[currentTab].currentDisplayMode) {
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

        let content: ContentEntry[] = [];
        try {
            content = JSON.parse(data[currentTab].content);
        } catch (err) {
            data[currentTab].content = JSON.stringify(content);
        }

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
                                       data[currentTab].content = JSON.stringify(content);
                                       dispatchUpdateCacheEvent();
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
                                       data[currentTab].content = JSON.stringify(content);
                                       dispatchUpdateCacheEvent();
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
                               data[currentTab].content = JSON.stringify(content);
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
                               data[currentTab].content = JSON.stringify(content);
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
                    content = JSON.stringify(JSON.parse(data[currentTab].content), null, 2);
                    break;
                case "plain":
                    content = JSON.parse(data[currentTab].content);
                    break;
            }
        } catch (err) {
            content = data[currentTab].content;
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
                onChange={ (e) => {
                    (data[currentTab].content = e.target.value);
                    dispatchUpdateCacheEvent();
                } }></textarea>
        );
    }
}