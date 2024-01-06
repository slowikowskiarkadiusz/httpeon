import { dispatchUpdateCacheEvent } from "../../app";
import { inputStyle } from "./endpoint-request-editor";
import React, { Component } from "react";
import { HttpCallParams } from "../../../index";
import { buttonForHttpMethod } from "./endpoints.list";

export interface EndpointResponseData {
    Request: EndpointResponseRequestTabData,
    Response: EndpointResponseResponseTabData,
}

interface EndpointResponseTabData {
    isPrettyPrint?: boolean;
    isWrap?: boolean;
}

interface EndpointResponseResponseTabData extends EndpointResponseTabData {
    status?: {
        code: number,
        text: string
    },
    headers: [string, string][],
    body?: string,
}

interface EndpointResponseRequestTabData extends HttpCallParams, EndpointResponseTabData {
    status?: {
        code: number,
        text: string
    },
    headers: [string, string][],
    body?: string,
}

interface EndpointResponseProps {
    // responseStatus?: number;
    data: EndpointResponseData;
}

interface EndpointResponseState {
    currentTab: string;
}

export class EndpointResponse extends Component<EndpointResponseProps, EndpointResponseState> {
    // private buttonRefs: HTMLButtonElement[];
    constructor(props: EndpointResponseProps) {
        super(props);
        // this.buttonRefs = [];
        // new Array(Object.keys(props.data).length).map(() => React.createRef<HTMLButtonElement>());
        this.state = {
            currentTab: Object.keys(props.data)[0],
        };
    }

