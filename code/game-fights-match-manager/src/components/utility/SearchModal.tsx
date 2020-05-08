import React, { ChangeEvent } from 'react';

import DataInterfacingComponent, { DataInterfacingComponentProps, DataInterfacingComponentState } from './DataInterfacingComponent';

import SearchInterface from '../../backend_interface/lib/SearchInterface';

export interface SearchModalProps<M> extends DataInterfacingComponentProps<M>{
    onCancel: () => void;
}

export default abstract class SearchModal<M, D, I extends SearchInterface<D>, 
        P extends SearchModalProps<M>,
        S extends DataInterfacingComponentState<D[]>> 
        extends DataInterfacingComponent<M, D[], I, P, S>{


    private onCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onCancel();
    }

    protected determineInitalData(){
        return [];
    }

    /**
     * [DES/PRE] Render an area where the user can enter data for the search.
     */
    protected renderSearchArea(): JSX.Element{
        return (
            <div>
                <input onInput={this.onSearchBoxInput} type="text" className="modalSearchBox" />
            </div>
        );
    }

    /**
     * [DES/PRE] Render an area where the results of the search will be displayed.
     */
    protected abstract renderSearchResults(): JSX.Element;

    /**
     * [DES/PRE] Render options to describe what to be done with the results of the search.
     */
    protected renderResultOptions(): JSX.Element {
        return(
            <div>
                <button onClick={this.onCancelButtonClick}>Cancel</button>
                <button onClick={this.getOnConfirmClickAction()}>{this.getConfirmButtonText()}</button>
            </div>
        )
        
    }

    /**
     * Retrieve the text to be displayed on the confirm button.
     */
    protected abstract getConfirmButtonText(): string;

    /**
     * Get the action to be perfomred when the confirm button is clicked.
     */
    protected abstract getOnConfirmClickAction(): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    /**
     * Called each time the string in the search box is changed.
     */
    protected readonly onSearchBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.getDataInterface().searchDataByString(e.target.value);
    }

    render(){
        return (
            <div>
                {this.renderSearchArea()}
                {this.renderSearchResults()}
                {this.renderResultOptions()}
            </div>
        )
    }

}