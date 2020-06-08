import React from 'react';
import OEComponent from '../OEComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

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
export default abstract class Entry<D> extends OEComponent<EntryProps<D>, EntryState<D>>{
    
    protected determineComponentClassString(){
        return "entry " + this.entryTypeClassName;
    }

    protected abstract get entryTypeClassName(): string;

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

    renderComponentContents(){
        return [
            this.renderEntryArea(),
            (<button onClick={this.onConfirmEntryClick}>
                <FontAwesomeIcon icon={faCheck} />
            </button>),
            (<button onClick={this.onCancelEntryClick}>
                <FontAwesomeIcon icon={faTimes} />
            </button>)
        ]
    }
    
}