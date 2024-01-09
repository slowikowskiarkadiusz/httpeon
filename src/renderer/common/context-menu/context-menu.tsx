import './context-menu.scss';
import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ContextMenuList } from './context-menu-list';

export interface ContextMenuItem {
    icon?: IconDefinition;
    label: string;
    action?: () => void;
    nested?: ContextMenuItem[];
}

interface IProps {
    event: MouseEvent;
    items: ContextMenuItem[];
    onActionPerformed: () => void;
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
            <ContextMenuList spawnAt={ { top: this.state.top, left: this.state.left } }
                             items={ this.props.items }
                             onActionPerformed={ () => this.props.onActionPerformed() }/>
        </div>
    }
}