import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function ConfigChooserModal(props: {
    configName: string,
    items: string[],
    onSelect: (item: string, index: number) => void,
    onDelete: (item: string, index: number) => void,
    onNew: () => void,
    onExport: () => void,
    onImport: () => void,
    left: string,
    top: string,
    width: string,
    height: string,
}) {
    const onClose = () => {
        console.log('onClose');
    };

    return <div style={ {
        position: 'absolute',
        left: props.left,
        top: props.top,
        width: props.width,
        height: props.height,
        borderRadius: 'var(--border-radius)',
    } }>
        <div style={ { textAlign: 'center' } }><b>Switch { props.configName }</b></div>
        <hr style={ {
            border: 'none',
            borderTop: '2px solid var(--theme-background-color-2)',
            margin: '0',
        } }/>
        <ul style={ {
            listStyleType: 'none',
            padding: '0',
            margin: '0',
        } }>
            { props.items.map((x, i) =>
                <li key={ `${ props.configName }-config-chooser-modal-li-item-${ i }` }
                    style={ {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    } }>
                    <span onClick={ () => props.onSelect(x, i) }>{ x }</span>
                    <FontAwesomeIcon onClick={ () => props.onDelete(x, i) }
                                     icon={ faTrashCan }/>
                </li>) }
        </ul>
    </div>;
}
