import React, { RefObject } from 'react';

import Entry, { AsyncActionEvent } from './Entry';
import { type } from 'os';

type OnInputEvent = (e: React.FormEvent<HTMLInputElement>) => void;
type OnKeyPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => void; 

/**
 * [DES/PRE] A component in which you can enter text and either confirm or cancel your progress.
 */
export default class TextEntry extends Entry<string> {
    
    private textEntryRef = React.createRef<HTMLInputElement>();

    protected get entryTypeClassName(): string {
        return "textEntry";
    }

    componentDidMount(){
        this.textEntryRef.current?.select();
    }

    private onEntryInput = (e: React.FormEvent<HTMLInputElement>) => {
        this.ValueBeingEntered = e.currentTarget.value;
    }

    private onKeyPressed = (onAsyncAction: AsyncActionEvent) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13) {
            this.confirmEntry(onAsyncAction)
        }
    }

    renderTextEntry(ref: RefObject<HTMLInputElement>, onAsyncAction: AsyncActionEvent, onInput: OnInputEvent, 
            onKeyPress: OnKeyPressEvent){
        return(
            <input 
                ref={ref}
                type="textedit" 
                onInput={onInput}
                onKeyPress={onKeyPress}
                defaultValue={this.state.valueBeingEntered}
            />       
        )
    }

    renderEntryArea(onAsyncAction: AsyncActionEvent){
        return this.renderTextEntry(this.textEntryRef, onAsyncAction, this.onEntryInput, this.onKeyPressed(onAsyncAction));
    }

}