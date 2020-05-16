import IDataInterface from "./IDataInterface";

export default interface ISearchInterface<D> extends IDataInterface<D[]>{

    searchDataByString: (searchString: string) => Promise<void>; 

}