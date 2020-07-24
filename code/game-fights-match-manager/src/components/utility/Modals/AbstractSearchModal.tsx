import React, { ChangeEvent } from 'react';

import AbstractModal, { ModalProps, ModalState } from './AbstractModal';

import ISearchInterface from '../../../backend_interface/lib/interfaces/ISearchInterface';
import ConfirmationCancelButtons from '../Async_Action_Components/ConfirmationCancelButtons';
import { ComponentContents } from '../../../types/customCompositeTypes';

export interface SearchModalProps<D> extends ModalProps{
    searchInterface: ISearchInterface<D>
}

export interface SearchModalState<D> extends ModalState{
    searchResults: D[]
    showingConfirmationError: boolean
}

export default abstract class AbstractSearchModal<D, P extends SearchModalProps<D>, S extends SearchModalState<D>>
        extends AbstractModal<P, S>{

    protected determineComponentClassString(){
        return "searchModal " + this.searchModalTypeClass;
    }

    /**
     * The class that describes what type of search modal the search modal is.
     */
    protected abstract get searchModalTypeClass(): string;

    protected determineInitialComponentState(){
        return this.determineInitialSearchModalState([], false)
    }

    protected abstract determineInitialSearchModalState(initialSearchResults: D[], showingConfirmationError: boolean): S;

    protected determineInitalData(){
        return [];
    }

    /**
     * [PRE] The action to be peformed when the confirm button is clicked.
     */
    private onConfirmAction = async () => {
        
        try{
            await this.confirm();    
            this.setState({ showingConfirmationError: false });
        }
        catch{
            this.setState({ showingConfirmationError: true });
        }
        
    }

    /**
     * Retrieve the text to be displayed on the confirm button.
     */
    protected abstract getConfirmButtonText(): string;

    /**
     * [PRE] The action to perform when the changes made to the search modal have been confirmed.
     */
    protected abstract confirm(): Promise<void>;

    /**
     * Called each time the string in the search box is changed.
     */
    protected readonly onSearchBoxInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.searchInterface.searchDataByString(e.target.value)
                                  .then(results => { this.setState({ searchResults: results }); });
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
    protected abstract renderSearchResults(): ComponentContents;

    /**
     * [DES/PRE] Render options to describe what to be done with the results of the search.
     */
    protected renderResultOptions(onCancel: () => void): JSX.Element {
        return(
            <ConfirmationCancelButtons 
                confirmationButtonText={this.getConfirmButtonText()}
                onConfirm={this.onConfirmAction}
                onCancel={onCancel}
            />
        )
        
    }

    /**
     * [PRE] Render the message to be shown when an error occurs while confirming the modal data.
     */
    protected abstract renderConfirmationError(): JSX.Element;

    renderModalContents(onCancel: () => void){
        return [
            this.renderSearchArea(),
            ...this.renderSearchResults(),
            this.renderResultOptions(onCancel),
            this.state.showingConfirmationError ? this.renderConfirmationError() : <div />,
        ]
    }

}