import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ContextMenu, ContextMenuItem } from "./context-menu";

export const ContextMenuContext = createContext({
    invoke: (event: MouseEvent, items: ContextMenuItem[]) => {},
});

export const ContextMenuProvider = ({ children }: { children: any }) => {
    const invoke = (event: MouseEvent, items: ContextMenuItem[]) => {
        const modal = <ContextMenu
            { ...{ event, items } }
        />

        const div = document.createElement('div');
        document.createElement('context-menu-parent').append(div)
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
        <ContextMenuContext.Provider value={ {
            invoke: invoke,
        } }>
            { children }
        </ContextMenuContext.Provider>
    );
};

export const invokeContextMenu = (event: MouseEvent, items: ContextMenuItem[]) => useContext(ContextMenuContext).invoke(event, items);