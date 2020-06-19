import React, { ChangeEvent } from 'react';

import DataInterfacingComponent, { DataInterfacingComponentProps, DataInterfacingComponentState } from './DataInterfacingComponent';

import ISearchInterface from '../../backend_interface/lib/interfaces/ISearchInterface';
import ConfirmationCancelButtons from './Async_Action_Components/ConfirmationCancelButtons';

export interface SearchModalProps<M> extends DataInterfacingComponentProps<M>{
    onCancel: () => void;
}

export interface SearchModalState<D> extends DataInterfacingComponentState<D[]>{
    showingConfirmationError: boolean
}

export default abstract class SearchModal<M, D, I extends ISearchInterface<D>, 
        P extends SearchModalProps<M>,
        S extends SearchModalState<D>>
        extends DataInterfacingComponent<M, D[], I, P, S>{

    protected determineComponentClassString(){
        return "searchModal " + this.searchModalTypeClass;
    }

    /**
     * The class that describes what type of search modal the search modal is.
     */
    protected abstract get searchModalTypeClass(): string;

    protected determineInitialDataInterfacingComponentState(initialData: D[]){
        return this.determineInitialSearchModalState(initialData, false);
    }

    protected abstract determineInitialSearchModalState(initialData: D[], showingConfirmationError: boolean): S;

    private onCancel = () => {
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
    protected abstract renderSearchResults(): JSX.Element | JSX.Element[];

    /**
     * [DES/PRE] Render options to describe what to be done with the results of the search.
     */
    protected renderResultOptions(): JSX.Element {
        return(
            <ConfirmationCancelButtons 
                confirmationButtonText={this.getConfirmButtonText()}
                onConfirm={this.onConfirmAction}
                onCancel={this.onCancel}
            />
        )
        
    }

    /**
     * [PRE] Render the message to be shown when an error occurs while confirming the modal data.
     */
    protected abstract renderConfirmationError(): JSX.Element;

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
        this.getDataInterface().searchDataByString(e.target.value);
    }

    renderComponentContents(){
        return (
            <div className="searchModalContent">
                {this.renderSearchArea()}
                {this.renderSearchResults()}
                {this.renderResultOptions()}
                {this.state.showingConfirmationError ? this.renderConfirmationError() : <div />}
            </div>
        )
    }

}