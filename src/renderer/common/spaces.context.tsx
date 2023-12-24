import React, { createContext, useContext, useState } from 'react';
import { TabSetup } from "../pages/tab-setup";

export interface Space {
    'name': string;
    'active': boolean;
    'tabs': TabSetup<any>[];

    [configKey: string]: any;
}

const spacesLocalStorageKey = 'spaces';
const loadedSpaces: Space[] = JSON.parse(localStorage.getItem('spaces')) ?? [
    {
        'name': 'space1',
        'tabs': [],
        'active': false,
        'envs': [{
            'name': 'dev',
            active: false
        },
            {
                'name': 'local',
                active: true
            }]
    },
    {
        'name': 'space2',
        'tabs': [],
        'active': true,
        'envs': [{
            'name': 'test',
            active: false
        },
            {
                'name': 'prod',
                active: true
            }]
    }];

const SpacesContext = createContext({
    spaces: loadedSpaces,
    setSpaceConfig: (spaceKey: string, configKey: string, value: any) => {},
    getActive: () => loadedSpaces[0],
    setActive: (name: string) => {},
    tabs: () => ([] as TabSetup<any>[]),
    updateCache: () => {},
    currentTabIndex: 0,
    addTab: (newTab: TabSetup<any>) => {return 0 as number},
    removeTab: (index: number) => {},
    setCurrentTab: (index: number) => {},
    updateTab: (index: number, setup: TabSetup<any>) => {},
});

export const SpacesProvider = ({ children }: any) => {
    const [spaces, _setSpaces] = useState(loadedSpaces);
    const [activeSpace, _setActiveSpace] = useState(spaces.filter(x => x.active)[0] ?? spaces[0]);
    const [currentTabIndex, setCurrentTabIndex] = useState(-1);

    let newCurrentTabIndex = loadedSpaces.filter(x => x.active)[0]?.tabs.findIndex(x => x.active) ?? -1;
    if (newCurrentTabIndex !== currentTabIndex)
        setCurrentTabIndex(newCurrentTabIndex);

    const setSpaceConfig = (spaceKey: string, configKey: string, value: any) => {
        activeSpace[configKey] = value;
        _setSpaces(spaces);
        updateCache();
    }

    const getActive = () => activeSpace;
    const setActive = (name: string) => _setActiveSpace(spaces.filter(x => x.name === name)[0] ?? spaces[0]);

    const tabs = () => activeSpace.tabs;

    const addTab = (newTab: TabSetup<any>) => {
        if (!activeSpace.tabs.some((x) => x.id == newTab.id))
            activeSpace.tabs.push(newTab);

        updateCache();
        return activeSpace.tabs.findIndex(x => x.id === newTab.id);
    };

    const removeTab = (index: number) => {
        const newTabs = activeSpace.tabs.filter((_, i) => i !== index);
        activeSpace.tabs.splice(index, 1);

        if (currentTabIndex >= newTabs.length)
            setCurrentTabIndex(newTabs.length - 1);

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
        localStorage.setItem(spacesLocalStorageKey, JSON.stringify(spaces));
    }

    return (
        <SpacesContext.Provider value={ { spaces, setSpaceConfig, getActive, setActive, tabs, updateCache, currentTabIndex, addTab, removeTab, setCurrentTab, updateTab } }>
            { children }
        </SpacesContext.Provider>
    );
};

export const useSpaces = () => useContext(SpacesContext);