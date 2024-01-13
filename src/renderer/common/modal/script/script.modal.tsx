import { dispatchUpdateCacheEvent } from "../../../app";

export function ScriptModal(props: { originalValue: string, placeholder: string, onDataUpdate: (value: string) => void }) {
    return <div placeholder={ props.placeholder }
                style={ {
                    height: 'auto',
                    fontFamily: 'Menlo',
                    whiteSpace: 'pre',
                    minHeight: '100%',
                    width: '100%',
                    color: 'var(--theme-font-color)',
                    backgroundColor: 'var(--theme-bc-2)',
                    border: 'none',
                } }
                dangerouslySetInnerHTML={ { __html: props.originalValue } }
                contentEditable={ true }
                onInput={ (e) => {
                    props.onDataUpdate((e.target as HTMLDivElement).innerText);
                    dispatchUpdateCacheEvent();
                } }>
    </div>
}