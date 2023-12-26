import React, { createContext, useContext } from 'react';
import { BaseUrlModal } from "./base-url.modal";
import ReactDOM from 'react-dom';
import { useSpaces } from "../../common/spaces.context";

export const BaseUrlModalContext = createContext({
    invoke: (triggeringElement: () => HTMLElement, clickAt: { x: number, y: number }) => {},
});

const width = 250;
const offset = 60;

export const BaseUrlModalProvider = ({ children }: { children: any }) => {
    const { setBaseUrl, baseUrl } = useSpaces();
    const invoke = (triggeringElement: () => HTMLElement, clickAt: { x: number, y: number }) => {
        const element = triggeringElement();

        const modal = <BaseUrlModal
            left={ `${ element.getBoundingClientRect().left - clickAt.x + offset }px` }
            top={ `${ element.getBoundingClientRect().top - clickAt.y + offset }px` }
            width={ `${ width }px` }
            defaultValue={ baseUrl }
            onFinish={ (newUrl) => { setBaseUrl(newUrl) } }
        />

        const div = document.createElement('div');
        element.append(div)
        // TODO switch to createroot
        ReactDOM.render(modal, div);
    };

    return (
        <BaseUrlModalContext.Provider value={ { invoke } }>
            { children }
        </BaseUrlModalContext.Provider>
    );
};

export const useBaseUrlModal = () => useContext(BaseUrlModalContext);