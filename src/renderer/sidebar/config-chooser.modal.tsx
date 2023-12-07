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
        borderTop: '1px solid var(--theme-background-color)',
        margin: '0',
    };

    return <div style={ {
        position: 'absolute',
        left: props.left,
        top: props.top,
        width: props.width,
        backgroundColor: `var(--theme-background-color-3)`,
        borderRadius: 'var(--border-radius)',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 36px',
    } }>
        <div style={ { textAlign: 'center', padding: '1rem' } }><b>Switch { props.configName }</b></div>
        <hr style={ hrStyle }/>
        <ul style={ {
            listStyleType: 'none',
            padding: '0',
            margin: '1rem 0',
        } }>
            { props.items.map((x, i) =>
                <li key={ `${ props.configName }-config-chooser-modal-li-item-${ i }` }
                    style={ {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '1rem 2rem',
                    } }>
                    <span onClick={ () => props.onSelect(x, i) }>{ x }</span>
                    <FontAwesomeIcon onClick={ () => props.onDelete(x, i) }
                                     icon={ faTrashCan }/>
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
                     action={ () => {} }
                     icon={ faPlus }/>
            <PButton content="EXPORT"
                     color="yellow"
                     action={ () => {} }
                     icon={ faFileExport }/>
            <PButton content="IMPORT"
                     color="purple"
                     action={ () => {} }
                     icon={ faFileImport }/>
        </div>
    </div>;
}

export default ConfigChooserModal;
