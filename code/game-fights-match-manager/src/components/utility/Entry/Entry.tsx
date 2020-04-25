import React, { Component } from 'react';

type EntryProps<T> = {
    defaultValue: T,
    onConfirmEntry: (currentValue: T) => void,
    onCancelEntry: () => void;
}

/**
 * [DES/PRE] A component in which you can enter data and either confirm or cancel your progress.
 */
export default abstract class Entry<T> extends Component<EntryProps<T>>{
    
    private _currentValue: T;
    protected get CurrentValue(): T{
        return this._currentValue;
    }
    protected set CurrentValue(value: T){
        this._currentValue = value;
    }

    constructor(props: EntryProps<T>){
        super(props);
        this._currentValue = this.props.defaultValue
    }

    /**
     * Render the component(s) used to enter the data.
     */
    protected abstract renderEntryArea(): JSX.Element;

    render(){
        return(
            <div>
                {this.renderEntryArea()}
                <button onClick={() => {this.props.onConfirmEntry(this._currentValue)}}>+</button>
                <button onClick={this.props.onCancelEntry}>X</button>
            </div>
        )
    }
    
}