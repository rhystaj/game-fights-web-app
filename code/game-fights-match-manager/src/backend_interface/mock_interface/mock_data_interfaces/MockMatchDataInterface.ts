import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IMatchDataInterface from "../../game_fights_data_interface/data_interfaces/IMatchDataInterface";

import { MatchData, FighterData } from "../../../types/datatypes";
import { FAILURE_FIGHTER_ID } from "../test_data/testFighterDatabase";
import { DateType } from "../../../enums/referenceEnums";

export default class MockMatchDataInterface extends DataInterface<MatchData> implements IMatchDataInterface{
    
    private matchData: MatchData;

    constructor(data: MatchData){
        super();
        this.matchData = data;
    }

    public async submitMatchTitle(title: string) {
        
        await new Promise((resolve) => { setTimeout(() => { resolve() }, 3000) });

        this.matchData.title = title;
        return this.matchData;

    }
    
    public async submitMatchDate(type: DateType, date: Date){

        await new Promise((resolve) => { setTimeout(() => { resolve() }, 3000) });

        switch(type){

            case DateType.Match:
                this.matchData.dates.match = date;
                break;

            case DateType.AnswersOpen:
                this.matchData.dates.open = date;
                break;

            case DateType.AnswersClose:
                this.matchData.dates.close = date;
                break;

        }

        return this.matchData;

    }

    public async submitMatchParticipants(invites: FighterData[]){
        
        if(invites.filter(i => i.id === FAILURE_FIGHTER_ID).length > 0)
            throw Error();

        this.matchData.invitedFighters = invites;
        return this.matchData;
        
    }
    
    protected async loadData(){
        return this.matchData;
    }

}