    render() {
        const { data } = this.props;
        const { currentTab } = this.state;

        const currentDataTab: EndpointResponseRequestTabData | EndpointResponseResponseTabData = data[currentTab];

        const footerCheckboxStyle: React.CSSProperties = {
            border: 'none',
            fontSize: '2rem',
            color: 'var(--theme-font-color)',
            backgroundColor: 'var(--theme-bc-3)',
            padding: '0.5em',
            overflow: 'auto',
            textAlign: 'center' as any,
            borderRadius: 'var(--border-radius)',
            userSelect: 'none',
            display: 'flex',
            width: 'max-content',
        };

        return (
            <div style={ {
                fontSize: '2rem',
                height: '100%',
                borderRadius: 'var(--border-radius)',
                display: 'grid',
                overflow: 'auto',
                gridTemplateRows: '3em calc(100% - 6em) 3em',
                backgroundColor: 'var(--theme-bc-2)',
            } }>
                {/*<div style={ { fontSize: '2rem', margin: 'auto', fontWeight: 'bold', textAlign: 'center' } }*/ }
                {/*     dangerouslySetInnerHTML={ { __html:  } }>*/ }
                {/*</div>*/ }
                <div style={ {
                    display: 'flex',
                    width: '100%',
                } }>
                    { Object.keys(data).map((key, i, c) => (
                        <div key={ `page-tab-${ i }` }
                             style={ {
                                 width: `${ 100 / c.length }%`,
                                 backgroundColor: currentTab === key ? 'var(--theme-bc-2)' : 'var(--theme-bc-3)',
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
                                    display: 'flex',
                                } }>
                                <div style={ { margin: 'auto 1em auto auto' } }>{ key }</div>
                                <div style={ { margin: 'auto auto auto 0', height: 'min-content' } }>
                                    { data[key] === data.Request && data.Request.method
                                        ? buttonForHttpMethod(data.Request.method, '0')
                                        : (data[key] === data.Response && data.Response?.status
                                            ? (() => {
                                                let statusCat = Math.floor(data.Response.status.code / 100);
                                                return <span style={ { fontWeight: 'bold', color: `var(--${ [4, 5].includes(statusCat) ? 'red' : (statusCat === 3 ? 'yellow' : 'green') }-color` } }>{ data.Response?.status?.code }</span>;
                                            })()
                                            : '') }
                                </div>
                            </button>
                        </div>
                    )) }
                </div>
                <div style={ { overflow: 'auto', } }>{ this.renderContent() }</div>
                <div style={ { padding: '0.25em', display: 'flex', gap: 'var(--app-gap)' } }>
                    { <label style={ { ...footerCheckboxStyle } }>
                        <input type="checkbox"
                               checked={ currentDataTab.isPrettyPrint }
                               onChange={ newValue => {
                                   currentDataTab.isPrettyPrint = newValue.target.checked;
                                   this.forceUpdate();
                                   dispatchUpdateCacheEvent();
                               } }/>
                        <span style={ { margin: 'auto' } }>Pretty</span>
                    </label> }

                    { <label style={ { ...footerCheckboxStyle } }>
                        <input type="checkbox"
                               checked={ currentDataTab.isWrap }
                               onChange={ newValue => {
                                   currentDataTab.isWrap = newValue.target.checked;
                                   this.forceUpdate();
                                   dispatchUpdateCacheEvent();
                               } }/>
                        <span style={ { margin: 'auto' } }>Wrap</span>
                    </label> }
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

        // switch (data[currentTab].currentDisplayMode) {
        // case 'default':
        //     return this.renderContentAsDefault();
        // case 'text':
        return this.renderContentAsText();
        // default:
        //     return null;
        // }
    }

    renderContentAsDefault() {
        const { data } = this.props;
        const { currentTab } = this.state;

        let content: [string, string][] = [];
        try {
            content = JSON.parse(data[currentTab].content);
            // content = data[currentTab].content;
        } catch (err) {
            if (data[currentTab].content === '')
                data[currentTab].content = JSON.stringify(content);
            else
                return <div style={ { ...inputStyle, backgroundColor: 'var(--red-color)' } }>Error while parsing JSON</div>
        }

        const updateEntry = (i: number) => {
            if (!content[i][0] && !content[i][1]) {
                content.splice(i, 1);
                setTimeout(() => this.forceUpdate(), 0);
            }
            data[currentTab].content = JSON.stringify(content);
            dispatchUpdateCacheEvent();
        }

        return <table style={ { width: '100%' } }>
            <thead>
            <tr>
                <th style={ { width: '25%' } }>Key</th>
                <th style={ { width: 'auto' } }>Value</th>
            </tr>
            </thead>
            <tbody>{ content
                .map((x, i, c) => {
                    return <tr key={ x[0] + i }>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   style={ inputStyle }
                                   placeholder="key..."
                                   disabled={ data[currentTab].isReadOnly }
                                   onChange={ e => {
                                       content[i][0] = e.target.value;
                                       updateEntry(i);
                                   } }
                                   defaultValue={ x[0] }/>
                        </td>
                        <td style={ { padding: '0 0.5em' } }>
                            <input type="text"
                                   style={ inputStyle }
                                   placeholder="value..."
                                   disabled={ data[currentTab].isReadOnly }
                                   onChange={ e => {
                                       content[i][1] = e.target.value;
                                       updateEntry(i);
                                   } }
                                   defaultValue={ x[1] }/>
                        </td>
                    </tr>
                }) }
            </tbody>
        </table>;
    }

    renderContentAsText() {
        const { data } = this.props;
        const { currentTab } = this.state;

        const currentDataTab: EndpointResponseRequestTabData | EndpointResponseResponseTabData = data[currentTab];

        let sectionStyle: React.CSSProperties = { margin: '1em 0' };
        let headerStyle: React.CSSProperties = { fontWeight: 'bold', userSelect: 'none' };
        let valueStyle: React.CSSProperties = {
            fontFamily: 'Menlo',
            whiteSpace: 'pre',
        };

        if (currentDataTab.isWrap) {
            valueStyle.overflowWrap = 'anywhere';
            valueStyle.whiteSpace = 'break-spaces';
        }

        return (
            <div placeholder={ `${ currentTab.toLowerCase() }...` }
                 style={ {
                     padding: '1em',
                     height: 'auto',
                     whiteSpace: 'pre',
                     maxHeight: '100%',
                     maxWidth: '100%',
                     color: 'var(--theme-font-color)',
                     backgroundColor: 'var(--theme-bc-2)',
                     border: 'none',
                 } }>
                { data[currentTab].status
                    ? <div style={ sectionStyle }>
                        <div style={ { ...headerStyle } }>Status</div>
                        <div style={ { ...valueStyle } }>{ data[currentTab].status.code } { data[currentTab].status.text }</div>
                    </div>
                    : null }
                { data[currentTab].method
                    ? <div style={ sectionStyle }>
                        <div style={ { ...headerStyle } }>Endpoint</div>
                        <div style={ { ...valueStyle } }>{ data[currentTab].method.toUpperCase() } { data[currentTab].url }</div>
                    </div>
                    : null }
                { data[currentTab].headers?.length > 0
                    ? <div style={ sectionStyle }>
                        <div style={ { ...headerStyle } }>Headers</div>
                        { data[currentTab].headers.map(pair =>
                            <div key={ pair[0] + pair[1] }
                                 style={ { ...valueStyle, margin: '0' } }>{ pair[0] }: { pair[1] }</div>) }</div>
                    : null }
                { data[currentTab].body ?
                    <div style={ sectionStyle }>
                        <div style={ { ...headerStyle } }>Body</div>
                        <div style={ { ...valueStyle } }>{ prettifyBody(data[currentTab].body, data[currentTab].headers) }</div>
                    </div>
                    : null }
            </div>
        );
    }
}

function prettifyBody(body: string, headers: [string, string][]) {
    let contentTypeHeader = headers.filter(x => x[0].toLowerCase() === 'content-type');
    if (contentTypeHeader.length > 0) {
        let value = contentTypeHeader[0][1].toLowerCase();
        if (value.includes('json'))
            return JSON.stringify(JSON.parse(body), null, 2);
    }

    return body;
}