import './config-chooser.scss';
import { useSpaces } from "../common/spaces.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useConfigChooserModal } from "./config-chooser.modal.context";

export function ConfigChooser(props: { label: string, configKeyPath?: string[] }) {
    const { spaces, setSpaceConfig, getActive } = useSpaces();
    const { invoke } = useConfigChooserModal();
    let configs = spaces;
    props.configKeyPath?.forEach(x => configs = configs.filter(x => x.active)[0][x]);
    const activeConfigs = configs.filter((x: any) => x.active);
    const buttonId = Math.floor(Math.random() * 10000000)

    return <button id="buttonId"
                   className="config-chooser"
                   style={ {
                       display: 'flex',
                       flexDirection: 'row',
                       userSelect: 'none',
                       borderRadius: 'var(--border-radius)',
                       padding: '1em',
                       margin: '0.1em 0',
                       color: 'unset',
                       border: 'none',
                       cursor: 'pointer',
                   } }
                   onClick={ () => invoke(props.label,
                       () => document.getElementById('buttonId'),
                       () => {console.log('uhh close')}) }>
        <span>{ props.label }:&nbsp;</span>
        <span><b>{ activeConfigs.length > 0 ? activeConfigs[0]['name'] : '---' }</b></span>

        <span style={ { height: '100%', fontSize: '0.5em', display: 'flex', marginLeft: '1em' } }>
            <FontAwesomeIcon style={ { margin: 'auto' } }
                             icon={ faChevronDown }/>
        </span>
    </button>
}