import React, { createContext, useContext } from 'react';
import { BaseUrlModal } from "./base-url.modal";
import ReactDOM from 'react-dom';

export const BaseUrlModalContext = createContext({
    invoke: (config: string, triggeringElement: () => HTMLElement, onClose: (v: any) => void) => {},
});

const width = 250;
const offset = 5;

export const BaseUrlModalProvider = ({ children, parent, onBaseUrlProvided }: { children: any, parent: () => HTMLElement, onBaseUrlProvided: (baseUrl: string) => {} }) => {
    const invoke = (config: string, triggeringElement: () => HTMLElement, onClose: (v: any) => void,) => {
        const element = triggeringElement();
        const modal = <BaseUrlModal
            left={ `${ element.offsetLeft + element.offsetWidth / 2 }px` }
            top={ `${ element.getBoundingClientRect().bottom + offset }px` }
            width={ `${ width }px` }
            onUrlChange={ (newUrl) => {
                
            } }
        />
        
        const div = document.createElement('div');
        parent().append(div)
        // TODO switch to createroot
        ReactDOM.render(modal, div);

        setTimeout(() => {
            document.addEventListener('click', (event: MouseEvent) => {
                if (!div.contains(event.target as any)) {
                    div.remove();
                    onBaseUrlProvided('p');
                }
            });
        }, 0);
    };

    return (
        <BaseUrlModalContext.Provider value={ {
            invoke: invoke,
        } }>
            { children }
        </BaseUrlModalContext.Provider>
    );
};

export const useBaseUrlModal = () => useContext(BaseUrlModalContext);