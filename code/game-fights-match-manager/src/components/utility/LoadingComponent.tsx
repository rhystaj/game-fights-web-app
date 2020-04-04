import React, { Component } from 'react';

import Loading from './Loading'

import { FetchFunction } from '../../types/functionTypes';

export abstract class LoadingComponentState{
    
    public readonly loading: boolean;

    public constructor(loading: boolean){
        this.loading = loading;
    }

    public setLoading(loading: boolean){
        return this.instantiateNewLoadingComponentState(loading);
    }

    /**
     * [DES/PRE] Returns a new instance of LodingComponentState with all values the same, except for the ones specified.
     * [PRE] Calls the and returns the result of the implementing class's constructor.
     * @param loading 
     */
    protected abstract instantiateNewLoadingComponentState(loading: boolean): LoadingComponentState;

}

/**
 * A component that fetches data and displays a loading message while that data is being fetched.
 * @type D The type of data that the component is loading.
 * @type S The type of the state the component can have.
 */
export default abstract class LoadingComponent<D, S extends LoadingComponentState> extends Component<{}, S> {

    private query: FetchFunction<D>

    public constructor(props: {}, initialState: S, query: FetchFunction<D>){
        super(props);

        this.query = query;

        this.state = initialState;

        //Load the data using the query, updating the state based on the result when done.
        this.query(queryResult => {
        
            let newState = this.determineNewState(queryResult);
            if(newState.loading !== undefined){
                throw new Error('The loading flag should not be set outside of the LoadingComponent object!');
            }

            newState = newState.setLoading(false);
            this.setState(newState);

        });
    }

    protected abstract determineNewState(result: D): LoadingComponentState;

    protected abstract renderLoaded(): JSX.Element;

    public render(){
        if(this.state.loading){
            return <Loading />
        } 
        else {
            return this.renderLoaded();
        }
    }
}
