import React from 'react';

import AbstractTextEntry, { OnInputEvent, OnKeyPressEvent } from './AbstractTextEntry';

export default class MultiLinedTextEntry extends AbstractTextEntry<HTMLTextAreaElement>{
    
    protected get TextEntryTypeClassName(): string {
        return "multiLined";
    }
    
    protected renderTextEntry(ref: React.RefObject<HTMLTextAreaElement>, onInput: OnInputEvent<HTMLTextAreaElement>, onKeyPress: OnKeyPressEvent<HTMLTextAreaElement>): JSX.Element {
        return (
            <textarea
                ref={ref}
                onInput={onInput}
                onKeyPress={e => {
                        if(e.charCode === 13) e.preventDefault(); //To prevent a new line being made when enter is pressed.
                        onKeyPress(e);
                    }
                }
            >
                {this.state.valueBeingEntered}
            </textarea>
        )
    }

}