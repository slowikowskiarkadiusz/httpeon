import { useSpaces } from "../common/spaces.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export function ConfigChooser(props: { label: string, configKeyPath?: string[] }) {
    const { spaces, setSpaceConfig, getActive } = useSpaces();
    let config = getActive();
    props.configKeyPath?.forEach(x => config = config[x]);

    // TODO
    //show name and change active

    return <div style={ { display: 'flex', flexDirection: 'row', userSelect: 'none' } }>
        <span>{ props.label }:&nbsp;</span>
        <span><b>{ getActive()['name'] }</b></span>

        <span style={ { fontSize: '0.5em', display: 'flex', marginLeft: '1em' } }>
            <FontAwesomeIcon style={ { margin: 'auto' } }
                             icon={ faChevronDown }/>
        </span>
    </div>
}