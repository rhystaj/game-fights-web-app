import React from 'react';

import AsyncActionComponent, { AsyncActionComponentState } from '../Async_Action_Components/AsyncActionComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export type AsyncActionEvent = (asyncAction: () => Promise<void>) => () => void; 

type EntryProps<D> = {
    initialValue: D,
    onConfirmEntry: (value: D) => Promise<void>,
    onCancelEntry: () => void
}

interface EntryState<D> extends AsyncActionComponentState {
    valueBeingEntered: D
}

/**
 * [DES/PRE] A component in which you can enter data and either confirm or cancel your progress.
 */
export default abstract class Entry<D> extends AsyncActionComponent<EntryProps<D>, EntryState<D>>{
    
    protected determineAsyncActionClassString(){
        return "entry " + this.EntryTypeClassName;
    }

    protected abstract get EntryTypeClassName(): string;

    protected get ValueBeingEntered(): D{
        return this.state.valueBeingEntered;
    }

    protected set ValueBeingEntered(value: D){
        this.setState({ valueBeingEntered: value })
    }

    protected determineInitialComponentState(){
        return { 
            valueBeingEntered: this.props.initialValue,
            pending: false
         };
    }

    private confirmEntryAsync = async () => {
        await this.props.onConfirmEntry(this.state.valueBeingEntered);
    }  
    
    protected confirmEntry(onAsyncAction: AsyncActionEvent){
        onAsyncAction(this.confirmEntryAsync)();
    }

    private onCancelEntryClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onCancelEntry();
    }

    /**
     * Render the component(s) used to enter the data.
     */
    protected abstract renderEntryArea(onAsyncAction: AsyncActionEvent): JSX.Element;

    protected renderActionControls(onAsyncAction: AsyncActionEvent){
        return[
            (<button onClick={onAsyncAction(this.confirmEntryAsync)}>
                <FontAwesomeIcon icon={faCheck} />
            </button>),
            (<button onClick={this.onCancelEntryClick}>
                <FontAwesomeIcon icon={faTimes} />
            </button>)
        ]
    }

    renderComponentContents(){
        return [
            this.renderEntryArea(this.asyncActionEvent),
            ...(super.renderComponentContents() as JSX.Element[])
        ]
    }
    
}