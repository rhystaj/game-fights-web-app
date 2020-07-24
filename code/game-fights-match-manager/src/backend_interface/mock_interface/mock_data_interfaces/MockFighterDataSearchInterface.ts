import ISearchInterface from '../../lib/interfaces/ISearchInterface'

import { FighterData } from "../../../types/datatypes";

export default class MockFighterDataSearchInterface implements ISearchInterface<FighterData> {
    
    private fighters: FighterData[];

    constructor(fighters: FighterData[]){
        this.fighters = fighters;
    }
    
    public async searchDataByString (searchString: string) {

        let result: FighterData[] = [];

        if(searchString.length > 0){
            result = this.fighters.filter(f => f.name.includes(searchString));
        }

        return result;

    }

}