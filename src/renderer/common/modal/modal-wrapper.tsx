import { PButton } from "../pbutton";

export function ModalWrapper(props: { inner: JSX.Element, header: string }) {
    return <div style={ {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        fontSize: '2rem',
        width: '50%',
        height: '75%',
        backgroundColor: 'var(--theme-bc-3)',
        padding: '1em',
        gap: '1em',
        borderRadius: 'var(--border-radius)'
    } }
                onClick={ e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                } }>
        <span style={ { textAlign: 'center', color: 'var(--theme-font-color)' } }><h3>{ props.header }</h3></span>
        <div style={ { flex: '1 0 auto' } }>{ props.inner }</div>
        <div style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }>
            <PButton content="Cancel"
                     color="red"
                     onClick={ () => {} }/>
            <PButton content="OK"
                     color="green"
                     onClick={ () => {} }/>
        </div>
    </div>
}