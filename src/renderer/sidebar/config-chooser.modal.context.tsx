import React, { createContext, useContext } from 'react';
import { ConfigChooserModal } from "./config-chooser.modal";
import ReactDOM from 'react-dom';
import { useSpaces } from "../common/spaces.context";
import { TextInputModalProvider } from "../common/text-input.modal.context";

export const ConfigChooserModalContext = createContext({
    invoke: (configPath: string[], triggeringElement: () => HTMLElement, onClose: (chosen: string | undefined, index: number | undefined) => void) => {},
});

const width = 250;
const offset = 5;

export const ConfigChooserModalProvider = ({ children, parent }: { children: any, parent: () => HTMLElement }) => {
    const { setActiveConfig, addConfig, getConfigs, getActiveConfig } = useSpaces();

    const invoke = (configPath: string[],
                    triggeringElement: () => HTMLElement,
                    onClose: (chosen: string | undefined, index: number | undefined) => void) => {
        const element = triggeringElement();
        const modal = <TextInputModalProvider>
            <ConfigChooserModal
                configPath={ configPath }
                allConfigs={ getConfigs(configPath) }
                onClose={ () => div.remove() }
                onSelect={ (item, index) => {
                    setActiveConfig(configPath, item);
                    if (onClose) onClose(item, index);
                    setTimeout(() => div.remove(), 100);
                } }
                onDelete={ (item, index) => {
                    const confirmed = confirm('yes no??');
                } }
                onNew={ (name: string) => addConfig(configPath, name) }
                onExport={ () => console.log('onExport') }
                onImport={ () => console.log('onImport') }
                left={ `${ element.offsetLeft + element.offsetWidth / 2 }px` }
                top={ `${ element.getBoundingClientRect().bottom + offset }px` }
                width={ `${ width }px` }
            />
        </TextInputModalProvider>

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