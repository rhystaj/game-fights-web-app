import { Component } from "react";
import DataInterface from "../../backend_interface/lib/DataInterface";

export interface DataInterfacingComponentProps<M>{
    dataInterfaceManager: M
}

export default abstract class DataInterfacingComponent<M, D, 
        I extends DataInterface<D> = DataInterface<D>,
        P extends DataInterfacingComponentProps<M> = DataInterfacingComponentProps<M>,
        S = {}> extends Component<P, S>{

}