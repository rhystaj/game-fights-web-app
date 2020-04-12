import React, { Component } from 'react';

type TextEntryProps = {
    onConfirmEntry: (currentValue: string) => void
    onCancelEntry: () => void;
}

/**
 * [DES/PRE] A component in which you can enter text and either confirm or cancel your progress.
 */
export default class TextEntry extends Component<TextEntryProps>{
    
    currentValue = "";

    render(){
        return(
            <div>
                <input 
                    type="textedit" 
                    onInput={(e: React.FormEvent<HTMLInputElement>) => { this.currentValue = e.currentTarget.value }}
                />
                <button onClick={() => {this.props.onConfirmEntry(this.currentValue)}}>+</button>
                <button onClick={this.props.onCancelEntry}>X</button>
            </div>
        )
    }
    
}