import './pbutton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import React from "react";

type Color = 'primary' | 'secondary' | 'green' | 'purple' | 'yellow' | 'gray';

export function PButton(props: {
    content?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    color?: Color,
    icon?: IconProp,
    iconTransform?: string,
    isLoading?: boolean,
}) {
    let classes = ['pbutton'];
    let color = props.color ?? 'primary';
    classes.push(`pbutton-${ color }`);

    return <button className={ classes.join(' ') }
                   onClick={ props.onClick }>
        <span style={ { margin: "auto" } }>
            { props.content ? <span>{ props.content }{ props.icon ? <>&nbsp;&nbsp;</> : null }</span> : null }
            { props.icon
                ? <FontAwesomeIcon icon={ props.isLoading ? faCircleNotch : props.icon }
                                   style={ {
                                       transform: props.iconTransform
                                   } }
                                   className={ props.isLoading ? 'loading-spinner' : '' }/>
                : null }</span>
    </button>;
}