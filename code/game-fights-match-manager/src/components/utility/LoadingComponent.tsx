import React, { Component } from 'react';

import Loading from './Loading'

import { QueryCallback } from '../../types/functionTypes';

export class LoadingComponentProps<I> {
    
    public readonly dataInterface: I

    public constructor(dataInterface: I){
        this.dataInterface = dataInterface;
    }

}

export class LoadingComponentState<D>{
    
    public readonly loading: boolean;

    public readonly data: D;

    public constructor(loading: boolean, data: D){
        this.loading = loading;
        this.data = Object.freeze(data);
    }

    /**
     * Creates a copy of the state with loading changed to the specified value.
     * @param loading The new loading value the copy of the state will adopt.
     */
    public setLoading(loading: boolean): LoadingComponentState<D>{
        return new LoadingComponentState<D>(loading, this.data);
    }

    /**
     * Creates a copy of the state with the data changed to the specified value.
     * @param data The new data the copy of the state will adopt.
     */
    public setData(data: D): LoadingComponentState<D>{
        return new LoadingComponentState<D>(this.loading, data);
    }

}

/**
 * A component that fetches data and displays a loading message while that data is being fetched.
 * @type D The type of data that the component is loading.
 * @type S The type of the state the component can have.
 */
export default abstract class LoadingComponent<I, D, P extends LoadingComponentProps<I> = LoadingComponentProps<I>, 
        S extends LoadingComponentState<D> = LoadingComponentState<D>> 
        extends Component<P, S> {

    private readonly dataInterface: I;

    public constructor(props: P){
        
        super(props);

        this.dataInterface = props.dataInterface;

        this.state = this.instantiateState(true, this.determineInitalData());

        //Load the data using the query, updating the state based on the result when done.
        this.loadData(this.dataInterface)(queryResult => {
        
            let newState: S = this.determineNewState(queryResult);
            if(newState.loading !== undefined){
                throw new Error('The loading flag should not be set outside of the LoadingComponent object!');
            }

            this.setState(newState.setLoading(false));

        });

    }

    /**
     * [DES/PRE] Load the data to be displayed as part of the component.
     * @param loadCallback Defines what is to be done with the data once it has been loaded.
     */
    protected abstract loadData(dataInterface: I): (loadCallback: QueryCallback<D>) => void;

    /**
     * [DES/PRE] Creates a new instance of the type of state this LoadingComponent uses with the specified argument.
     * @param loading The loading value the new state will have.
     * @param data The data the new state will contain.
     */
    protected abstract instantiateState(loading: boolean, data: D): S;

    /**
     * [DES/PRE] Determines the data contained within the state the component will start with.
     */
    protected abstract determineInitalData(): D;

    /**
     * [DES/PRE] Determine the state the component should be in based on a set of data.
     * @param data The data being used to determine the component's state.
     */
    protected determineNewState(data: D): S {
        return this.instantiateState(this.state.loading, data)
    }

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
