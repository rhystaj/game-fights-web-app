import React, { RefObject } from 'react';

import Entry, { AsyncActionEvent } from '../Entry';

export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;
export type OnInputEvent<I extends TextInputElement> = (e: React.FormEvent<I>) => void;
export type OnKeyPressEvent<I extends TextInputElement> = (e: React.KeyboardEvent<I>) => void; 

/**
 * [DES/PRE] A component in which you can enter text and either confirm or cancel your progress.
 */
export default abstract class AbstractTextEntry<I extends TextInputElement> extends Entry<string> {
    
    private textEntryRef = React.createRef<I>();

    protected get EntryTypeClassName(): string {
        return "textEntry " + this.TextEntryTypeClassName;
    }

    protected abstract get TextEntryTypeClassName(): string;

    componentDidMount(){
        this.textEntryRef.current?.select();
    }

    private onEntryInput = (e: React.FormEvent<I>) => {
        this.ValueBeingEntered = e.currentTarget.value;
    }

    private onKeyPressed = (onAsyncAction: AsyncActionEvent) => (e: React.KeyboardEvent<I>) => {
        if(e.charCode === 13) {
            this.confirmEntry(onAsyncAction)
        }
    }

    protected abstract renderTextEntry(ref: RefObject<I>, onInput: OnInputEvent<I>, onKeyPress: OnKeyPressEvent<I>): JSX.Element;    

    renderEntryArea(onAsyncAction: AsyncActionEvent){
        return this.renderTextEntry(this.textEntryRef, this.onEntryInput, this.onKeyPressed(onAsyncAction));
    }

}