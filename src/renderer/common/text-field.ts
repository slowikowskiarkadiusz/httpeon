import { v2d } from "../v2d";

export function createTextField(parent: HTMLElement, value: string) {
    let isFocused = false;
    let cursorClientPosition = v2d.zero;
    let cursorCords = v2d.zero;
    // let cursorCords.x = 0;
    // let cursorCords.y = -1;
    let lineDivs: HTMLElement[] = [];

    const onMouseDown = (diff: v2d, lineDiv: HTMLElement, lineIndex: number) => {
        cursorCords.y = lineIndex;
        const mousePosition = cursorClientPosition.add(new v2d(diff.x, diff.y));

        let range = document.createRange();
        let prevDistance = window.outerWidth;
        let resultDistance = window.outerWidth;
        let resultLetterPosition = v2d.zero;

        if (lineDiv.firstChild) {
            for (let i = 0; i <= lineDiv.textContent.length; i++) {
                const lineStringLength = (lineDiv.firstChild as any as string).length;
                range.setStart(lineDiv.firstChild, i);
                range.setEnd(lineDiv.firstChild, i >= lineStringLength ? lineStringLength : i);

                let letterRect = range.getBoundingClientRect();
                let letterPosition = new v2d(letterRect.x, letterRect.y);
                let distance = v2d.distance(letterPosition, mousePosition);
                if (distance < resultDistance) {
                    resultDistance = distance;
                    resultLetterPosition = letterPosition;
                    prevDistance = resultDistance;
                    cursorCords.x = i;
                    continue;
                }

                if (i > 0 && prevDistance == resultDistance && distance > resultDistance) {
                    break;
                }
            }
        } else {
            let letterRect = lineDiv.getBoundingClientRect();
            resultLetterPosition = new v2d(letterRect.x, letterRect.y);
        }

        cursorClientPosition = resultLetterPosition;
        updateCursor();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (!isFocused) return;
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key))
            navigateWithArrows(e);

        updateCursor();
    }

    const navigateWithArrows = (e: KeyboardEvent) => {
        let x = 0;
        let y = 0;
        switch (e.key) {
            case 'ArrowLeft':
                x -= 1;
                break;
            case 'ArrowRight':
                x += 1;
                break;
            case 'ArrowUp':
                y -= 1;
                break;
            case 'ArrowDown':
                y += 1;
                break;
        }

        cursorCords.y += y;
        let lineDiv = lineDivs[cursorCords.y];
        let lineStringLength = (lineDiv.firstChild as any as string ?? "").length;

        cursorCords.x += x;
        let startIndex = cursorCords.x;
        let isStartAfterTheEnd = startIndex > lineStringLength;
        let isStartBeforeTheBeginning = startIndex < 0;
        if (isStartAfterTheEnd || isStartBeforeTheBeginning) {
            cursorCords.y += x;
            lineDiv = lineDivs[cursorCords.y];
            lineStringLength = (lineDiv.firstChild as any as string ?? "").length;
            cursorCords.x = startIndex = isStartAfterTheEnd ? 0 : (isStartBeforeTheBeginning ? lineStringLength : 0);
        }

        let rect: DOMRect;

        if (lineDiv.firstChild) {
            let range = document.createRange();
            range.setStart(lineDiv.firstChild, startIndex);
            range.setEnd(lineDiv.firstChild, (startIndex >= lineStringLength ? startIndex : lineStringLength));
            rect = range.getBoundingClientRect();
        } else
            rect = lineDiv.getBoundingClientRect();

        cursorClientPosition.x = rect.left;
        cursorClientPosition.y = rect.y;
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

        cursor.style.top = `${ cursorClientPosition.y }px`;
        cursor.style.left = `${ cursorClientPosition.x }px`;
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
    textField.addEventListener('keydown', e => onKeyDown(e));

    lineDivs.push(...value
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
            cursorCords.y = i;
            lineElement.addEventListener('mousedown', e => onMouseDown(new v2d(e.x, e.y).sub(cursorClientPosition), lineElement, i));
            return lineElement;
        }));
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