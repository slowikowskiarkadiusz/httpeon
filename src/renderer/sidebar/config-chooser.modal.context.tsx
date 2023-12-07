import React, { createContext, ReactDOM, useContext } from 'react';
import { ConfigChooserModal } from "./config-chooser.modal";
import { root } from "../index";

export const ConfigChooserModalContext = createContext({
    invoke: (config: string) => {},
});

const width = 400;
const height = 400;
const offset = 20;

export const ConfigChooserModalProvider = ({ children }: any, props: { at: { x: number, y: number }, onClose: (v: any) => void, parent: HTMLElement }) => {
    const invoke = (config: string) => {
        const modal = <ConfigChooserModal
            configName={ config }
            items={ ['ab', 'cd'] }
            onSelect={ () => console.log('onSelect') }
            onDelete={ () => console.log('onDelete') }
            onNew={ () => console.log('onNew') }
            onExport={ () => console.log('onExport') }
            onImport={ () => console.log('onImport') }
            left={ `${ props.at.x + width / 2 }px` }
            top={ `${ props.at.y + height + offset }px` }
            width={ `${ width }px` }
            height={ `${ height }px` }
        />

        root.render(modal, props.parent);
        props.parent.append(modal);
    };

    return (
        <ConfigChooserModalContext.Provider value={ {
            invoke: invoke,
        } }>
            { children }
        </ConfigChooserModalContext.Provider>
    );
};

export const useConfigChooserModal = () => useContext(ConfigChooserModalContext);