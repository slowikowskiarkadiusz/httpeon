import { TabSetup } from "../tab-setup";
import React from "react";
import { EnvConfig, useSpaces } from "../../common/spaces.context";
import { EnvTabContent } from "./env.tab-content";
import { EditorData, EndpointRequestEditor } from "../endpoints/endpoint-request-editor";
import { dispatchUpdateCacheEvent } from "../../app";

export function Env(props: { setup: TabSetup<EnvTabContent>, updateSetup: (setup: TabSetup<EnvTabContent>) => void }) {
    const { tabs, currentTabIndex, getConfigs } = useSpaces();
    const requestRef = React.createRef<EndpointRequestEditor>();

    const myConfig = getConfigs(['envs']).filter(x => x.name === props.setup.content.env)[0] as EnvConfig;

    return <>
        <EndpointRequestEditor ref={ requestRef }
                               data={ (tabs()[currentTabIndex].content as EnvTabContent) }
                               onDataUpdate={ (data: EditorData) => {
                                   const allValues: [string, string, boolean][] = JSON.parse(data.tabs['Variables'].content);
                                   myConfig.values = [...allValues];
                                   dispatchUpdateCacheEvent();
                               } }/>
    </>
}