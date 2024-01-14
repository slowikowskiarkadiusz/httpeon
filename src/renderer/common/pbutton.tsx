import './pbutton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import React from "react";

export type Color = 'primary' | 'secondary' | 'green' | 'purple' | 'yellow' | 'gray' | 'blue' | 'red';

export function PButton(props: {
    content?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    color?: Color,
    icon?: IconProp,
    iconTransform?: string,
    isLoading?: boolean,
    isDisabled?: boolean,
}) {
    if (props.isDisabled)
        props.color = 'gray';

    let classes = ['pbutton'];
    let color = props.color ?? 'primary';
    classes.push(`pbutton-${ color }`);

    return <button className={ classes.join(' ') }
                   onClick={ props.onClick }
                   disabled={ props.isDisabled }>
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