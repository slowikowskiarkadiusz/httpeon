import './endpoint-text-editor.scss'
import React, { Component } from 'react';
import { dispatchUpdateCacheEvent } from "../../app";

const displayModes = { 'default': 0, 'text': 0 };
type DisplayMode = keyof typeof displayModes;
const textTypes = { 'json': 0, 'plain': 0, 'xml': 0 };
type TextType = keyof typeof textTypes;

export const inputStyle = {
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

interface ContentEntry {
    key: string;
    value: string;
    isOn: boolean;
}

export interface EndpointTextEditorData {
    headerHtml: string;
    tabs: {
        [tabName: string]: {
            content: string,
            allowedDisplayModes?: DisplayMode[],
            currentDisplayMode?: DisplayMode,
            currentTextType?: TextType,
            isReadOnly?: boolean,
            statusCode?: number;
        }
    }
}

interface EndpointTextEditorProps {
    // responseStatus?: number;
    data: EndpointTextEditorData;
}

interface EndpointTextEditorState {
    currentTab: string;
    textType: TextType;
}

export class EndpointTextEditor extends Component<EndpointTextEditorProps, EndpointTextEditorState> {
    // private buttonRefs: HTMLButtonElement[];
    constructor(props: EndpointTextEditorProps) {
        super(props);
        // this.buttonRefs = [];
        // new Array(Object.keys(props.data).length).map(() => React.createRef<HTMLButtonElement>());
        this.state = {
            currentTab: Object.keys(props.data.tabs)[0],
            textType: 'json',
        };
    }

    render() {
        const { data } = this.props;
        const { currentTab } = this.state;

        if (!data.tabs[currentTab].currentDisplayMode) {
            let value: DisplayMode = 'default';
            if (!!data.tabs[currentTab].allowedDisplayModes)
                value = data.tabs[currentTab].allowedDisplayModes[0];
            if (data.tabs[currentTab].currentDisplayMode !== value)
                data.tabs[currentTab].currentDisplayMode = value;

            dispatchUpdateCacheEvent();
            this.forceUpdate();
        }

        const footerSelectStyle = {
            height: '100%',
            border: 'none',
            fontSize: '2rem',
            color: 'var(--theme-font-color)',
            backgroundColor: 'var(--theme-bc-2)',
            padding: '0.5em',
            overflow: 'scroll',
            textAlign: 'center' as any,
            borderRadius: 'var(--border-radius)',
        };

        return (
            <div style={ {
                fontSize: '2rem',
                height: '100%',
                borderRadius: 'var(--border-radius)',
                display: 'grid',
                overflow: 'scroll',
                gridTemplateRows: '3em 3em calc(100% - 9em) 3em',
                backgroundColor: 'var(--theme-bc-3)',
            } }>
                <div style={ { fontSize: '2rem', margin: 'auto', fontWeight: 'bold', textAlign: 'center' } }
                     dangerouslySetInnerHTML={ { __html: data.headerHtml } }>
                </div>
                <div style={ {
                    display: 'flex',
                    width: '100%',
                } }>
                    { Object.keys(data.tabs).map((key, i, c) => (
                        <div key={ `page-tab-${ i }` }
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
                             } }
                             onClick={ () => this.setCurrentTab(key) }>
                            <button
                                // ref={ ref => this.buttonRefs[i] = ref }
                                style={ {
                                    backgroundColor: 'transparent',
                                    color: 'unset',
                                    fontWeight: currentTab === key ? 'bold' : 'normal',
                                    border: 'none',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    width: '100%',
                                    overflow: 'hidden',
                                } }>
                                { key }
                                {/*{ i } { this.buttonRefs.length }*/ }
                            </button>
                        </div>
                    )) }
                </div>
                <div style={ { overflow: 'scroll', } }>{ this.renderContent() }</div>
                <div style={ { padding: '0.25em' } }>
                    { <select
                        style={ footerSelectStyle }
                        onChange={ (e) => {
                            data.tabs[currentTab].currentDisplayMode = (e.nativeEvent.target as HTMLInputElement).value as DisplayMode;
                            this.forceUpdate();
                            dispatchUpdateCacheEvent();
                        } }
                        value={ data.tabs[currentTab].currentDisplayMode }>
                        { Object.keys(displayModes)
                            .filter((x: DisplayMode) => !data.tabs[currentTab].allowedDisplayModes || data.tabs[currentTab].allowedDisplayModes.includes(x))
                            .map((x) => (
                                <option value={ x }
                                        key={ x }>
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

    // renderResponseStatus() {
    //     if (!this.props.responseStatus)
    //         return undefined;
    //
    //     let statusCat = Math.floor(this.props.responseStatus) / 100;
    //     return <span style={ {
    //         fontWeight: 'bold',
    //         color: `var(--${ [4, 5].includes(statusCat) ? 'red' : (statusCat === 3 ? 'yellow' : 'green') }-color`
    //     } }>&nbsp;{ this.props.responseStatus }</span>
    // }

    setCurrentTab(tab: string) {
        this.setState({ currentTab: tab });
    }

    renderContent() {
        const { data } = this.props;
        const { currentTab } = this.state;

        switch (data.tabs[currentTab].currentDisplayMode) {
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
            content = JSON.parse(data.tabs[currentTab].content);
        } catch (err) {
            if (data.tabs[currentTab].content === '')
                data.tabs[currentTab].content = JSON.stringify(content);
            else
                return <div style={ { ...inputStyle, backgroundColor: 'var(--red-color)' } }>Error while parsing JSON</div>
        }

        const updateEntry = (i: number) => {
            if (!content[i].key && !content[i].value) {
                content.splice(i, 1);
                setTimeout(() => this.forceUpdate(), 0);
            }
            data.tabs[currentTab].content = JSON.stringify(content);
            dispatchUpdateCacheEvent();
        }

        return <table style={ { width: '100%' } }>
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
                                   disabled={ data.tabs[currentTab].isReadOnly }
                                   onChange={ e => {
                                       content[i].key = e.target.value;
                                       updateEntry(i);
                                   } }
                                   defaultValue={ x.key }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   ref={ this.lastInputRefs.value }
                                   style={ inputStyle }
                                   placeholder="value..."
                                   disabled={ data.tabs[currentTab].isReadOnly }
                                   onChange={ e => {
                                       content[i].value = e.target.value;
                                       updateEntry(i);
                                   } }
                                   defaultValue={ x.value }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="checkbox"
                                   style={ inputStyle }
                                   defaultChecked={ x.isOn }
                                   disabled={ data.tabs[currentTab].isReadOnly }
                                   onChange={ e => {
                                       content[i].isOn = e.target.checked;
                                       updateEntry(i);
                                   } }/>
                        </td>
                    </tr>
                }) }

            { !data.tabs[currentTab].isReadOnly
                ? <tr>
                    <td style={ { padding: '0 0.5em' } }>
                        <input type="text"
                               style={ inputStyle }
                               onChange={ e => {
                                   content.push({ key: e.target.value, value: '', isOn: true });
                                   data.tabs[currentTab].content = JSON.stringify(content);
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
                                   content.push({ key: '', value: e.target.value, isOn: true });
                                   data.tabs[currentTab].content = JSON.stringify(content);
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
                : undefined }
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
                    content = JSON.stringify(JSON.parse(data.tabs[currentTab].content), null, 2);
                    break;
                case "plain":
                    content = JSON.parse(data.tabs[currentTab].content);
                    break;
            }
        } catch (err) {
            content = data.tabs[currentTab].content;
        }

        return (
            <div placeholder={ `${ currentTab.toLowerCase() }...` }
                 style={ {
                     padding: '1em',
                     height: 'auto',
                     fontFamily: 'Menlo',
                     whiteSpace: 'pre',
                     minHeight: '100%',
                     width: '100%',
                     color: 'var(--theme-font-color)',
                     backgroundColor: 'var(--theme-bc-3)',
                     border: 'none',
                 } }
                 dangerouslySetInnerHTML={ { __html: content } }
                 contentEditable={ !data.tabs[currentTab].isReadOnly }
                 key={ content }
                 onInput={ (e) => {
                     (data.tabs[currentTab].content = (e.target as HTMLDivElement).innerText);
                     dispatchUpdateCacheEvent();
                 } }>
            </div>
        );
    }
}