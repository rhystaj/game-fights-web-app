import IFactory, { IGenerator } from "../IFactory";
import { UniquelyIdentifiable } from "../../datatypes";
import { NULL_INDENTIFIABLE_ID } from "../../nullTypes";

/**
 * [DES/PRE] Creates new instances of UniquelyIdentifiable objects.
 */
export abstract class UniquelyIdentifiableGenerator<I extends UniquelyIdentifiable> implements IGenerator<I>{
    
    protected readonly id: number

    constructor(id: number = NULL_INDENTIFIABLE_ID){
        this.id = id;
    }

    /**
     * [DES] Creates a clone of the generator that will generate a uniquely identifiable with a unique id.
     * [PRE] Create a clone of the generator with the id set to the given id.
     * @param id The value the id value will be set to.
     */
    public setId(id: number): UniquelyIdentifiableGenerator<I>{
        return this.instantiateNew(id);
    }

    public abstract generate(): I;
    
    /**
     * Create a new instance of the UniquelyIdentifiable object the generator is generating.
     * @param id 
     */
    protected abstract instantiateNew(id: number): UniquelyIdentifiableGenerator<I>;

}

export default abstract class UniquelyIdentifiableFactory<I extends UniquelyIdentifiable, 
        G extends UniquelyIdentifiableGenerator<I>>  implements IFactory<I, G>{
    
    abstract readonly generator: G;
    
    abstract getNullValue(): I;

}