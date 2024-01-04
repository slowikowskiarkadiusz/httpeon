import { TabSetup } from "../tab-setup";
import { EndpointTabContent } from "./endpoint.tab-content";
import { PButton } from "../../common/pbutton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { EndpointTextEditor } from "./endpoint-text-editor";
import { useSpaces } from "../../common/spaces.context";
import { dispatchUpdateCacheEvent } from "../../app";
import { callHttp } from "../../common/http";
import { EndpointOutput } from "./endpoint-output";

export function Endpoint(props: { setup: TabSetup<EndpointTabContent>, updateSetup: (setup: TabSetup<EndpointTabContent>) => void }) {
    props.setup.content.method = 'get';
    const [selectedMethod, setSelectedMethod] = useState(props.setup.content.method)
    const [responseStatus, setResponseStatus] = useState(undefined);
    const { tabs, currentTabIndex, setBaseUrl, baseUrl } = useSpaces();
    const baseUrlRef = React.createRef<HTMLInputElement>();
    const requestRef = React.createRef<EndpointTextEditor>();
    const responseRef = React.createRef<EndpointOutput>();

    dispatchUpdateCacheEvent();

    return <>
        <div id="baseUrlModalParent"
             style={ { width: '100%', display: 'flex', flexDirection: 'row', gap: 'var(--app-gap)', } }>
            <div style={ { backgroundColor: 'var(--theme-bc-2)', fontSize: '2rem', flex: '1 0 auto', display: 'flex', borderRadius: 'var(--cell-border-radius)' } }>
                <div style={ {
                    display: 'flex',
                    height: '100%',
                    cursor: 'default',
                    borderTopLeftRadius: 'var(--cell-border-radius)',
                    borderBottomLeftRadius: 'var(--cell-border-radius)',
                    border: 'none',
                    fontWeight: 'bold',
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--theme-bc-2)',
                    padding: '0em 0.25em',
                } }
                     onClick={ () => baseUrlRef.current?.focus() }>
                    <span style={ {
                        margin: 'auto',
                    } }>BASE URL</span>
                </div>
                <input type="text"
                       ref={ baseUrlRef }
                       style={ {
                           fontSize: '2rem',
                           flex: '1 1 auto',
                           paddingLeft: '1em',
                           border: 'none',
                           backgroundColor: 'var(--theme-bc-3)',
                           color: 'var(--theme-font-color)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2em',
                           overflow: 'scroll',
                       } }
                       defaultValue={ baseUrl }
                       key={ baseUrl }
                       placeholder="base url..."
                       onBlur={ e => {
                           setBaseUrl((e.target as HTMLInputElement).value)
                       } }/>
            </div>
        </div>

        <div style={ {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--app-gap)',
            justifyContent: 'space-between',
        } }>
            <div style={ { backgroundColor: 'var(--theme-bc-2)', flex: '1 0 auto', display: 'flex', borderRadius: 'var(--cell-border-radius)' } }>
                <select style={ {
                    height: '100%',
                    borderTopLeftRadius: 'var(--cell-border-radius)',
                    borderBottomLeftRadius: 'var(--cell-border-radius)',
                    border: 'none',
                    fontWeight: 'bold',
                    backgroundColor: `var(--http-${ selectedMethod }-bc)`,
                    color: 'var(--theme-bc)',
                    padding: '0em 0.5em',
                    cursor: 'pointer',
                    textAlign: 'center',
                } }
                        onChange={ (e) => {
                            setSelectedMethod(Object.keys(e.nativeEvent.target)
                                .filter(key => (e.nativeEvent.target as any)[key].selected)
                                .map(key => (e.nativeEvent.target as any)[key])[0].value);
                        } }>
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="put">PUT</option>
                    <option value="delete">DELETE</option>
                    <option value="patch">PATCH</option>
                    <option value="options">OPTIONS</option>
                    <option value="head">HEAD</option>
                </select>
                <input type="text"
                       style={ {
                           flex: '1 1 auto',
                           paddingLeft: '1em',
                           border: 'none',
                           backgroundColor: 'var(--theme-bc-3)',
                           color: 'var(--theme-font-color)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2.73em',
                           overflow: 'scroll',
                       } }
                       defaultValue={ props.setup.content.endpoint }
                       key={ props.setup.content.endpoint }
                       onChange={ e => {
                           props.setup.content.endpoint = e.target.value;
                           props.updateSetup(props.setup);
                       } }/>
            </div>
            <PButton onClick={ () => {
                let tabContent = (tabs()[currentTabIndex].content as EndpointTabContent);
                let request = {
                    url: baseUrl + props.setup.content.endpoint,
                    method: selectedMethod,
                    headers: JSON.parse(tabContent.input.tabs['Headers'].content) as { key: string, value: string }[],
                    body: tabContent.input.tabs['Body'].content,
                };
                // tabContent.request = request;
                request.body = request.body === '' ? undefined : request.body;
                callHttp(request).then(x => {
                    tabContent.output.Response = {
                        ...tabContent.output.Response,
                        status: {
                            code: x.status,
                            text: x.statusText
                        },
                        body: x.body,
                        headers: x.headers.map(pair => [pair[0], pair[1]])
                    };
                    setResponseStatus(x.status);
                    requestRef.current?.forceUpdate();
                    responseRef.current?.forceUpdate();
                });
            } }
                     content="GO"
                     color="green"
                     icon={ faPaperPlane }/>
            <div></div>

            {/*<PButton action={ () => {} }*/ }
            {/*         color="gray"*/ }
            {/*         icon={ faClockRotateLeft }/>*/ }
        </div>
        <div style={ {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            overflow: 'hidden',
            gap: 'var(--app-gap)',
            flex: '1 1 auto',
        } }>
            <EndpointTextEditor ref={ requestRef }
                                data={ (tabs()[currentTabIndex].content as EndpointTabContent).input }/>
            <EndpointOutput ref={ responseRef }
                            data={ (tabs()[currentTabIndex].content as EndpointTabContent).output }/>
        </div>
    </>
}