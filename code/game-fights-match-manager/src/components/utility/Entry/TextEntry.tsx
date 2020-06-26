import React from 'react';

import Entry, { AsyncActionEvent } from './Entry';

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

    renderEntryArea(onAsyncAction: AsyncActionEvent){
        return(
            <input 
                ref={this.textEntryRef}
                type="textedit" 
                onInput={(e: React.FormEvent<HTMLInputElement>) => { this.ValueBeingEntered = e.currentTarget.value }}
                onKeyPress={e => { if(e.charCode === 13) {
                    console.log("Enter Pressed!");
                    this.confirmEntry(onAsyncAction)
                } } }
                value={this.state.valueBeingEntered}
            />       
        )
    }
    
}