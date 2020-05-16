import IDataInterface from "../interfaces/IDataInterface";

export default abstract class DataInterface<D> implements IDataInterface<D>{

    private _dataChangeEvent: (newData: D) => void;
    protected get dataChangeEvent(){
        return this._dataChangeEvent;
    }

    private _dataErrorEvent: (err: Error) => void;
    protected get dataErrorEvent(){
        return this._dataErrorEvent;
    }

    constructor(){
        this._dataChangeEvent = (newData) => { }
        this._dataErrorEvent = (err) => { }
    }

    /**
     * [DES/PRE] Register an event to be called when the interface detects a change in the data.
     * @param changeEvent 
     */
    public registerDataChangeEvent(changeEvent: (newData: D) => void){
        this._dataChangeEvent = changeEvent;
    }

    /**
     * [DES/PRE] Register an event to be called when an error occurs when loading the data.
     * @param errorEvent 
     */
    public registerDataErrorEvent(errorEvent: (err: Error) => void){
        this._dataErrorEvent = errorEvent;
    }
    
    /**
     * Try to reload the data.
     */
    public async refresh(){
        const data = await this.loadData()
        this._dataChangeEvent(data);
    }

    protected abstract loadData() : Promise<D>;

}