import React, { RefObject } from "react";

import AbstractTextEntry, { OnInputEvent, OnKeyPressEvent } from "./AbstractTextEntry";

export default class SingleLineTextEntry extends AbstractTextEntry<HTMLInputElement>{
    
    protected get TextEntryTypeClassName(): string {
        return "singleLine";
    }

    protected renderTextEntry(ref: RefObject<HTMLInputElement>, onInput: OnInputEvent<HTMLInputElement>, 
            onKeyPress: OnKeyPressEvent<HTMLInputElement>){
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

}