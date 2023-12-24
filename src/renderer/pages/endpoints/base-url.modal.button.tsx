import { useBaseUrlModal } from "./base-url.modal.context";
import { PButton } from "../../common/pbutton";

export function BaseUrlModalButton({ children }) {
    const { invoke } = useBaseUrlModal();

    return <div style={ { display: 'flex' } }
                id="abc">
        <PButton onClick={ () => {
            invoke('asb', () => document.getElementById('abc'), () => {});
        } }
                 content="BASE URL"
                 color="secondary"/>
    </div>

}