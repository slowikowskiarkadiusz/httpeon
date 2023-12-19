import React, { createContext, useContext, useState } from 'react';
import { TabSetup } from "../pages/tab-setup";

export const TabContext = createContext({
    tabs: [],
    currentTabIndex: 0,
    addTab: (newTab: TabSetup<any>) => {return 0 as number},
    removeTab: (index: number) => {},
    setCurrentTab: (index: number) => {},
});

export const TabProvider = ({ children }: any) => {
    const [tabs, setTabs] = useState([]);
    const [currentTabIndex, setCurrentTabIndex] = useState(-1);

    const addTab = (newTab: TabSetup<any>) => {
        if (!tabs.some((x) => x.id == newTab.id))
            tabs.push(newTab);

        setTabs([...tabs]);

        return tabs.findIndex(x => x.id === newTab.id);
    };

    const removeTab = (index: number) => {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);

        if (currentTabIndex >= newTabs.length) {
            setCurrentTabIndex(newTabs.length - 1);
        }
    };

    const setCurrentTab = (index: number) => setCurrentTabIndex(index);

    return (
        <TabContext.Provider value={ { tabs, currentTabIndex, addTab, removeTab, setCurrentTab } }>
            { children }
        </TabContext.Provider>
    );
};

export const useTabs = () => useContext(TabContext);