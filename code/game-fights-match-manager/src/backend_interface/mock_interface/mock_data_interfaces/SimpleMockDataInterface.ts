import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

export default class SimpleMockDataInterface<D> extends DataInterface<D>{
    
    private data: D;

    constructor(data: D){
        super();
        this.data = data;
    }

    protected async loadData(){
        return this.data;
    }

}