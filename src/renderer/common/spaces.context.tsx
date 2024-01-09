import React, { createContext, useContext, useState } from 'react';
import { TabSetup } from "../pages/tab-setup";
import { Endpoints } from "../pages/endpoints/endpoints.utils";

interface SpaceConfig {
    name: string;
    active: boolean;

    [configKey: string]: any;
}

export interface Space extends SpaceConfig {
    tabs: TabSetup<any>[];
    baseUrl: string;
    endpoints: Endpoints;
    envs: SpaceConfig[];
}

export interface EnvConfig extends SpaceConfig {
    list: SpaceConfig[];
}

const spacesLocalStorageKey = 'spaces';
const loadedSpaces: Space[] = JSON.parse(localStorage.getItem('spaces')) ?? [
    {
        name: 'my first space',
        tabs: [],
        active: true,
        endpoints: {},
        envs: [{
            name: 'firstdev',
            active: false,
            list: [{
                name: 'devList',
                active: false,
            }]
        }, {
            name: 'firstlocal',
            active: true,
            list: [{
                name: 'localList',
                active: true,
            }]
        }]
    },
    {
        name: 'my second space',
        tabs: [],
        active: false,
        endpoints: {},
        envs: [{
            name: 'seconddev',
            active: false,
            list: [{
                name: 'devList',
                active: false,
            }]
        }, {
            name: 'secondlocal',
            active: true,
            list: [{
                name: 'localList',
                active: true,
            }]
        }]
    }];

const SpacesContext = createContext({
    spaces: loadedSpaces,
    setSpaceConfig: (_spaceKey: string, _configKey: string, _value: any) => {},
    setActiveConfig: (_configPath: string[], _newActiveConfigName: string) => {},
    getActive: () => loadedSpaces[0],
    setActive: (_name: string) => {},
    getActiveEnv: () => loadedSpaces[0].envs[0],
    setActiveEnv: (_name: string) => {},
    tabs: () => ([] as TabSetup<any>[]),
    updateCache: () => {},
    currentTabIndex: 0,
    baseUrl: null as string,
    setBaseUrl: (_newUrl: string) => {},
    addTab: (_newTab: TabSetup<any>) => {return 0 as number},
    removeTab: (_index: number) => {},
    setCurrentTab: (_index: number) => {},
    updateTab: (_index: number, _setup: TabSetup<any>) => {},
    endpoints: () => ({} as Endpoints),
    addEndpoints: (_newEndpoints: Endpoints) => {},
    removeEndpoint: (_path: string) => {},
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

    const setActiveConfig = (configPath: string[], newActiveConfigName: string) => {
        const getNestedConfig = (configPath: string[], configs: SpaceConfig[]): SpaceConfig[] => {
            let currentConfig = configs.filter(x => x.active)[0];
            if (!currentConfig) {
                configs[0].active = true;
                currentConfig = configs[0];
            }
            if (configPath.length === 0)
                return configs;
            if (configPath.length === 1)
                return currentConfig[configPath[0]];
            else
                return getNestedConfig(configPath.filter((_v, i) => i > 0), currentConfig[configPath[0]]);
        };

        const nestedConfigs = getNestedConfig(configPath, spaces);

        const currentActiveConfig = nestedConfigs.filter(x => x.active)[0];
        if (currentActiveConfig)
            currentActiveConfig.active = false;
        nestedConfigs.filter(x => x.name === newActiveConfigName)[0].active = true;

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
            setActiveConfig,
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