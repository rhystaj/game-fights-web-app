import MatchDataInterface from "../../game_fights_data_interface/data_interfaces/MatchDataInterface";
import { MatchData, FighterData } from "../../../types/datatypes";

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
        this.matchData.invitedFighters = invites;
    }
    
    protected async loadData(){
        return this.matchData;
    }

}