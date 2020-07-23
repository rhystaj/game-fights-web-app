import React from 'react';

import EnterableText from "./EnterableText";

import SingleLineTextEntry from '../Entry/Text Entry/SingleLineTextEntry';

export default class EnterableStringText extends EnterableText<string>{
    
    protected convertValueToString(value: string): string {
        return value; //Value is already a string, nothing needs to be done.
    }
    
    protected renderEntry(onConfirmEntry: (value: string) => Promise<void>, onCancelEntry: () => void){
        
        return (<SingleLineTextEntry
            initialValue={this.props.initialValue}
            onConfirmEntry={onConfirmEntry}
            onCancelEntry={onCancelEntry}/>
        );
    }

}