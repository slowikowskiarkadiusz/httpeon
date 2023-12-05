import './page-button.scss'
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PageButton(props: {
    icon: IconDefinition,
    isSelected: boolean,
    onClick: () => void,
}) {
    let classes = ['page-button', props.isSelected ? 'page-button-selected' : undefined];

    return <div className={ classes.join(' ') }
                onClick={ props.onClick }
                style={ {
                    position: 'relative',
                    width: '2.5em',
                    height: '2.5em',
                    display: 'flex',
                    transition: 'opacity 0.05s ease-out'
                } }>

        <FontAwesomeIcon style={ { margin: 'auto' } }
                         icon={ props.icon }></FontAwesomeIcon>

        <div className="page-button-strip"
             style={ {
                 position: 'absolute',
                 height: '100%',
                 backgroundColor: 'red',
                 transition: 'width 0.05s ease-out, opacity 0.02s ease-out'
             } }></div>
    </div>
}