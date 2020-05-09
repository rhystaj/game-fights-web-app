import { Component } from "react";
import DataInterface from "../../backend_interface/lib/DataInterface";

export interface DataInterfacingComponentProps<M>{
    dataInterfaceManager: M
}

export interface DataInterfacingComponentState<D>{
    data: D
}

export default abstract class DataInterfacingComponent<M, D, 
        I extends DataInterface<D> = DataInterface<D>,
        P extends DataInterfacingComponentProps<M> = DataInterfacingComponentProps<M>,
        S extends DataInterfacingComponentState<D> = DataInterfacingComponentState<D>> extends Component<P, S>{

    public constructor(props: P){
        super(props);

        //Set component to update the data whenever the interface detects it has changed.
        this.getDataInterface().registerDataChangeEvent((newData) => { 
            this.onDataChange(this.state.data, newData); 
        })

        const initialData = this.determineInitalData();
        this.state = this.determineInitialComponentState(initialData);

        //Ensure that the data and component are up to date.
        this.getDataInterface().refresh();
    }

    /**
     * [DES/PRE] Retrieve the interface the component uses to interact with data.
     */
    protected abstract getDataInterface(): I

    /**
     * [DES] Updates the data in the component to the newly changed data.
     * [PRE] Reacts to the data being changed on the interface.
     */
    protected onDataChange(oldData: D, newData: D){
        this.setState({ data: newData });
    }

    /**
     * [DES/PRE] Determines the data contained within the state the component will start with.
     */
    protected abstract determineInitalData(): D;

    /**
     * [DES/PRE] Determines the state the component will start with.
     * @param initialLoadingValue The loading the value that it has been determined the state will start with.
     * @param initialData The data that it has been determined the state will start with.
     */
    protected abstract determineInitialComponentState(initialData: D): S;

}