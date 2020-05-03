import React, { Component } from 'react';

import Loading from './Loading'

import { QueryCallback } from '../../types/functionTypes';
import DataInterface from '../../backend_interface/lib/DataInterface';

export interface LoadingComponentProps<M> {
    readonly dataInterfaceManager: M
}

export interface LoadingComponentState<D>{
    loading: boolean;
    data: D;
}

/**
 * A component that fetches data and displays a loading message while that data is being fetched.
 * @type M The manager for the data interfaces.
 * @type D The type of data used to inform what this component is displaying.
 * @type I The interface the component will use to interact with the data.
 * @type P The type of object used to store the component's props.
 * @type S The type of object used to store the component's state.
 */
export default abstract class LoadingComponent<M, D, I extends DataInterface<D> = DataInterface<D>, 
        P extends LoadingComponentProps<M> = LoadingComponentProps<M>, 
        S extends LoadingComponentState<D> = LoadingComponentState<D>> extends Component<P, S> {
    
    public constructor(props: P){
        
        super(props);

        //Set component to update the data whenever the interface detects it has changed.
        this.getDataInterface().registerDataChangeEvent((newData) => {
            this.setState({ 
                data: newData,
                loading: false
             })
        })

        const initialData = this.determineInitalData();
        this.state = this.determineInitialState(true, initialData);

        //Ensure that the data and component are up to date.
        this.getDataInterface().refresh();

    }

    /**
     * Retrieve the interface the component uses to interact with data.
     */
    protected abstract getDataInterface(): I

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
            return this.renderLoaded(this.getDataInterface(), this.state.data);
        }
    }
}
