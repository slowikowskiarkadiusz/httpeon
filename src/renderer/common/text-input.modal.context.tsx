import React, { createContext, useContext } from 'react';
import { TextInputModal } from "./text-input.modal";
import ReactDOM from 'react-dom';

export const TextInputModalContext = createContext({
    invokeTextInputModal: (originalValue: string, header: string, triggeringElement: () => HTMLElement, clickAt: { x: number, y: number }, placeholder?: string, onClose?: (value?: string) => void) => {},
});

const width = 250;
const offset = 10;

export const TextInputModalProvider = ({ children }: { children: any }) => {
    const invoke = (originalValue: string,
                    header: string,
                    triggeringElement: () => HTMLElement,
                    clickAt: { x: number, y: number },
                    placeholder?: string,
                    onClose?: (value: string) => void) => {
        const element = triggeringElement();

        const modal = <TextInputModal
            header={ header }
            placeholder={ placeholder }
            left={ `${ clickAt.x + offset }px` }
            top={ `${ clickAt.y + offset }px` }
            width={ `${ width }px` }
            defaultValue={ originalValue }
            onClose={ onClose }
        />
        const div = document.createElement('div');
        element.append(div)
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
        <TextInputModalContext.Provider value={ {
            invokeTextInputModal: invoke
        } }>
            { children }
        </TextInputModalContext.Provider>
    );
};

export const useTextInputModal = () => useContext(TextInputModalContext);