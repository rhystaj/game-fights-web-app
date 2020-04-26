import React from 'react';

import EnterableText from "./EnterableText";
import DateEntry from "../Entry/DateEntry";

export default class EnterableDateText extends EnterableText<Date>{
    
    protected convertValueToString(value: Date): string {
        return value.toDateString();
    }
    
    protected renderEntry(onConfirmEntry: (value: Date) => void, onCancelEntry: () => void): JSX.Element {
        return <DateEntry
            initialValue={this.state.currentConfirmedValue}
            onConfirmEntry={onConfirmEntry}
            onCancelEntry={onCancelEntry}
        />
    }

} 