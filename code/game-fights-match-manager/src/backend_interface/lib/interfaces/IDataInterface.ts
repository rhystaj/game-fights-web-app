export default interface IDataInterface<D>{

    /**
     * [DES/PRE] Register an action to be performed in response to the data changing to a new value.
     */
    registerDataChangeEvent: (onDataChange: DataChangeEvent<D>) => void;

    /**
     * [DES/PRE] Register an action to be performed when then is an error loading the data.
     */
    registerDataErrorEvent: (onDataError: DataErrorEvent) => void;

    /**
     * [DES/PRE] Reload the data and make sure the interface is up-to-date.
     */
    refresh: () => Promise<void>;

}

export type DataChangeEvent<D> = (newData: D) => void;

export type DataErrorEvent = (error: Error) => void;