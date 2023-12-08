import './config-chooser.scss';
import { useSpaces } from "../common/spaces.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useConfigChooserModal } from "./config-chooser.modal.context";
import { ContextMenuItem } from "../common/context-menu";
import { useContextMenu } from "../common/context-menu.context";

function copyContextItems() {
    let copyNestedItems: ContextMenuItem[] = [];
    copyNestedItems.push({
        icon: faCopy,
        label: '...the branch name',
        action: () => this.clipboard.copy(`msg.branchGroup!.fullName`)
    });
    copyNestedItems.push({
        icon: faCopy,
        label: '...the commit hash',
        action: () => this.clipboard.copy(`msg.commits.map(x => x.sha).join('\n')`)
    });
    copyNestedItems.push({
        icon: faCopy,
        label: '...the commit author name',
        action: () => this.clipboard.copy(`msg.commits.map(x => x.author).join('\n')`)
    });
    copyNestedItems.push({
        icon: faCopy,
        label: '...the commit message',
        action: () => this.clipboard.copy(`msg.commits.map(x => x.message).join('\n')`)
    });

    if (copyNestedItems.length > 0)
        return {
            icon: faCopy,
            label: `copy...`,
            nested: copyNestedItems
        };

    return undefined;
}

export function ConfigChooser(props: { label: string, configKeyPath?: string[] }) {
    const { spaces, setSpaceConfig, getActive } = useSpaces();
    const { invokeContextMenu } = useContextMenu();
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
                   onContextMenu={ $event => invokeContextMenu($event.nativeEvent, [copyContextItems()]) }
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