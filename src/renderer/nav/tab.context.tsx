import React, { createContext, useContext, useState } from 'react';

export interface Tab {
    name: string;
    path: string;
}

export const TabContext = createContext({
    tabs: [],
    currentTabIndex: -1,
    addTab: (newTab: Tab) => {},
    removeTab: (index: number) => {}
});

export const TabProvider = ({ children }: any) => {
    const [tabs, setTabs] = useState([
        { name: 'aaa', path: 'aaa' },
        { name: 'bbb', path: 'bbb' },
        { name: 'ccc', path: 'ccc' },
    ]);

    const [currentTabIndex, setCurrentTabIndex] = useState(-1);

    const addTab = (newTab: Tab) => {
        const newTabs = [...tabs];

        if (!newTabs.some((x) => x.path == newTab.path)) {
            newTabs.push(newTab);
        }

        setTabs(newTabs);
    };

    const removeTab = (index: number) => {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);

        if (currentTabIndex >= newTabs.length) {
            setCurrentTabIndex(newTabs.length - 1);
        }
    };

    return (
        <TabContext.Provider value={ { tabs, currentTabIndex, addTab, removeTab } }>
            { children }
        </TabContext.Provider>
    );
};

export const useTabs = () => useContext(TabContext);