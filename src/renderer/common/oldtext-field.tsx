import './text-field.scss'
import React, { useState } from "react";

interface v2d {
    x: number,
    y: number
}

export function TextField(props: { value: string }) {
    const [isFocused, setIsFocused] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(window.getComputedStyle(e.nativeEvent.target as HTMLDivElement));
        const fontSize = parseInt(window.getComputedStyle(e.nativeEvent.target as HTMLDivElement).fontSize.replace('px', ''));
        const x = e.clientX - (e.clientX % fontSize);
        const y = e.clientY - (e.clientY % fontSize);
        setCursorPosition({ x, y });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const fontSize = parseInt(window.getComputedStyle(e.nativeEvent.target as HTMLDivElement).fontSize.replace('px', ''));
        let x = cursorPosition.x;
        let y = cursorPosition.y;
        switch (e.key) {
            case 'ArrowLeft':
                x -= fontSize;
                break;
            case 'ArrowRight':
                x += fontSize;
                break;
            case 'ArrowDown':
                y += fontSize;
                break;
            case 'ArrowUp':
                y -= fontSize;
                break;
        }

        setCursorPosition({ x, y });
    }

    return <div contentEditable={ true }
                suppressContentEditableWarning={ true }
                style={ {
                    userSelect: 'none',
                    cursor: 'text',
                    width: '100%',
                    height: '100%',
                    fontSize: '2rem',
                    fontFamily: 'Menlo',
                    position: 'relative',
                } }
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                onMouseDown={ onMouseDown }
                onMouseUp={ (e) => {} }
                onKeyDown={ e => onKeyDown(e) }>
        { props.value
            .split('\n')
            .map((line, i) =>
                <div contentEditable={ false }
                     key={ `text-field-${ i }` }
                     style={ { width: '100%', height: '1em', } }>{ line }</div>
            ) }
        { isFocused
            ? <div style={ {
                width: '0.15em',
                height: '1.1em',
                backgroundColor: 'black',
                animation: 'blink 1s infinite',
                position: 'absolute',
                top: `${ cursorPosition.y }px`,
                left: `${ cursorPosition.x }px`,
            } }></div>
            : undefined }
    </div>
}