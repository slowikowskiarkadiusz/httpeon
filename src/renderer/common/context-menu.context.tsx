import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ContextMenu, ContextMenuItem } from "./context-menu";

export const ContextMenuContext = createContext({
    invokeContextMenu: (event: MouseEvent, items: ContextMenuItem[]) => {},
});

export const ContextMenuProvider = ({ children }: { children: any }) => {
    const invokeContextMenu = (event: MouseEvent, items: ContextMenuItem[]) => {
        console.log('invokeContextMenu', items);
        const modal = <ContextMenu
            { ...{ event, items } }
        />

        const div = document.createElement('div');
        document.getElementById('context-menu-parent').append(div)
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
            invokeContextMenu: invokeContextMenu,
        } }>
            { children }
        </ContextMenuContext.Provider>
    );
};

export const useContextMenu = () => useContext(ContextMenuContext);