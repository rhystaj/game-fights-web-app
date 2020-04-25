import React from 'react';

import EnterableText from "./EnterableText";

import TextEntry from '../Entry/TextEntry'

export default class EnterableStringText extends EnterableText<string>{
    
    protected convertValueToString(value: string): string {
        return value; //Value is already a string, nothing needs to be done.
    }
    
    protected renderEntry(onConfirmEntry: (value: string) => void, onCancelEntry: () => void){
        
        return (<TextEntry
            initialValue={this.props.initialValue}
            onConfirmEntry={onConfirmEntry}
            onCancelEntry={onCancelEntry}/>
        );
    }

}