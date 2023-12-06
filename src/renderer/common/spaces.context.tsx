import React, { createContext, useContext, useState } from 'react';

export interface Space {
    [configKey: string]: any
}

const spacesLocalStorageKey = 'spaces';
const loadedSpaces: Space[] = JSON.parse(localStorage.getItem('spaces')) ?? [
    { 'name': 'space1', 'active': false, 'envs': [{ 'name': 'dev', active: false }, { 'name': 'local', active: true }] },
    { 'name': 'space2', 'active': true, 'envs': [{ 'name': 'test', active: false }, { 'name': 'prod', active: true }] }];

export const SpacesContext = createContext({
    spaces: loadedSpaces,
    setSpaceConfig: (spaceKey: string, configKey: string, value: any) => {},
    getActive: () => loadedSpaces[0],
    setActive: (name: string) => {},
});

export const SpacesProvider = ({ children }: any) => {
    const [spaces, _setSpaces] = useState(loadedSpaces);
    const [activeSpace, _setActiveSpace] = useState(spaces.filter(x => x.active)[0] ?? spaces[0]);

    const setSpaceConfig = (spaceKey: string, configKey: string, value: any) => {
        activeSpace[configKey] = value;
        localStorage.setItem(spacesLocalStorageKey, JSON.stringify(spaces));
        _setSpaces(spaces);
    }

    const getActive = () => activeSpace;
    const setActive = (name: string) => _setActiveSpace(spaces.filter(x => x.name === name)[0] ?? spaces[0]);

    return (
        <SpacesContext.Provider value={ { spaces, setSpaceConfig, getActive, setActive } }>
            { children }
        </SpacesContext.Provider>
    );
};

export const useSpaces = () => useContext(SpacesContext);