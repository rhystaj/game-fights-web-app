import React, { Component } from 'react';

import Loading from './Loading'

import { QueryCallback } from '../../types/functionTypes';

export class LoadingComponentProps<I> {
    
    public readonly dataInterface: I

    public constructor(dataInterface: I){
        this.dataInterface = dataInterface;
    }

}

export interface LoadingComponentState<D>{
    loading: boolean;
    data: D;
}

/**
 * A component that fetches data and displays a loading message while that data is being fetched.
 * @type D The type of data that the component is loading.
 * @type S The type of the state the component can have.
 */
export default abstract class LoadingComponent<I, D, P extends LoadingComponentProps<I> = LoadingComponentProps<I>, 
        S extends LoadingComponentState<D> = LoadingComponentState<D>> extends Component<P, S> {

    private readonly dataInterface: I;

    public constructor(props: P){
        
        super(props);

        this.dataInterface = props.dataInterface;

        let initialData: D = this.determineInitalData();
        this.state = this.determineInitialState(true, initialData);

        //Load the data using the query, updating the state based on the result when done.
        this.loadData(this.dataInterface)(queryResult => {
        
            let newState: LoadingComponentState<D> = this.determineNewStateFromData(queryResult);
            newState.loading = false;
            this.setState(newState);

        });

    }

    /**
     * [DES/PRE] Load the data to be displayed as part of the component.
     * @param loadCallback Defines what is to be done with the data once it has been loaded.
     */
    protected abstract loadData(dataInterface: I): (loadCallback: QueryCallback<D>) => void;

    /**
     * [DES/PRE] Determines the data contained within the state the component will start with.
     */
    protected abstract determineInitalData(): D;

    /**
     * [DES/PRE] Determines the state the component will start with.
     * @param initialLoadingValue The loading the value that it has been determined the state will start with.
     * @param initialData The data that it has been determined the state will start with.
     */
    protected abstract determineInitialState(initialLoadingValue: boolean, initialData: D): S;
    

    /**
     * [DES/PRE] Determine the state the component should be in based on a set of data.
     * @param data The data being used to determine the component's state.
     */
    protected abstract determineNewStateFromData(data: D): S;

    /**
     * [DES/PRE] What the component should look like when the data has been loaded.
     * @param data [DES] The data that will be used to determine how the component is displayed. 
     *             [PRE] The data that is contained within the state.
     */
    protected abstract renderLoaded(dataInterface: I, data: D): JSX.Element;

    public render(){
        if(this.state.loading){
            return <Loading />
        } 
        else {
            return this.renderLoaded(this.dataInterface, this.state.data);
        }
    }
}
