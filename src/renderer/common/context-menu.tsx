import './context-menu.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function ContextMenu(props: any) {
    return <div style={ {
        visibility: props.isVisible ? 'visible' : 'hidden',
        pointerEvents: 'none',
        cursor: 'default',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        maxWidth: '100%',
        top: '0',
        left: '0',
    } }
                onClick={ () => onBackgroundClick($event) }>
        <ContextMenuList spawnAt={ { top: props.top, left: props.left } }
                         items={ props.items }/>
    </div>
}

export function ContextMenuList(props: any) {
    return <div className="context-menu"
                style={ {
                    pointerEvents: 'all',
                    top: props.spawnAt.top + 'px',
                    left: props.spawnAt.left + 'px'
                } }>
        { props.items.map((item: any) =>
            <div className={ 'context-menu-row ' + props.itemMouseIsOver?.item == item ? 'has-active-child' : '' }
                // #row
                 onClick={ $event => onItemClick($event, item) }
                 onMouseEnter={ () => onMouseEnter(row, item) }
                 onMouseLeave={ () => onMouseLeave() }>
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
}