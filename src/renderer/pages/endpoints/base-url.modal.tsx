import React from "react";
import { inputStyle } from "./endpoint-text-editor";

export function BaseUrlModal(props: {
    left: string,
    top: string,
    width: string,
    onUrlChange: (url: string) => void,
}) {
    const hrStyle = {
        border: 'none',
        borderTop: '1px solid var(--theme-bc)',
        margin: '0',
    };
    
    return <div style={ {
        position: 'absolute',
        padding: '1em',
        left: props.left,
        top: props.top,
        width: props.width,
        backdropFilter: 'blur(7px)',
        backgroundColor: `var(--theme-bc-3t)`,
        borderRadius: 'var(--border-radius)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 36px',
    } }>
        <div style={ { textAlign: 'center', padding: '1rem' } }><b>Base URL</b></div>
        <hr style={ hrStyle }/>
        <div style={ { marginTop: '0.5em', display: 'flex' } }>
            <input type="text"
                   style={ inputStyle }
                   placeholder="base url..."
                   onChange={ e => {
                       props.onUrlChange((e.target as HTMLInputElement).value);
                   } }
                // defaultValue={ '' }
            />
        </div>
    </div>;
}

export default { BaseUrlModal };
