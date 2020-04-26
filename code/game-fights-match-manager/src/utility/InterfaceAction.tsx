export default interface InterfaceAction<I, D>{

    execute: (i: I) => Promise<D>; 

}