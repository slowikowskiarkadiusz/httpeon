import { makeTabSetup, TabSetup } from "../tab-setup";
import { EndpointTabContent } from "./endpoint.tab-content";
import { PButton } from "../../common/pbutton";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { EnvConfig, SpaceConfig, useSpaces } from "../../common/spaces.context";
import { dispatchUpdateCacheEvent } from "../../app";
import { callHttp } from "../../common/http";
import { EndpointResponse } from "./endpoint-response";
import { EndpointRequestEditor } from "./endpoint-request-editor";
import { EnvTabContent } from "../env/env.tab-content";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { useModal } from "../../common/modal/modal.context";
import { ScriptModal, ScriptModalResult } from "../../common/modal/script/script.modal";
import { HttpCallResponse } from "../../../index";

let lastSetup = undefined;

export function Endpoint(props: { setup: TabSetup<EndpointTabContent>, updateSetup: (setup: TabSetup<EndpointTabContent>) => void }) {
    const { invokeModal } = useModal();
    const [selectedMethod, setSelectedMethod] = useState(props.setup.content.method)
    const [_responseStatus, setResponseStatus] = useState<number>(undefined);
    const [isRequestInProgress, setIsRequestInProgress] = useState<boolean>(false);
    const { tabs, currentTabIndex, baseUrl, getActiveConfig } = useSpaces();
    const requestRef = React.createRef<EndpointRequestEditor>();
    const responseRef = React.createRef<EndpointResponse>();

    if (lastSetup !== props.setup)
        setSelectedMethod(props.setup.content.method);

    lastSetup = props.setup;

    dispatchUpdateCacheEvent();

    const currentTab = tabs()[currentTabIndex];
    const currentContent = currentTab.content as EndpointTabContent;

    const endpointCallParams = {
        currentTab,
        setIsRequestInProgress,
        baseUrl,
        setResponseStatus,
        requestRef,
        responseRef,
        getActiveConfig
    };

    return <>
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
                                   data={ currentContent.input }/>
            <EndpointResponse ref={ responseRef }
                              isLoading={ isRequestInProgress }
                              data={ currentContent.output }/>
        </div>
        <div style={ { marginBottom: 'var(--app-gap)' } }>
            <div style={ { display: 'flex', flexDirection: 'row', gap: '1rem', width: 'max-content' } }>
                <PButton content="Post-exec script"
                         icon={ faJs }
                         color="blue"
                         onClick={ () => {
                             invokeModal(ScriptModal, {
                                     originalValue: props.setup.content.postExecScript.split('\n').filter(x => !!x).length
                                         ? props.setup.content.postExecScript
                                         : `// variable 'response' is of type 
// { 
//   status: number;
//   statusText: string;
//   body: string;
//   headers: [string,string][] 
// }
// to set an environment variable use the 'vars' variable.
// to set request params use 'params' variable.
// to set request headers use 'headers' variable.
// e.g. setting 'Authentication' variable:
// vars['{Authentication}'] = \`Bearer \${JSON.parse(response.body)}\``,
                                     placeholder: 'JavaScript...',
                                 },
                                 'Post-exec script')
                                 .then((result: ScriptModalResult) => {
                                     currentContent.postExecScript = result.script;
                                     dispatchUpdateCacheEvent();
                                 })
                                 .catch(_reason => {});
                         } }/>
                <span style={ { margin: 'auto' } }>{ props.setup.content.postExecScript.split('\n').filter(x => !!x).length } lines</span>
            </div>
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
        getActiveConfig: <T extends SpaceConfig>(configPath: string[]) => T
    }): Promise<void> {
    if (!params.baseUrl) {
        const currentEnv = params.getActiveConfig(['envs']);
        const tabSetup = makeTabSetup<EnvTabContent>('envs', currentEnv.name, `env_${ currentEnv.name }`, true, {
            env: currentEnv.name,
            tabs: {
                Variables: { content: JSON.stringify(currentEnv.values) },
            }
        });
        window.dispatchEvent(new CustomEvent('open_tab', { detail: tabSetup }));
        return;
    }
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
        evalPostExecScript(response, tabContent.postExecScript, params.currentTab, params.getActiveConfig);
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
        console.log('http call error', response, response.internalError)
    }

    params.requestRef.current?.forceUpdate();
    params.responseRef.current?.forceUpdate();

    params.setIsRequestInProgress(false);
}

function evalPostExecScript(callResponse: HttpCallResponse,
                            postExecScript: string,
                            currentTab: TabSetup<EndpointTabContent>,
                            getActiveConfig: <T extends SpaceConfig>(config: string[]) => T) {
    let response = { ...callResponse };
    let vars = {};
    let params = {};
    let headers = {};

    eval(postExecScript);

    Object.keys(vars).forEach(key => getActiveConfig<EnvConfig>(['envs']).values.push([key, vars[key], true]));

    let paramsArray: [string, string, boolean][] = JSON.parse(currentTab.content.input.tabs.Params.content);
    Object.keys(params).forEach(key => paramsArray.push([key, params[key], true]));
    currentTab.content.input.tabs.Params.content = JSON.stringify(paramsArray);
    
    let headersArray: [string, string, boolean][] = JSON.parse(currentTab.content.input.tabs.Headers.content);
    Object.keys(headers).forEach(key => headersArray.push([key, headers[key], true]));
    currentTab.content.input.tabs.Headers.content = JSON.stringify(headersArray);
}