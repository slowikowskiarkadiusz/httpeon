import { Component } from "react";
import { ModalWrapper } from "./modal-wrapper";

export abstract class Modal<TProps, TState, TResult> extends Component<TProps, TState> {
    public wrapper: ModalWrapper;
    public abstract getResult(): TResult;
}