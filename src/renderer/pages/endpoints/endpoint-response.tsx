import { dispatchUpdateCacheEvent } from "../../app";
import { DisplayMode, displayModes, inputStyle } from "./endpoint-request-editor";
import { Component } from "react";

export interface EndpointResponseData {
    Request: { method?: string },
    Response: {
        status?: {
            code: number,
            text: string
        },
        headers: [string, string][],
        body?: string,
    },
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

        if (!data[currentTab].currentDisplayMode) {
            let value: DisplayMode = 'default';
            if (!!data[currentTab].allowedDisplayModes)
                value = data[currentTab].allowedDisplayModes[0];
            if (data[currentTab].currentDisplayMode !== value)
                data[currentTab].currentDisplayMode = value;

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
                gridTemplateRows: '3em calc(100% - 6em) 3em',
                backgroundColor: 'var(--theme-bc-3)',
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
                            data[currentTab].currentDisplayMode = (e.nativeEvent.target as HTMLInputElement).value as DisplayMode;
                            this.forceUpdate();
                            dispatchUpdateCacheEvent();
                        } }
                        value={ data[currentTab].currentDisplayMode }>
                        { Object.keys(displayModes)
                            .filter((x: DisplayMode) => !data[currentTab].allowedDisplayModes || data[currentTab].allowedDisplayModes.includes(x))
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

        switch (data[currentTab].currentDisplayMode) {
            case 'default':
                return this.renderContentAsDefault();
            case 'text':
                return this.renderContentAsText();
            default:
                return null;
        }
    }

    renderContentAsDefault() {
        const { data } = this.props;
        const { currentTab } = this.state;

        let content: [string, string][] = [];
        try {
            content = JSON.parse(data[currentTab].content);
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

            { !data[currentTab].isReadOnly
                ? <tr>
                    <td style={ { padding: '0 0.5em' } }>
                        <input type="text"
                               style={ inputStyle }
                               placeholder="key..."/>
                    </td>
                    <td style={ { padding: '0 0.5em' } }>
                        <input type="text"
                               style={ inputStyle }
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
        const { currentTab } = this.state;

        let content = data[currentTab].content;

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
                 contentEditable={ !data[currentTab].isReadOnly }
                 key={ content }
                 onInput={ (e) => {
                     (data[currentTab].content = (e.target as HTMLDivElement).innerText);
                     dispatchUpdateCacheEvent();
                 } }>
            </div>
        );
    }
}