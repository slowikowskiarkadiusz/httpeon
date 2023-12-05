import React, { createContext, useContext, useState } from 'react';

const spacesLocalStorageKey = 'spaces';
const loadedSpaces: { [spaceKey: string]: { [configKey: string]: any } } = JSON.parse(localStorage.getItem('spaces')) ?? { 'difolt': {}, 'dupka': {} };

export const SpacesContext = createContext({ spaces: loadedSpaces, setSpaceConfig: (spaceKey: string, configKey: string, value: any) => {} });

export const SpacesProvider = ({ children }: any) => {
    const [spaces, setSpaces] = useState(loadedSpaces);

    const setSpaceConfig = (spaceKey: string, configKey: string, value: any) => {
        spaces[spaceKey][configKey] = value;
        localStorage.setItem(spacesLocalStorageKey, JSON.stringify(spaces));
        setSpaces(spaces);
    }

    return (
        <SpacesContext.Provider value={ { spaces, setSpaceConfig } }>
            { children }
        </SpacesContext.Provider>
    );
};

export const useSpaces = () => useContext(SpacesContext);