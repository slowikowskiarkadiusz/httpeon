import './index.scss';
import { Sidebar } from './sidebar/sidebar';
import { SpacesProvider } from "./common/spaces.context";
import { ContextMenuProvider } from "./common/context-menu/context-menu.context";
import { Page } from "./pages/page";
import { TabProvider } from "./nav/tab.context";
import React from "react";
import { createTextField } from "./common/text-field";

const text = `
// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

const anExampleVariable = "Hello World"
console.log(anExampleVariable)

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is you playground.
  `;

export function App() {
    const ref = React.createRef<HTMLDivElement>();
    setTimeout(() => {
        createTextField(ref.current, text);
    }, 1);
    return <div ref={ ref }
                style={ { width: '100vw', height: '100vh' } }></div>

    return (
        <ContextMenuProvider>
            <SpacesProvider>
                <div id="context-menu-parent"
                     style={ { zIndex: 1, position: 'relative', width: '0', height: '0' } }></div>
                <div style={ {
                    fontSize: '2rem',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100vh',
                    width: '100%',
                    columnGap: 'var(--app-gap)',
                    backgroundColor: 'var(--theme-bc)',
                    color: 'var(--theme-font-color)',
                } }>
                    <div className="barleft"
                         style={ { width: 'var(--sidebar-content-size)' } }>
                        <Sidebar/>
                    </div>
                    <div style={ {
                        flex: '0 1 auto',
                        width: 'calc(100vw - calc(var(--app-gap) + var(--sidebar-content-size)))'
                    } }>
                        <TabProvider>
                            <Page/>
                        </TabProvider>
                    </div>
                </div>
            </SpacesProvider>
        </ContextMenuProvider>
    );
}