import { useBaseUrlModal } from "./base-url.modal.context";
import { PButton } from "../../common/pbutton";

export function BaseUrlModalButton({ children }) {
    const { invoke } = useBaseUrlModal();

    return <div style={ { display: 'flex', position: 'relative', } }
                id="baseUrlModalButtonParent">
        <PButton onClick={ (e) => invoke(() => document.getElementById('baseUrlModalButtonParent'), { x: e.screenX, y: e.screenY }) }
                 content="BASE URL"
                 color="secondary"/>
    </div>
}