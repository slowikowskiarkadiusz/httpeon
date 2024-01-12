import { TabSetup } from "../tab-setup";
import { EndpointTabContent } from "./endpoint.tab-content";
import { PButton } from "../../common/pbutton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { EnvConfig, SpaceConfig, useSpaces } from "../../common/spaces.context";
import { dispatchUpdateCacheEvent } from "../../app";
import { callHttp } from "../../common/http";
import { EndpointResponse } from "./endpoint-response";
import { EndpointRequestEditor } from "./endpoint-request-editor";

let lastSetup = undefined;

export function Endpoint(props: { setup: TabSetup<EndpointTabContent>, updateSetup: (setup: TabSetup<EndpointTabContent>) => void }) {
    const [selectedMethod, setSelectedMethod] = useState(props.setup.content.method)
    const [responseStatus, setResponseStatus] = useState<number>(undefined);
    const [isRequestInProgress, setIsRequestInProgress] = useState<boolean>(false);
    const { tabs, currentTabIndex, setBaseUrl, baseUrl, getActiveConfig } = useSpaces();
    const baseUrlRef = React.createRef<HTMLInputElement>();
    const requestRef = React.createRef<EndpointRequestEditor>();
    const responseRef = React.createRef<EndpointResponse>();

    if (lastSetup !== props.setup)
        setSelectedMethod(props.setup.content.method);

    lastSetup = props.setup;

    dispatchUpdateCacheEvent();

    const endpointCallParams = {
        currentTab: tabs()[currentTabIndex],
        setIsRequestInProgress,
        baseUrl,
        setResponseStatus,
        requestRef,
        responseRef,
        getActiveConfig
    };

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
                           backgroundColor: baseUrl?.length > 0 ? 'var(--theme-bc-2)' : 'var(--red-color)',
                           color: baseUrl?.length > 0 ? 'var(--theme-font-color)' : 'var(--theme-bc)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2em',
                           overflow: 'auto',
                       } }
                       onKeyDown={ e => {
                           if (e.key === 'Enter') {
                               callEndpoint({ ...endpointCallParams, baseUrl: (e.target as HTMLInputElement).value });
                           }
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
                    transition: 'background-color 0.3s'
                } }
                        value={ selectedMethod }
                        onChange={ (e) => {
                            const value = Object.keys(e.nativeEvent.target)
                                .filter(key => (e.nativeEvent.target as any)[key].selected)
                                .map(key => (e.nativeEvent.target as any)[key])[0].value;
                            setSelectedMethod(props.setup.content.method = value);
                            dispatchUpdateCacheEvent();
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
                           backgroundColor: 'var(--theme-bc-2)',
                           color: 'var(--theme-font-color)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2.73em',
                           overflow: 'auto',
                       } }
                       defaultValue={ props.setup.content.endpoint }
                       key={ props.setup.content.endpoint }
                       onKeyDown={ e => {
                           if (e.key === 'Enter') {
                               props.setup.content.endpoint = (e.target as HTMLInputElement).value;
                               callEndpoint(endpointCallParams)
                           }
                       } }
                       onBlur={ e => {
                           props.setup.content.endpoint = e.target.value;
                           props.updateSetup(props.setup);
                       } }/>
            </div>
            <PButton onClick={ () => callEndpoint(endpointCallParams) }
                     content="GO"
                     color="green"
                     icon={ faPaperPlane }
                     isLoading={ isRequestInProgress }/>

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
            <EndpointRequestEditor ref={ requestRef }
                                   data={ (tabs()[currentTabIndex].content as EndpointTabContent).input }/>
            <EndpointResponse ref={ responseRef }
                              isLoading={ isRequestInProgress }
                              data={ (tabs()[currentTabIndex].content as EndpointTabContent).output }/>
        </div>
    </>
}

async function callEndpoint(
    params: {
        currentTab: TabSetup<EndpointTabContent>,
        setIsRequestInProgress: React.Dispatch<React.SetStateAction<boolean>>,
        baseUrl: string,
        setResponseStatus: React.Dispatch<React.SetStateAction<number>>,
        requestRef: React.RefObject<EndpointRequestEditor>,
        responseRef: React.RefObject<EndpointResponse>,
        getActiveConfig: (configPath: string[]) => SpaceConfig
    }): Promise<void> {
    params.setIsRequestInProgress(true);
    let tabContent = params.currentTab.content as EndpointTabContent;
    let request = {
        url: `${ params.baseUrl }/${ params.currentTab.content.endpoint }`,
        method: params.currentTab.content.method,
        headers: JSON.parse(tabContent.input.tabs.Headers.content ?? '[]') as [string, string][],
        body: tabContent.input.tabs.Body.content,
    };
    request.body = request.body === '' ? undefined : request.body;

    [...(JSON.parse(tabContent.input.tabs.Params.content) as [string, string, boolean][]),
        ...(params.getActiveConfig(['envs']) as EnvConfig).values]
        .filter(x => x[2])
        .forEach(x => request.url = request.url.replace(x[0], x[1]));

    let response = await callHttp(request);

    if (response.callResponse) {
        tabContent.output.Request = request;
        tabContent.output.Response = {
            ...tabContent.output.Response,
            status: {
                code: response.callResponse.status,
                text: response.callResponse.statusText
            },
            execTime: response.execTime,
            body: response.callResponse.body,
            headers: response.callResponse.headers.map(pair => [pair[0], pair[1]])
        };
        params.setResponseStatus(response.callResponse.status);
    } else {
        console.log('dupa', response, response.internalError)
    }

    params.requestRef.current?.forceUpdate();
    params.responseRef.current?.forceUpdate();

    params.setIsRequestInProgress(false);
}