import React from 'react';
import { dispatchUpdateCacheEvent } from "../../../app";
import { Modal } from "../modal";

export interface ScriptModalProps {
    originalValue: string;
    placeholder: string;
    onUpdate?: (value: string) => void;
    onFinish?: (value: string, context: { [p: string]: any }) => void;
}

export interface ScriptModalResult {
    script: string;
}

interface ScriptModalState {
    error?: string;
}

export class ScriptModal extends Modal<ScriptModalProps, ScriptModalState, ScriptModalResult> {
    private scriptValue: string = '';

    constructor(props: ScriptModalProps) {
        super(props);

        this.state = {};

        this.scriptValue = this.props.originalValue;
    }

    public getResult(): ScriptModalResult {
        return {
            script: this.scriptValue
        };
    }

    public error(): string | undefined {
        try {
            new Function(this.scriptValue);
            return undefined;
        } catch (error) {
            return error.message;
        }
    }

    public render() {
        const { placeholder } = this.props;
        const { error } = this.state;
        setTimeout(() => {
            this.wrapper.setCanProceed(!error);
        }, 0);

        return (
            <div style={ {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
            } }>
                <div placeholder={ placeholder }
                     style={ {
                         fontFamily: 'Menlo',
                         whiteSpace: 'pre',
                         flex: '1 0 auto',
                         padding: '0.25em',
                         color: 'var(--theme-font-color)',
                         backgroundColor: 'var(--theme-bc-2)',
                         border: 'none',
                     } }
                     dangerouslySetInnerHTML={ { __html: this.props.originalValue } }
                     contentEditable={ true }
                     onInput={ e => {
                         const value = (e.nativeEvent.target as HTMLDivElement).innerText;

                         this.scriptValue = value;

                         const inputError = this.error();
                         this.setState({ error: inputError });

                         if (this.props.onUpdate) {
                             this.props.onUpdate(value);
                             dispatchUpdateCacheEvent();
                         }
                     } }>
                </div>
                <span style={ {
                    flex: '0 0 auto',
                    padding: '2rem',
                    fontWeight: 'bold',
                    color: !error ? 'var(--theme-font-color)' : 'var(--red-color)',
                    transition: 'color 0.35s'
                } }>
                    {
                        !error
                            ? 'The script is okay'
                            : `Error: ${ error }`
                    }
                </span>
            </div>
        );
    }
}

export default ScriptModal;