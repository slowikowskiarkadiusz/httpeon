import React, { createContext, useContext, useState } from 'react';
import { TabSetup } from "../pages/tab-setup";
import { Endpoints } from "../pages/endpoints/endpoints.utils";

export interface SpaceConfig {
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
    values: [string, string, boolean][];
}

const spacesLocalStorageKey = 'spaces';
const configTemplates: [string[], SpaceConfig][] = [
    [[], {
        name: '',
        active: false,
        tabs: [],
        endpoints: {},
        envs: [{
            name: 'default env',
            active: true,
        }]
    }],
    [['envs'], {
        name: '',
        active: false,
        values: [] as [string, string, boolean][]
    }
    ],
];

const loadedSpaces: Space[] = JSON.parse(localStorage.getItem('spaces')) ?? [
    {
        name: 'my first space',
        tabs: [],
        active: true,
        endpoints: {},
        envs: [{
            name: 'firstdev',
            active: false,
            values: [],
        }, {
            name: 'firstlocal',
            active: true,
            values: [],
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
            values: [],
        }, {
            name: 'secondlocal',
            active: true,
            values: [],
        }]
    }];

const SpacesContext = createContext({
    spaces: loadedSpaces,
    setSpaceConfig: (spaceKey: string, configKey: string, value: any) => {},
    getActiveConfig: (configPath: string[]) => ({} as SpaceConfig),
    getConfigs: (configPath: string[]) => ([] as SpaceConfig[]),
    setActiveConfig: (configPath: string[], newActiveConfigName: string) => {},
    addConfig: (configPath: string[], newConfigName: string) => {},
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
    let activeSpace = spaces.filter(x => x.active)[0];
    const [baseUrl, _setBaseUrl] = useState(activeSpace?.baseUrl);
    const [currentTabIndex, setCurrentTabIndex] = useState(loadedSpaces.filter(x => x.active)[0]?.tabs.findIndex(x => x.active) ?? -1);

    const getConfigs = (configPath: string[]) => getNestedConfig(configPath, spaces);
    const getActiveConfig = (configPath: string[]) => getNestedConfig(configPath, spaces).filter(x => x.active)[0]
    const setActiveConfig = (configPath: string[], newActiveConfigName: string) => {
        const nestedConfigs = getNestedConfig(configPath, spaces);

        const currentActiveConfig = nestedConfigs.filter(x => x.active)[0];
        if (currentActiveConfig)
            currentActiveConfig.active = false;
        nestedConfigs.filter(x => x.name === newActiveConfigName)[0].active = true;

        updateCache();
    }

    if (!activeSpace && spaces.length > 0)
        setActiveConfig([], spaces[0].name);

    const getCurrentTabIndex = () => activeSpace.tabs.findIndex(x => x.active) ?? -1;

    const setSpaceConfig = (spaceKey: string, configKey: string, value: any) => {
        activeSpace[configKey] = value;
        _setSpaces(spaces);
        updateCache();
    }

    const setBaseUrl = (newBaseUrl: string) => {
        _setBaseUrl(activeSpace.baseUrl = newBaseUrl);
        updateCache();
    }

    const addConfig = (configPath: string[], newConfigName: string) => {
        const nestedConfigs = getNestedConfig(configPath, spaces);
        const currentActiveConfig = nestedConfigs.filter(x => x.active)[0];
        if (currentActiveConfig)
            currentActiveConfig.active = false;
        const newConfig = { ...configTemplates.filter(x => compareArrays(x[0], configPath))[0][1] };
        newConfig.name = newConfigName;
        newConfig.active = true;
        nestedConfigs.splice(nestedConfigs.length, 0, newConfig)
        updateCache();
    };

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
            getConfigs,
            getActiveConfig,
            setActiveConfig,
            addConfig,
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
            removeEndpoint,
        } }>
            { children }
        </SpacesContext.Provider>
    );
};

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

const compareArrays = (a1: any[], a2: any[]) => {
    if (a1.length !== a2.length)
        return false;

    return a1.every((_v, i) => a1[i] === a2[i]);
}

export const useSpaces = () => useContext(SpacesContext);