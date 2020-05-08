import LoadingComponent, { LoadingComponentState } from "./LoadingComponent";
import DataInterface from "../../backend_interface/lib/DataInterface";
import { DataInterfacingComponentProps } from "./DataInterfacingComponent";

/**
 * [PRE] A loading component with a state that only contains the loading flag and data.
 */
export default abstract class SimpleStateLoadingComponent<M, D, 
    I extends DataInterface<D> = DataInterface<D>, 
    P extends DataInterfacingComponentProps<M> = DataInterfacingComponentProps<M>> 
    extends LoadingComponent<M, D, I, P, LoadingComponentState<D>>{
    
    protected determineInitialLoadingComponentState(initialLoadingValue: boolean, initialData: D): LoadingComponentState<D> {
        return {
            loading: initialLoadingValue,
            data: initialData
        }
    }
    
    protected determineNewStateFromData(data: D): LoadingComponentState<D> {
        return{
            loading: this.state.loading,
            data: data
        }
    }
    
} 