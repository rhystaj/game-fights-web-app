import MatchInvitationInterface from "../../game_fights_data_interface/data_interfaces/MatchInvitationInterface"
import soloMatchData from "../test_data/matchData";
import { MatchData } from "../../../types/datatypes";
import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import UserMatchStatusInterface from "../../game_fights_data_interface/data_interfaces/UserMatchStatusInterface";
import { UserMatchStatus } from "../../../enums/statusEnums";

export default class MockMatchInvitiationInterface extends MatchInvitationInterface{
    
    private matchData: MatchData;
    private readonly matchStatusInterface: MockUserMatchStatusInterface;

    constructor(matchData: MatchData, userMatchStatusInterface: MockUserMatchStatusInterface){
        super();

        this.matchData = matchData;
        this.matchStatusInterface = userMatchStatusInterface;
    }

    public async acceptInvite() {
        await this.matchStatusInterface.setUserMatchStatus(UserMatchStatus.PARTCIPATING);
    }
    
    public async declineInvite() {
        await this.matchStatusInterface.setUserMatchStatus(UserMatchStatus.NONE);
    }
    
    protected async loadData() {
        return this.matchData;
    }

}