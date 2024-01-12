import { TabSetup } from "../tab-setup";
import React from "react";
import { EnvConfig, useSpaces } from "../../common/spaces.context";
import { EnvTabContent } from "./env.tab-content";
import { EditorData, EndpointRequestEditor } from "../endpoints/endpoint-request-editor";
import { dispatchUpdateCacheEvent } from "../../app";

export function Env(props: { setup: TabSetup<EnvTabContent>, updateSetup: (setup: TabSetup<EnvTabContent>) => void }) {
    const { tabs, currentTabIndex, getConfigs, setBaseUrl, baseUrl } = useSpaces();
    const baseUrlRef = React.createRef<HTMLInputElement>();
    const requestRef = React.createRef<EndpointRequestEditor>();

    const myConfig = getConfigs(['envs']).filter(x => x.name === props.setup.content.env)[0] as EnvConfig;

    return <>
        <div style={ { width: '100%', display: 'flex', flexDirection: 'row', gap: 'var(--app-gap)', } }>
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
                    padding: '0em 0.5em',
                } }
                     onClick={ () => baseUrlRef.current?.focus() }>
                    <span style={ {
                        margin: 'auto',
                    } }>BASE URL</span>
                </div>
                <input type="text"
                       ref={ baseUrlRef }
                       style={ {
                           flex: '1 1 auto',
                           paddingLeft: '1em',
                           border: 'none',
                           backgroundColor: baseUrl?.length > 0 ? 'var(--theme-bc-2)' : 'var(--red-color)',
                           color: baseUrl?.length > 0 ? 'var(--theme-font-color)' : 'var(--theme-bc)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2.73em',
                           overflow: 'auto',
                       } }
                       onKeyDown={ e => {
                           if (e.key === 'Enter') {
                               setBaseUrl((e.target as HTMLInputElement).value)
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

        <EndpointRequestEditor ref={ requestRef }
                               data={ (tabs()[currentTabIndex].content as EnvTabContent) }
                               onDataUpdate={ (data: EditorData) => {
                                   const allValues: [string, string, boolean][] = JSON.parse(data.tabs['Variables'].content);
                                   myConfig.values = [...allValues];
                                   dispatchUpdateCacheEvent();
                               } }/>
    </>
}