import './context-menu.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ContextMenuItem {
    icon: IconDefinition;
    label: string;
    action?: () => void;
    nested?: ContextMenuItem[];
}

export function ContextMenu(props: { event: MouseEvent, items: ContextMenuItem[] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    setIsVisible(!isVisible && props.items?.length > 0);

    if (isVisible) {
        let widthDiff = props.event.pageX - document.getElementsByTagName('body')[0]?.scrollWidth;
        if (widthDiff > 0)
            setLeft(props.event.pageX - widthDiff);
        else
            setLeft(props.event.pageX);

        let heightDiff = props.event.pageY - document.getElementsByTagName('body')[0]?.scrollHeight;
        if (heightDiff > 0)
            setTop(props.event.pageY - heightDiff);
        else
            setTop(props.event.pageY);

        setLeft(left + 1);
        setTop(top + 1);
    }

    return <div style={ {
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: 'none',
        cursor: 'default',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        maxWidth: '100%',
        top: '0',
        left: '0',
    } }>
        <ContextMenuList spawnAt={ { top: top, left: left } }
                         items={ props.items }/>
    </div>
}

export function ContextMenuList(props: {
    items: ContextMenuItem[],
    spawnAt: { top: number, left: number },
    onmouseover?: () => void,
    onmouseleave?: () => void
}) {
    const goToNestedIcon: IconDefinition = faChevronRight;
    const nextMenuTimeout: number = 500;
    const [nextMenuItems, setNextMenuItems] = useState(undefined as ContextMenuItem[]);
    const [nextMenuAt, setNextMenuAt] = useState(undefined as { top: number, left: number });
    const [isMouseOverChild, setIsMouseOverChild] = useState(false);
    const [itemMouseIsOver, setItemMouseIsOver] = useState(undefined as { div: HTMLDivElement, item: ContextMenuItem });
    const [mouseOverTimeout, setMouseOverTimeout] = useState(undefined as number);

    const onItemClick = ($event: MouseEvent, item: ContextMenuItem) => {
        if (item.action)
            item.action();
        else if (item.nested && item.nested.length > 0 && item.nested[0].action)
            item.nested[0].action();
        else
            $event.stopImmediatePropagation();
    }

    const onMouseEnter = (div: HTMLDivElement, item: ContextMenuItem): void => {
        if (props.onmouseover)
            props.onmouseover();
        setItemMouseIsOver({ div, item });

        if (mouseOverTimeout) {
            clearTimeout(mouseOverTimeout);
            setMouseOverTimeout(mouseOverTimeout);
        }

        setMouseOverTimeout(setTimeout(() => {
            let element = div.lastElementChild as HTMLDivElement;
            if (itemMouseIsOver && (item.nested?.length ?? 0) > 0) {
                setNextMenuAt({
                    top: props.spawnAt.top + element!.offsetTop,
                    left: props.spawnAt.left + element!.offsetLeft + element!.offsetWidth
                });
                setNextMenuItems(item.nested);
            } else {
                setNextMenuAt(undefined);
                setNextMenuItems(undefined);
            }

            setMouseOverTimeout(undefined);
        }, nextMenuTimeout) as any as number);
    }

    const refs = new Array(props.items.length).fill(useRef(null));

    return <>
        <div className="context-menu"
             style={ {
                 pointerEvents: 'all',
                 top: props.spawnAt.top + 'px',
                 left: props.spawnAt.left + 'px'
             } }>
            { props.items.map((item, i) =>
                <div key={ `context-menu-row-${ i }` }
                     ref={ refs[i] }
                     className={ 'context-menu-row ' + (itemMouseIsOver?.item == item ? 'has-active-child' : '') }
                     onClick={ $event => onItemClick($event.nativeEvent, item) }
                     onMouseEnter={ () => onMouseEnter(refs[i], item) }
                     onMouseLeave={ () => {if (props.onmouseleave) props.onmouseleave()} }>
                    <div className="left-cell context-menu-cell">
                        <FontAwesomeIcon className="icon-content"
                                         icon={ item.icon }/>
                    </div>

                    <div className="middle-cell context-menu-cell">
                    <span className="label-content">
                        { item.label }
                    </span>
                    </div>

                    { (item.nested?.length ?? 0) == 0
                        ? <div className="right-cell context-menu-cell"></div>
                        : undefined }

                    { (item.nested?.length ?? 0) > 0
                        ? <div className="right-cell context-menu-cell">
                            <FontAwesomeIcon className="icon-content"
                                             icon={ faChevronRight }/>
                        </div>
                        : undefined }
                </div>) }
        </div>
        { (nextMenuItems && nextMenuAt) || isMouseOverChild
            ? <ContextMenuList items={ nextMenuItems }
                               spawnAt={ nextMenuAt }
                               onmouseover={ () => setIsMouseOverChild(true) }
                               onmouseleave={ () => setIsMouseOverChild(false) }/>
            : undefined }
    </>
}