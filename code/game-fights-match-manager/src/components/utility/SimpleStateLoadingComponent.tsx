import IDataInterface from "../../backend_interface/lib/interfaces/IDataInterface";

import LoadingComponent, { LoadingComponentState } from "./LoadingComponent";

import { DataInterfacingComponentProps } from "./DataInterfacingComponent";

/**
 * [PRE] A loading component with a state that only contains the loading flag and data.
 */
export default abstract class SimpleStateLoadingComponent<M, D, 
    I extends IDataInterface<D> = IDataInterface<D>, 
    P extends DataInterfacingComponentProps<M> = DataInterfacingComponentProps<M>> 
    extends LoadingComponent<M, D, I, P, LoadingComponentState<D>>{
    
    protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialData: D): LoadingComponentState<D> {
        return {
            loading: initialLoadingValue,
            data: initialData
        }
    }

} 