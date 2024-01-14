import { PButton } from "../pbutton";
import React from "react";

interface ModalWrapperProps {
    inner: JSX.Element,
    header: string,
    onCancelClick: () => void,
    onOkClick: () => void,
}

export class ModalWrapper extends React.Component<ModalWrapperProps> {
    private canProceed: boolean;
    public setCanProceed(newValue: boolean) {
        this.canProceed = newValue;
        this.forceUpdate();
    }

    render() {
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
            <span style={ { textAlign: 'center', color: 'var(--theme-font-color)' } }><h3>{ this.props.header }</h3></span>
            <div style={ { flex: '1 0 auto' } }>{ this.props.inner }</div>
            <div style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }>
                <PButton content="Cancel"
                         color="red"
                         onClick={ () => {this.props.onCancelClick()} }/>
                <PButton content="OK"
                         color="green"
                         isDisabled={ !this.canProceed }
                         onClick={ () => {this.props.onOkClick()} }/>
            </div>
        </div>
    }
}