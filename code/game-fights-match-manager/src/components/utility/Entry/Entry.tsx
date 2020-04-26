import React, { Component } from 'react';

type EntryProps<D> = {
    initialValue: D,
    onConfirmEntry: (value: D) => void,
    onCancelEntry: () => void
}

type EntryState<D> = {
    valueBeingEntered: D
}

/**
 * [DES/PRE] A component in which you can enter data and either confirm or cancel your progress.
 */
export default abstract class Entry<D> extends Component<EntryProps<D>, EntryState<D>>{
    
    protected get ValueBeingEntered(): D{
        return this.state.valueBeingEntered;
    }

    protected set ValueBeingEntered(value: D){
        this.setState({ valueBeingEntered: value })
    }

    constructor(props: EntryProps<D>){
        super(props);
        this.state = { valueBeingEntered: this.props.initialValue };
    }

    private onConfirmEntryClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onConfirmEntry(this.state.valueBeingEntered);
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