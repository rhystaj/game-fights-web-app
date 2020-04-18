import LoadingComponent, { LoadingComponentProps, LoadingComponentState } from "./LoadingComponent";

/**
 * [PRE] A loading component with a state that only contains the loading flag and data.
 */
export default abstract class SimpleStateLoadingComponent<I, D, 
    P extends LoadingComponentProps<I> = LoadingComponentProps<I>> 
    extends LoadingComponent<I, D, P, LoadingComponentState<D>>{
    
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