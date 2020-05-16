import IDataInterface from "../backend_interface/lib/interfaces/IDataInterface";

export default interface InterfaceAction<D, I extends IDataInterface<D>>{

    execute: (i: I) => Promise<void>; 

}