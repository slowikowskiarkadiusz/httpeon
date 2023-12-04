import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './pbutton.css';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function PButton(props: {
    content?: string,
    action: () => void,
    priority?: 1 | 2,
    icon?: IconProp,
    iconTransform?: string
}) {
    let classes = ['pbutton'];
    let priority = props.priority ?? 1;
    classes.push(priority === 1 ? 'pbutton-primary' : 'pbutton-secondary');

    return <button className={ classes.join(' ') }
                   onClick={ props.action }>
        { props.icon
            ? <FontAwesomeIcon icon={ props.icon }
                               style={ {
                                   transform: props.iconTransform
                               } }/>
            : null }

        { props.content ? <span>{ props.content }</span> : null }
    </button>;
}