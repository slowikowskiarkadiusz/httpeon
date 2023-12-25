import { useBaseUrlModal } from "./base-url.modal.context";
import { PButton } from "../../common/pbutton";

export function BaseUrlModalButton({ children }) {
    const { invoke } = useBaseUrlModal();

    return <div style={ { display: 'flex', position: 'relative', } }
                id="baseUrlModalButtonParent">
        <PButton onClick={ () => invoke(() => document.getElementById('baseUrlModalButtonParent')) }
                 content="BASE URL"
                 color="secondary"/>
    </div>

}