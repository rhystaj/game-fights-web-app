import React, { Component } from 'react';

type EntryProps<D> = {
    initialValue: D,
    onConfirmEntry: (value: D) => void,
    onCancelEntry: () => void
}

/**
 * [DES/PRE] A component in which you can enter data and either confirm or cancel your progress.
 */
export default abstract class Entry<D> extends Component<EntryProps<D>>{
    
    private _valueBeingEntered: D;
    protected get ValueBeingEntered(): D{
        return this._valueBeingEntered;
    }
    protected set ValueBeingEntered(value: D){
        this._valueBeingEntered = value;
    }

    constructor(props: EntryProps<D>){
        super(props);
        this._valueBeingEntered = this.props.initialValue;
    }

    private onConfirmEntryClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onConfirmEntry(this._valueBeingEntered);
    }

    private onCancelEntryClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onCancelEntry();
    }

    /**
     * Render the component(s) used to enter the data.
     */
    protected abstract renderEntryArea(): JSX.Element;

    render(){
        return(
            <div>
                {this.renderEntryArea()}
                <button onClick={this.onConfirmEntryClick}>+</button>
                <button onClick={this.onCancelEntryClick}>X</button>
            </div>
        )
    }
    
}