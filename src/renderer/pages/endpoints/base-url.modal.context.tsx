import React, { createContext, useContext } from 'react';
import { BaseUrlModal } from "./base-url.modal";
import ReactDOM from 'react-dom';
import { useSpaces } from "../../common/spaces.context";

export const BaseUrlModalContext = createContext({
    invoke: (triggeringElement: () => HTMLElement) => {},
});

const width = 250;
const offset = 0;

export const BaseUrlModalProvider = ({ children }: { children: any }) => {
    const { getBaseUrl } = useSpaces();
    const invoke = (triggeringElement: () => HTMLElement) => {
        const element = triggeringElement();

        const modal = <BaseUrlModal
            left={ `${ element.offsetLeft + element.offsetWidth / 2 }px` }
            top={ `${ element.getBoundingClientRect().top + offset }px` }
            width={ `${ width }px` }
            onFinish={ (newUrl) => { } }
        />

        const div = document.createElement('div');
        element.append(div)
        // TODO switch to createroot
        ReactDOM.render(modal, div);
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