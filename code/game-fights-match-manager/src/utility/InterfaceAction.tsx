import DataInterface from "../backend_interface/lib/DataInterface";

export default interface InterfaceAction<D, I extends DataInterface<D>>{

    execute: (i: I) => Promise<void>; 

}