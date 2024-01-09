import './context-menu.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ContextMenuItem } from './context-menu';

interface IProps {
    items: ContextMenuItem[],
    spawnAt: { top: number, left: number },
    onmouseover?: () => void,
    onmouseleave?: () => void,
    onActionPerformed?: () => void,
}

interface IState {
    nextMenuItems: ContextMenuItem[] | undefined,
    nextMenuAt: { top: number, left: number } | undefined,
    isMouseOverChild: boolean,
    itemMouseIsOver: { div: HTMLDivElement, item: ContextMenuItem } | undefined,
    mouseOverTimeout: number | undefined,
}

export class ContextMenuList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            nextMenuItems: undefined,
            nextMenuAt: undefined,
            isMouseOverChild: false,
            itemMouseIsOver: undefined,
            mouseOverTimeout: undefined,
        }
    }

    onItemClick($event: MouseEvent, item: ContextMenuItem) {
        if (item.action) {
            item.action();
            this.props.onActionPerformed();
        } else if (item.nested && item.nested.length > 0 && item.nested[0].action) {
            item.nested[0].action();
            this.props.onActionPerformed();
        } else
            $event.stopImmediatePropagation();
    }

    onMouseEnter(div: HTMLDivElement, item: ContextMenuItem, i: any): void {
        if (this.props.onmouseover)
            this.props.onmouseover();
        this.setState({ itemMouseIsOver: { div, item } });

        if (this.state.mouseOverTimeout) {
            clearTimeout(this.state.mouseOverTimeout);
        }

        const mouseOverTimeout = setTimeout(() => {
            let element = div.lastElementChild as HTMLDivElement;
            if (this.state.itemMouseIsOver && (item.nested?.length ?? 0) > 0) {
                this.setState({
                    nextMenuAt: {
                        top: this.props.spawnAt.top + element!.offsetTop,
                        left: this.props.spawnAt.left + element!.offsetLeft + element!.offsetWidth
                    },
                    nextMenuItems: item.nested,
                    mouseOverTimeout: undefined
                });
            } else {
                this.setState({
                    nextMenuAt: undefined,
                    nextMenuItems: undefined,
                    mouseOverTimeout: undefined
                });
            }
        }, 500);

        this.setState({ mouseOverTimeout: mouseOverTimeout as any as number });
    }

    render() {
        const refs = new Array(this.props.items.length).fill(React.createRef<HTMLDivElement>());
        return <>
            <div className="context-menu"
                 style={ {
                     pointerEvents: 'all',
                     top: this.props.spawnAt.top + 'px',
                     left: this.props.spawnAt.left + 'px'
                 } }>
                { this.props.items.map((item, i) =>
                    <div key={ `context-menu-row-${ i }` }
                         ref={ refs[i] }
                         className={ 'context-menu-row ' + (this.state.itemMouseIsOver?.item === item ? 'has-active-child' : '') }
                         onClick={ $event => this.onItemClick($event.nativeEvent, item) }
                         onMouseEnter={ () => this.onMouseEnter(refs[i].current!, item, i) }
                         onMouseLeave={ () => {if (this.props.onmouseleave) this.props.onmouseleave()} }>
                        <div className="left-cell context-menu-cell">
                            { item.icon
                                ? <FontAwesomeIcon className="icon-content"
                                                   icon={ item.icon }/>
                                : null }
                        </div>

                        <div className="middle-cell context-menu-cell">
                            <span className="label-content">
                                { item.label }
                            </span>
                        </div>

                        { (item.nested?.length ?? 0) === 0
                            ? <div className="right-cell context-menu-cell"/>
                            : undefined }

                        { (item.nested?.length ?? 0) > 0
                            ? <div className="right-cell context-menu-cell">
                                <FontAwesomeIcon className="icon-content"
                                                 icon={ faChevronRight }/>
                            </div>
                            : undefined }
                    </div>) }
            </div>
            { (this.state.nextMenuItems && this.state.nextMenuAt) || this.state.isMouseOverChild
                ? <ContextMenuList items={ this.state.nextMenuItems || [] }
                                   spawnAt={ this.state.nextMenuAt || this.props.spawnAt }
                                   onmouseover={ () => this.setState({ isMouseOverChild: true }) }
                                   onmouseleave={ () => this.setState({ isMouseOverChild: false }) }
                                   onActionPerformed={ () => this.props.onActionPerformed() }/>
                : undefined }
        </>
    }
}