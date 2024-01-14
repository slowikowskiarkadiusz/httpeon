import React, { createContext, useContext } from 'react';
import { createRoot } from "react-dom/client";
import { ModalWrapper } from "./modal-wrapper";

// querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;

// interface ModalMap{
//     'a':ScriptModal,
// }

export const ModalContext = createContext({
    invokeModal: (modal: JSX.Element, header: string, onClose: (value: string) => void) => {},
    // test: function abc<T>(){}
});

export const ModalProvider = ({ children, parent }: { children: any, parent: () => HTMLDivElement }) => {
    const invoke = (modal: JSX.Element, header: string, onClose: (value: string) => void) => {
        const element = parent();
        const whole = <div style={ {
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
        } }
                           onClick={ e => rootInstance.unmount() }>
            <ModalWrapper header={ header }
                          inner={ modal }/>
        </div>;
        let rootInstance = createRoot(element)
        rootInstance.render(whole);

        const onEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                rootInstance.unmount();
                window.removeEventListener('keydown', onEscape);
            }
        }
        
        window.addEventListener('keydown', onEscape);

        setTimeout(() => {
            document.addEventListener('click', (event: MouseEvent) => {
                if (!element.contains(event.target as any))
                    rootInstance.unmount();
            });
        }, 0);
    };

    return (
        <ModalContext.Provider value={ {
            invokeModal: invoke
        } }>
            { children }
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);