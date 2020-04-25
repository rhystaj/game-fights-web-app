import React, { Component, ChangeEvent } from 'react';

import { UniquelyIdentifiable } from '../../types/datatypes';
import { FetchFunction, QueryCallback } from '../../types/functionTypes';

export interface SearchModalProps<I>{
    dataInterface: I,
    onCancel: () => void;
}

export interface SearchModalState<I extends UniquelyIdentifiable>{
    searchResults: I[];
}

export default abstract class SearchModal<I, UI extends UniquelyIdentifiable, P extends SearchModalProps<I>, 
        S extends SearchModalState<UI>> extends Component<P, S>{

    constructor(props: P){
        super(props);
        this.state = this.determineInitialState([]);
    }

    protected abstract determineInitialState(searchResults: UI[]): S;

    private onCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.onCancel();
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
        
        let fetchFunction: FetchFunction<UI[]> = this.GenerateFetchFunctionForSearchString(e.target.value);
        let searchCallback: QueryCallback<UI[]> = (searchResults: UI[]) => {
            this.setState(
                {searchResults: searchResults}
            );
        };

        fetchFunction(searchCallback);

    }

    /**
     * Fetch a list of the items that match the search string.
     */
    protected abstract GenerateFetchFunctionForSearchString(searchString: string): FetchFunction<UI[]>

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