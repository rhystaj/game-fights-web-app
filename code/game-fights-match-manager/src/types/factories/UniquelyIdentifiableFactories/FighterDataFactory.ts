import UniquelyIdentifiableFactory, { UniquelyIdentifiableGenerator } from "./UniquelyIdentifiableFactory";
import { FighterData } from "../../datatypes";
import { NULL_INDENTIFIABLE_ID, NullFighterData } from "../../nullTypes";

/**
 * Creates new instances of FighterData objects.
 */
export class FighterDataGenerator extends UniquelyIdentifiableGenerator<FighterData>{
    
    private readonly name: string;

    private readonly engaged: boolean;

    /**
     * Create a new FighterDataGenerator that will create instance of FighterData with the specified id, name,
     * and engaged value.
     * @param id 
     * @param name 
     * @param engaged 
     */
    constructor(id: number = NULL_INDENTIFIABLE_ID, name: string = '', engaged: boolean = false){
        super(id);

        this.name = name;
        this.engaged = engaged;
    }

    /**
     * [DES] Create a clone of the FighterDataGenerator that will create instances of FighterData with the specified name.
     * [PRE] Create a clone of the FighterDataGenerator with the name value set to the specified value.
     * @param name The name value in question.
     */
    protected setName(name: string): FighterDataGenerator{
        return new FighterDataGenerator(this.id, name, this.engaged);
    }

    /**
     * [DES] Create a clone of the FighterDataGenerator that will create instances of fighter data with the specified
     * engaged value.
     * [PRE] Create a clone of the FighterDataGenerator with its engaged value set to the specified value. 
     * @param engaged The engaged value in question.
     */
    protected setEngaged(engaged: boolean): FighterDataGenerator{
        return new FighterDataGenerator(this.id, this.name, engaged);
    }
    
    protected instantiateNew(id: number): UniquelyIdentifiableGenerator<FighterData> {
        return new FighterDataGenerator(id, this.name, this.engaged);
    }
    
    public generate(): FighterData {
        return {
            id: this.id,
            name: this.name,
            engaged: this.engaged
        }
    }

}

export default class FighterDataFactory extends UniquelyIdentifiableFactory<FighterData, FighterDataGenerator>{
    
    public readonly generator: FighterDataGenerator = new FighterDataGenerator();
    
    getNullValue(): FighterData {
        return new NullFighterData();
    }

}