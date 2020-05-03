import LoadingComponent, { LoadingComponentProps, LoadingComponentState } from "./LoadingComponent";
import DataInterface from "../../backend_interface/lib/DataInterface";

/**
 * [PRE] A loading component with a state that only contains the loading flag and data.
 */
export default abstract class SimpleStateLoadingComponent<M, D, 
    P extends LoadingComponentProps<M> = LoadingComponentProps<M>> 
    extends LoadingComponent<M, D, DataInterface<D>, P, LoadingComponentState<D>>{
    
    protected determineInitialState(initialLoadingValue: boolean, initialData: D): LoadingComponentState<D> {
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