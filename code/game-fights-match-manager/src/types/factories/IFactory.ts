/**
 * [DES/PRE] Used to create new instances of objects.
 */
export interface IGenerator<T>{
    
    /**
     * Create an instance of an object of the type this generator creates.
     */
    generate: () => T;
}

export default interface IFactory<T, G extends IGenerator<T>>{
    
    /**
     * Retrieve the generator used to create new instance of objects of type T.
     */
    readonly generator: G

    /**
     * Get a value representing a null value of type T.
     */
    getNullValue: () => T;
    
}