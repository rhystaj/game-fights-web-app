import React from 'react';

import IDataInterface from '../../backend_interface/lib/interfaces/IDataInterface';

import Loading from './Loading'
import DataInterfacingComponent, { DataInterfacingComponentProps, DataInterfacingComponentState } from './DataInterfacingComponent';

import '../../style/main.css';

export interface LoadingComponentState<D> extends DataInterfacingComponentState<D>{
    loading: boolean;
}

/**
 * A component that fetches data and displays a loading message while that data is being fetched.
 * @type M The manager for the data interfaces.
 * @type D The type of data used to inform what this component is displaying.
 * @type I The interface the component will use to interact with the data.
 * @type P The type of object used to store the component's props.
 * @type S The type of object used to store the component's state.
 */
export default abstract class LoadingComponent<M, D, I extends IDataInterface<D> = IDataInterface<D>, 
        P extends DataInterfacingComponentProps<M> = DataInterfacingComponentProps<M>, 
        S extends LoadingComponentState<D> = LoadingComponentState<D>> 
        extends DataInterfacingComponent<M, D, I, P, S> {

    protected determineComponentClassString(){
        return "loadingComponent " + (this.state.loading ? "loading" : "loaded");
    }

    protected onDataChange(oldData: D, newData: D){
        super.onDataChange(oldData, newData);
        
        //When the data changes, that means it's no longer loading on the back end, so the loading
        //component can be updated to render the data.
        this.setState({ loading: false })
    }

    protected determineInitialComponentState(data: D){
        return this.determineInitialLoadingComponentState(true, data);
    }

    protected abstract determineInitialLoadingComponentState(loading: boolean, data: D): S;

    /**
     * [DES/PRE] What the component should look like when the data has been loaded.
     * @param data [DES] The data that will be used to determine how the component is displayed. 
     *             [PRE] The data that is contained within the state.
     */
    protected abstract renderLoaded(dataInterface: I, data: D): JSX.Element | JSX.Element[];

    public renderComponentContents(){
        return this.state.loading ? <Loading/> : this.renderLoaded(this.getDataInterface(), this.state.data);
    }

}
