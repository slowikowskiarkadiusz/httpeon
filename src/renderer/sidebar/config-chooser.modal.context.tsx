import React, { createContext, useContext } from 'react';
import { ConfigChooserModal } from "./config-chooser.modal";
import ReactDOM from 'react-dom';
import { useSpaces } from "../common/spaces.context";

export const ConfigChooserModalContext = createContext({
    invoke: (configPath: string[], triggeringElement: () => HTMLElement, options: string[], onClose: (chosen: string | undefined, index: number | undefined) => void) => {},
});

const width = 250;
const offset = 5;

export const ConfigChooserModalProvider = ({ children, parent }: { children: any, parent: () => HTMLElement }) => {
    const { setActiveConfig } = useSpaces();

    const invoke = (configPath: string[],
                    triggeringElement: () => HTMLElement,
                    options: string[],
                    onClose: (chosen: string | undefined, index: number | undefined) => void) => {
        const element = triggeringElement();
        const modal = <ConfigChooserModal
            configPath={ configPath }
            items={ options }
            onSelect={ (item, index) => {
                setActiveConfig(configPath, item);
                onClose(item, index);
                setTimeout(() => div.remove(), 100);
            } }
            onDelete={ (item, index) => {
                const confirmed = confirm('yes no??');
            } }
            onNew={ () => console.log('onNew') }
            onExport={ () => console.log('onExport') }
            onImport={ () => console.log('onImport') }
            left={ `${ element.offsetLeft + element.offsetWidth / 2 }px` }
            top={ `${ element.getBoundingClientRect().bottom + offset }px` }
            width={ `${ width }px` }
        />

        const div = document.createElement('div');
        parent().append(div)
        // TODO switch to createroot
        ReactDOM.render(modal, div);

        setTimeout(() => {
            document.addEventListener('click', (event: MouseEvent) => {
                if (!div.contains(event.target as any))
                    div.remove();
            });
        }, 0);
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