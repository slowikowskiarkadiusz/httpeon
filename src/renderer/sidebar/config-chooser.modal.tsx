import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faFileImport, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PButton } from "../common/pbutton";
import { useTextInputModal } from "../common/text-input.modal.context";
import { SpaceConfig } from "../common/spaces.context";
import { dispatchUpdateCacheEvent, download, upload } from "../app";

export function ConfigChooserModal(props: {
    configPath: string[],
    allConfigs: SpaceConfig[],
    onClose: () => void,
    onSelect: (item: string, index: number) => void,
    onDelete: (item: string, index: number) => void,
    onNew: (name: string) => void,
    onExport: () => void,
    onImport: () => void,
    left: string,
    top: string,
    width: string,
}) {
    const { invokeTextInputModal } = useTextInputModal();

    const hrStyle = {
        border: 'none',
        borderTop: '1px solid var(--theme-bc)',
        margin: '0',
    };

    const items = props.allConfigs.map(x => x.name);
    const activeItem = props.allConfigs.filter(x => x.active)[0]?.name;

    return <div
        style={ {
            position: 'absolute',
            left: props.left,
            top: props.top,
            width: props.width,
            backdropFilter: 'blur(7px)',
            backgroundColor: `var(--theme-bc-3t)`,
            borderRadius: 'var(--border-radius)',
            boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 36px',
        } }>
        <div style={ { textAlign: 'center', padding: '1rem' } }><b>Switch { props.configPath[props.configPath.length - 1] }</b></div>
        <hr style={ hrStyle }/>
        <ul style={ {
            listStyleType: 'none',
            padding: '0',
            margin: '0 0',
        } }>
            { items.map((x, i) =>
                <li key={ `${ props.configPath }-config-chooser-modal-li-item-${ i }` }
                    style={ {
                        userSelect: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem 0',
                    } }
                    className="config-chooser-li">
                    <div style={ {
                        borderRadius: 'var(--cell-border-radius)',
                        margin: '0 1rem',
                        padding: '1rem 1rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: '100%',
                    } }
                         onClick={ () => props.onSelect(x, i) }>
                        <span style={ { fontWeight: activeItem === x ? 'bold' : 'unset' } }>{ x }</span>
                        <div style={ { display: 'flex', gap: '10px' } }>
                            <FontAwesomeIcon className="config-chooser-li-export"
                                             onClick={ (e) => {
                                                 download(`${ x }.json`, JSON.stringify(props.allConfigs.filter(y => y.name === x)[0], null, 2));
                                                 props.onClose();
                                                 e.stopPropagation();
                                             } }
                                             icon={ faFileExport }/>
                            <FontAwesomeIcon className="config-chooser-li-delete"
                                             onClick={ (e) => {
                                                 if (window.confirm(`Do you want to delete ${ props.configPath.join('/') }/${ x }?`))
                                                     props.allConfigs.splice(i, 1);
                                                 props.allConfigs[[i - 1, 0].reduce((p, c) => p > c ? p : c)].active = true;
                                                 props.onClose();
                                                 dispatchUpdateCacheEvent();
                                                 e.stopPropagation();
                                             } }
                                             icon={ faTrashCan }/>
                        </div>
                    </div>
                </li>) }
        </ul>
        <hr style={ hrStyle }/>
        <div style={ {
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        } }>
            <PButton content="NEW"
                     color="green"
                     icon={ faPlus }
                     onClick={ e => {
                         invokeTextInputModal('',
                             'New space name',
                             () => document.getElementById('modal-parent'),
                             { x: e.screenX, y: e.screenY },
                             'space name...',
                             (value) => {
                                 let newActiveItem = activeItem;
                                 if (value) {
                                     newActiveItem = value;
                                     props.onNew(value);
                                 }
                                 props.onSelect(newActiveItem, items.indexOf(newActiveItem));
                             });
                     } }/>
            <PButton content="IMPORT"
                     color="purple"
                     icon={ faFileImport }
                     onClick={ e => {
                         upload(['.json'], e => {
                             (e.target as HTMLInputElement)
                                 .files[0]
                                 .text()
                                 .then(x => {
                                     const parsed: SpaceConfig = JSON.parse(x);
                                     props.allConfigs.splice(props.allConfigs.length, 0, parsed);
                                     props.onSelect(parsed.name, props.allConfigs.length - 1);
                                 });
                         })
                     } }/>
        </div>
    </div>;
}


export default ConfigChooserModal;
