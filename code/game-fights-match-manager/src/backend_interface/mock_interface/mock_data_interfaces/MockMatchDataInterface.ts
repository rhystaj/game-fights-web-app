import MatchDataInterface from "../../game_fights_data_interface/data_interfaces/MatchDataInterface";
import { MatchData, FighterData } from "../../../types/datatypes";
import { FAILURE_FIGHTER_ID } from "../test_data/testFighterDatabase";

export default class MockMatchDataInterface extends MatchDataInterface{
    
    private matchData: MatchData;

    constructor(data: MatchData){
        super();
        this.matchData = data;
    }

    public async submitMatchTitle(title: string): Promise<void> {
        this.matchData.title = title;
    }
    
    public async submitMatchParticipants(invites: FighterData[]){
        
        if(invites.filter(i => i.id === FAILURE_FIGHTER_ID).length > 0)
            throw Error();

        this.matchData.invitedFighters = invites;
        
    }
    
    protected async loadData(){
        return this.matchData;
    }

}