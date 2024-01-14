import React, { createContext, useContext } from 'react';
import { createRoot } from "react-dom/client";
import ScriptModal, { ScriptModalProps, ScriptModalResult } from "./script/script.modal";
import { ModalWrapper } from "./modal-wrapper";
import { Modal } from "./modal";

interface ModalMap {
    'script': [typeof ScriptModal, ScriptModalProps, ScriptModalResult],
}

export const ModalContext = createContext({
    invokeModal:
        function invokeModal<K extends keyof ModalMap>(type: ModalMap[K][0],
                                                       props: ModalMap[K][1],
                                                       header: string): Promise<ModalMap[K][2]> {
            return new Promise<ModalMap[K][2]>((resolve, reject) => reject('not implemented'))
        },
});

export const ModalProvider = ({ children, parent }: { children: any, parent: () => HTMLDivElement }) => {
    function invokeModal<K extends keyof ModalMap>(type: ModalMap[K][0],
                                                   props: ModalMap[K][1],
                                                   header: string): Promise<ModalMap[K][2]> {
        return new Promise((resolve, reject) => {
            const element = parent();
            let rootInstance = createRoot(element)
            let reference: Modal<any, any, any> | undefined = undefined;
            const newElement = React.createElement(type, {
                ...props,
                ref: ref => {
                    if (ref)
                        reference = ref
                }
            });

            const res = () => {
                resolve(reference.getResult());
                rootInstance.unmount();
            }
            const rej = () => {
                reject(reference.getResult());
                rootInstance.unmount();
            }

            const whole = <div style={ {
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: 'flex',
            } }
                               onClick={ () => rootInstance.unmount() }>
                <ModalWrapper header={ header }
                              ref={ ref => reference.wrapper = ref }
                              inner={ newElement }
                              onCancelClick={ rej }
                              onOkClick={ res }/>
            </div>;

            rootInstance.render(whole);

            const onEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    rej();
                    window.removeEventListener('keydown', onEscape);
                    window.removeEventListener('click', onClick);
                }
            }

            const onClick = (event: MouseEvent) => {
                if (!element.contains(event.target as any)) {
                    rej();
                    window.removeEventListener('keydown', onEscape);
                    window.removeEventListener('click', onClick);
                }
            }

            window.addEventListener('keydown', onEscape);
            setTimeout(() => document.addEventListener('click', onClick), 0);
        })
    }

    return (
        <ModalContext.Provider value={ {
            invokeModal
        } }>
            { children }
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);