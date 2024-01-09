import React, { createContext, useContext, useState } from 'react';
import { TabSetup } from "../pages/tab-setup";
import { Endpoints } from "../pages/endpoints/endpoints.utils";

interface SpaceConfig {
    name: string;
    active: boolean;
}

export interface Space extends SpaceConfig {
    tabs: TabSetup<any>[];
    baseUrl: string;
    endpoints: Endpoints;
    envs: SpaceConfig[];

    [configKey: string]: any;
}

const spacesLocalStorageKey = 'spaces';
const loadedSpaces: Space[] = JSON.parse(localStorage.getItem('spaces')) ?? [
    {
        name: 'my first space',
        tabs: [],
        active: true,
        endpoints: {},
        envs: [{
            name: 'dev',
            active: false
        }, {
            name: 'local',
            active: true
        }]
// },
// {
//     name: 'space2',
//     tabs: [],
//     active: true,
//     endpoints: {},
//     envs: [{
//         name: 'test',
//         active: false
//     },
//         {
//             name: 'prod',
//             active: true
//         }]
    }];

const SpacesContext = createContext({
    spaces: loadedSpaces,
    setSpaceConfig: (spaceKey: string, configKey: string, value: any) => {},
    getActive: () => loadedSpaces[0],
    setActive: (name: string) => {},
    getActiveEnv: () => loadedSpaces[0].envs[0],
    setActiveEnv: (name: string) => {},
    tabs: () => ([] as TabSetup<any>[]),
    updateCache: () => {},
    currentTabIndex: 0,
    baseUrl: null as string,
    setBaseUrl: (newUrl: string) => {},
    addTab: (newTab: TabSetup<any>) => {return 0 as number},
    removeTab: (index: number) => {},
    setCurrentTab: (index: number) => {},
    updateTab: (index: number, setup: TabSetup<any>) => {},
    endpoints: () => ({} as Endpoints),
    addEndpoints: (newEndpoints: Endpoints) => {},
    removeEndpoint: (path: string) => {},
});

export const SpacesProvider = ({ children }: any) => {
    const [spaces, _setSpaces] = useState(loadedSpaces);
    const [activeSpace, _setActiveSpace] = useState<Space | undefined>(spaces.filter(x => x.active)[0]);
    const [baseUrl, _setBaseUrl] = useState(activeSpace?.baseUrl);
    const [currentTabIndex, setCurrentTabIndex] = useState(loadedSpaces.filter(x => x.active)[0]?.tabs.findIndex(x => x.active) ?? -1);

    if (!activeSpace && spaces.length > 0)
        _setActiveSpace(spaces[0]);

    // let newCurrentTabIndex = loadedSpaces.filter(x => x.active)[0]?.tabs.findIndex(x => x.active) ?? -1;
    // if (newCurrentTabIndex !== currentTabIndex)
    //     setCurrentTabIndex(newCurrentTabIndex);

    const getCurrentTabIndex = () => activeSpace.tabs.findIndex(x => x.active) ?? -1;

    const setSpaceConfig = (spaceKey: string, configKey: string, value: any) => {
        activeSpace[configKey] = value;
        _setSpaces(spaces);
        updateCache();
    }

    const getActive = () => activeSpace;
    const setActive = (name: string) => _setActiveSpace(spaces.filter(x => x.name === name)[0] ?? spaces[0]);
    const setBaseUrl = (newBaseUrl: string) => {
        _setBaseUrl(activeSpace.baseUrl = newBaseUrl);
        updateCache();
    }

    const getActiveEnv = () => getActive().envs.filter(x => x.active)[0];
    const setActiveEnv = (name: string) => {
        getActiveEnv().active = false;
        getActive().envs.filter(x => x.name === name)[0].active = true;
        
        updateCache();
    }

    const tabs = () => activeSpace?.tabs ?? [];

    const addTab = (newTab: TabSetup<any>) => {
        if (!activeSpace.tabs.some((x) => x.id == newTab.id))
            activeSpace.tabs.push(newTab);

        updateCache();
        return activeSpace.tabs.findIndex(x => x.id === newTab.id);
    };

    const removeTab = (index: number) => {
        activeSpace.tabs[index].active = false;
        activeSpace.tabs.splice(index, 1);

        const currentIndex = getCurrentTabIndex();
        if (index === currentIndex) {
            if (currentIndex > 0) {
                if (activeSpace.tabs[currentIndex - 1])
                    activeSpace.tabs[currentIndex - 1].active = true;
                else
                    setCurrentTabIndex(-1);
                setCurrentTabIndex(currentIndex - 1);
                updateCache();
            }
        }

        updateCache();
    };

    const setCurrentTab = (index: number) => {
        if (currentTabIndex > -1 && activeSpace.tabs[currentTabIndex])
            activeSpace.tabs[currentTabIndex].active = false;

        if (activeSpace.tabs[index])
            activeSpace.tabs[index].active = true;
        else
            index = -1;
        setCurrentTabIndex(index);
        updateCache();
    };

    const updateTab = (index: number, setup: TabSetup<any>) => {
        Object.keys(setup.content)
            .forEach(newSetupKey => {
                activeSpace.tabs[index][newSetupKey] = setup.content[newSetupKey];
            });

        updateCache();
    }

    const updateCache = () => {
        _setSpaces([...spaces]);
        localStorage.setItem(spacesLocalStorageKey, JSON.stringify(spaces));
    }

    const endpoints = () => activeSpace?.endpoints;

    const addEndpoints = (newEndpoints: Endpoints) => {
        activeSpace.endpoints = ({ ...endpoints(), ...newEndpoints });
        // _setSpaces([...spaces]);
        updateCache();
    }

    const removeEndpoint = (path: string) => {
        delete activeSpace.endpoints[path];
        activeSpace.endpoints = { ...endpoints() };
        // _setSpaces([...spaces]);
        updateCache();
    }

    return (
        <SpacesContext.Provider value={ {
            spaces,
            setSpaceConfig,
            getActive,
            setActive,
            getActiveEnv,
            setActiveEnv,
            tabs,
            updateCache,
            currentTabIndex,
            baseUrl,
            setBaseUrl,
            addTab,
            removeTab,
            setCurrentTab,
            updateTab,
            endpoints,
            addEndpoints,
            removeEndpoint
        } }>
            { children }
        </SpacesContext.Provider>
    );
};

export const useSpaces = () => useContext(SpacesContext);