import SearchInterface from "../../lib/abstract_implementations/AbstarctSearchInterface";
import { FighterData } from "../../../types/datatypes";

export default class MockFighterDataSearchInterface extends SearchInterface<FighterData> {
    
    private fighters: FighterData[];

    constructor(fighters: FighterData[]){
        super();
        this.fighters = fighters;
    }

    protected async loadSearchData(searchString: string) {
        
        if(searchString.length === 0){
            return [];
        }
        else{
            return this.fighters.filter(f => f.name.includes(searchString));
        }

    }

}