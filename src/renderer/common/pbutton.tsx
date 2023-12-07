import './pbutton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Color = 'primary' | 'secondary' | 'green' | 'purple' | 'yellow';

export function PButton(props: {
    content?: string,
    action: () => void,
    color?: Color,
    icon?: IconProp,
    iconTransform?: string
}) {
    let classes = ['pbutton'];
    let color = props.color ?? 'primary';
    classes.push(`pbutton-${ color }`);

    return <button className={ classes.join(' ') }
                   onClick={ props.action }>
        <span style={ { margin: "auto" } }>
            { props.content ? <span>{ props.content }</span> : null }&nbsp;&nbsp;
            { props.icon
                ? <FontAwesomeIcon icon={ props.icon }
                                   style={ {
                                       transform: props.iconTransform
                                   } }/>
                : null }</span>
    </button>;
}