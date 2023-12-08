import './context-menu.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ContextMenuItem {
    icon: IconDefinition;
    label: string;
    action?: () => void;
    nested?: ContextMenuItem[];
}

interface IProps {
    event: MouseEvent;
    items: ContextMenuItem[];
}

interface IState {
    isVisible: boolean;
    top: number;
    left: number;
}

export class ContextMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isVisible: false,
            top: 0,
            left: 0,
        };
    }

    render() {
        if ((this.props.items?.length ?? 0) === 0)
            return undefined;

        let widthDiff = this.props.event.pageX - document.getElementsByTagName('body')[0]?.scrollWidth;
        let left = this.props.event.pageX;
        if (widthDiff > 0)
            left -= widthDiff;

        let heightDiff = this.props.event.pageY - document.getElementsByTagName('body')[0]?.scrollHeight;
        let top = this.props.event.pageY;
        if (heightDiff > 0)
            top -= heightDiff;

        return <div style={ {
            pointerEvents: 'none',
            cursor: 'default',
            position: 'absolute',
            height: '300px',
            width: '300px',
            maxWidth: '100%',
            top: top,
            left: left,
        } }>
            liist
            <ContextMenuList spawnAt={ { top: this.state.top, left: this.state.left } }
                             items={ this.props.items }/>
        </div>
    }
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

    const onMouseEnter = (div: HTMLDivElement, item: ContextMenuItem, refs: any, i: any): void => {
        console.log(div, refs, i);
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
                     onMouseEnter={ () => onMouseEnter(refs[i], item, refs, i) }
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