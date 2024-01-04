import React from "react";
import { inputStyle } from "./endpoint-request-editor";

export function BaseUrlModal(props: {
    left: string,
    top: string,
    width: string,
    defaultValue: string,
    onFinish: (newUrl: string) => void
}) {
    const ref = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const hrStyle = {
        border: 'none',
        borderTop: '1px solid var(--theme-bc)',
        margin: '0',
    };

    setTimeout(() => {
        document.addEventListener('click', (event: MouseEvent) => {
            if (!ref.current.contains(event.target as any)) {
                props.onFinish(inputRef.current.value);
                ref.current.parentElement.remove();
            }
        });
    }, 0);

    return <div
        ref={ ref }
        style={ {
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
            <input ref={ inputRef }
                   type="text"
                   style={ inputStyle }
                   placeholder="base url..."
                   autoFocus={ true }
                   onKeyUp={ (e) => {
                       if (['Enter', 'Return'].includes(e.code)) {
                           props.onFinish((e.target as HTMLInputElement).value);
                           ref.current.parentElement.remove();
                       }
                   } }
                   defaultValue={ props.defaultValue }
            />
        </div>
    </div>;
}

export default { BaseUrlModal };
