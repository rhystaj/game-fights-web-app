import React from 'react';

import Entry from './Entry';

/**
 * [DES/PRE] A component in which you can enter text and either confirm or cancel your progress.
 */
export default class TextEntry extends Entry<string> {
    
    protected get entryTypeClassName(): string {
        return "textEntry";
    }

    renderEntryArea(){
        return(
            <input 
                type="textedit" 
                onInput={(e: React.FormEvent<HTMLInputElement>) => { this.ValueBeingEntered = e.currentTarget.value }}
                value={this.state.valueBeingEntered}
            />       
        )
    }
    
}