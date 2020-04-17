import React, { Component, ChangeEvent } from 'react';

import { UniquelyIdentifiable } from '../../types/datatypes';

export interface SearchModalState<I extends UniquelyIdentifiable>{
    searchResults: I[];
}

export default class SearchModal<P, I extends UniquelyIdentifiable, S extends SearchModalState<I>> 
        extends Component<P, S>{

    getDerivedStateFromProps = (props: P, state: S) => {
        return {
            searchResults: []
        }
    }

    /**
     * Render an area where the user can enter data for the search.
     */
    renderSearchArea = () => {
        return (
            <div>
                <input onInput={this.onSearchBoxInput} type="text" className="modalSearchBox" />
            </div>
        );
    }

    /**
     * Render an area where the results of the search will be displayed.
     */
    renderSearchResults = () => {
        return (<div />); //To be overridden;
    }

    /**
     * Called each time the string in the search box is changed.
     */
    onSearchBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.fetchSearchResults(e.target.value)((searchResults: I[]) => {
            this.setState(
                {searchResults: searchResults}
            );
        });
    }

    /**
     * Fetch a list of the items that match the search string.
     */
    fetchSearchResults = (searchString: string) => (searchCallback: (searchResults: I[]) => void) =>{
       //To be overridden; 
    }

    render(){
        return (
            <div>
                {this.renderSearchArea()}
                {this.renderSearchResults()}
            </div>
        )
    }

}