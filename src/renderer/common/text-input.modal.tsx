import React from "react";
import { inputStyle } from "../pages/endpoints/endpoint-request-editor";

export function TextInputModal(props: {
    header: string,
    placeholder?: string,
    left: string,
    top: string,
    width: string,
    defaultValue: string,
    onClose: (newUrl: string) => void
}) {
    const ref = React.createRef<HTMLDivElement>();
    const inputRef = React.createRef<HTMLInputElement>();
    const hrStyle = {
        border: 'none',
        borderTop: '1px solid var(--theme-bc)',
        margin: '0',
    };

    const clickListener = (event: MouseEvent) => {
        if (!ref.current.contains(event.target as any)) {
            props.onClose(undefined);
            ref.current.parentElement.remove();
            document.removeEventListener('click', clickListener);
        }
    };

    setTimeout(() => document.addEventListener('click', clickListener), 0);

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
            fontSize: '2rem',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 36px',
        } }>
        <div style={ { textAlign: 'center', padding: '1rem' } }><b>{ props.header }</b></div>
        <hr style={ hrStyle }/>
        <div style={ { marginTop: '0.5em', display: 'flex' } }>
            <input ref={ inputRef }
                   type="text"
                   style={ inputStyle }
                   placeholder={ props.placeholder }
                   autoFocus={ true }
                   onKeyUp={ (e) => {
                       if (['Enter', 'Return'].includes(e.code)) {
                           props.onClose((e.target as HTMLInputElement).value);
                           ref.current.parentElement.remove();
                       }
                   } }
                   defaultValue={ props.defaultValue }
            />
        </div>
    </div>;
}

export default { BaseUrlModal: TextInputModal };
