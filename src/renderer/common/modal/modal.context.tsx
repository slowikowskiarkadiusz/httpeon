import React, { createContext, useContext } from 'react';
import { createRoot } from "react-dom/client";
import { ModalWrapper } from "./modal-wrapper";

export const ModalContext = createContext({
    invokeModal: (modal: JSX.Element, header: string, onClose: (value: string) => void) => {},
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
                           onClick={ e => {
                               rootInstance.unmount();
                               console.log('cipa');
                           } }>
            <ModalWrapper header={ header }
                          inner={ modal }/>
        </div>;
        let rootInstance = createRoot(element)
        rootInstance.render(whole);

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