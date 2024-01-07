import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faFileImport, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PButton } from "../common/pbutton";

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
}) {
    const hrStyle = {
        border: 'none',
        borderTop: '1px solid var(--theme-bc)',
        margin: '0',
    };

    return <div style={ {
        position: 'absolute',
        left: props.left,
        top: props.top,
        width: props.width,
        backdropFilter: 'blur(7px)',
        backgroundColor: `var(--theme-bc-3t)`,
        borderRadius: 'var(--border-radius)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 36px',
    } }>
        <div style={ { textAlign: 'center', padding: '1rem' } }><b>Switch { props.configName }</b></div>
        <hr style={ hrStyle }/>
        <ul style={ {
            listStyleType: 'none',
            padding: '0',
            margin: '0 0',
        } }>
            { props.items.map((x, i) =>
                <li key={ `${ props.configName }-config-chooser-modal-li-item-${ i }` }
                    style={ {
                        userSelect: 'none',
                        cursor: 'pointer',
                    } }
                    className="config-chooser-li">
                    <div style={ {
                        borderRadius: 'var(--cell-border-radius)',
                        margin: '0 1rem',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                    } }>
                        <span onClick={ () => props.onSelect(x, i) }>{ x }</span>
                        <FontAwesomeIcon onClick={ () => props.onDelete(x, i) }
                                         icon={ faTrashCan }/>
                    </div>
                </li>) }
        </ul>
        <hr style={ hrStyle }/>
        <div style={ {
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        } }><PButton content="NEW"
                     color="green"
                     onClick={ () => {} }
                     icon={ faPlus }/>
            <PButton content="EXPORT"
                     color="yellow"
                     onClick={ () => {} }
                     icon={ faFileExport }/>
            <PButton content="IMPORT"
                     color="purple"
                     onClick={ () => {} }
                     icon={ faFileImport }/>
        </div>
    </div>;
}

export default ConfigChooserModal;
