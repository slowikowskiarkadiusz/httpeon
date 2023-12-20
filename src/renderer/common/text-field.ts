export function createTextField(parent: HTMLElement, value: string) {
    let isFocused = false;
    let cursorPosition = { x: 0, y: 0 };
    let letterWidth = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
        // const fontSize = parseInt(window.getComputedStyle(e.target as HTMLDivElement).fontSize.replace('px', ''));
        const fontSize = letterWidth;
        const x = e.clientX - (e.clientX % fontSize.x);
        const y = e.clientY - (e.clientY % fontSize.y);
        cursorPosition = { x, y };
        updateCursor();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (!isFocused) return;
        // const fontSize = parseInt(window.getComputedStyle(e.target as HTMLDivElement).fontSize.replace('px', ''));
        const fontSize = letterWidth;
        let x = cursorPosition.x;
        let y = cursorPosition.y;
        switch (e.key) {
            case 'ArrowLeft':
                x -= fontSize.x;
                break;
            case 'ArrowRight':
                x += fontSize.x;
                break;
            case 'ArrowDown':
                y += fontSize.y;
                break;
            case 'ArrowUp':
                y -= fontSize.y;
                break;
        }

        cursorPosition = { x, y }
        updateCursor();
    }

    const textField = parent.ownerDocument.createElement('div');
    const styleElement = parent.ownerDocument.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = `@keyframes ---text-field-cursor-blinking--- {
     0% {
        opacity: 1;
    }
    49% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}`;
    parent.appendChild(textField);

    const updateCursor = () => {
        let cursor = textField.querySelector('#cursor') as HTMLDivElement;

        if (!cursor) {
            cursor = textField.ownerDocument.createElement('div');
            textField.appendChild(cursor);

            cursor.id = "cursor";
            cursor.style.width = '0.15em';
            cursor.style.height = '1.1em';
            cursor.style.backgroundColor = 'var(--theme-cursor-color)';
            cursor.style.animation = '---text-field-cursor-blinking--- 1s infinite';
            cursor.style.position = 'absolute';
        }

        cursor.style.top = `${ cursorPosition.y }px`;
        cursor.style.left = `${ cursorPosition.x }px`;
    }

    textField.contentEditable = 'true';
    textField.style.userSelect = 'none';
    textField.style.cursor = 'text';
    textField.style.width = '100%';
    textField.style.height = '100%';
    textField.style.fontSize = '2rem';
    textField.style.fontFamily = 'Menlo';
    textField.style.position = 'relative';

    textField.addEventListener('focus', () => isFocused = true);
    textField.addEventListener('blur', () => isFocused = false);
    textField.addEventListener('mousedown', onMouseDown);
    textField.addEventListener('mouseup', (e) => {});
    textField.addEventListener('keydown', e => onKeyDown(e));

    value
        .split('\n')
        .map((line, i) => {
            const lineElement = textField.ownerDocument.createElement('div')
            textField.appendChild(lineElement);

            lineElement.contentEditable = 'false';
            lineElement.id = `line-${ i }`;
            lineElement.style.width = '100%';
            lineElement.style.color = 'var(--theme-font-color)';
            lineElement.style.height = '1em';
            lineElement.innerText = line;
        });
}


// const placeholderForMeasuringLetter = parent.ownerDocument.createElement('div');
// placeholderForMeasuringLetter.innerText = 'm';
// placeholderForMeasuringLetter.style.position = 'absolute';
// placeholderForMeasuringLetter.style.fontSize = '2rem';
// parent.append(placeholderForMeasuringLetter);
// letterWidth = {
//     x: placeholderForMeasuringLetter.clientWidth,
//     y: parseInt(window.getComputedStyle(placeholderForMeasuringLetter as HTMLDivElement).fontSize.replace('px', ''))
// };
// placeholderForMeasuringLetter.remove();