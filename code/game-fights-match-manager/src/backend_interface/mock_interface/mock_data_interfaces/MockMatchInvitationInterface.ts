import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IMatchInvitationInterface from "../../game_fights_data_interface/data_interfaces/IMatchInvitationInterface";

import MockMatchStatusInterface from "../../mock_interface/mock_data_interfaces/MockMatchStatusDataInterface"

import { MatchData } from "../../../types/datatypes";

export default class MockMatchInvitiationInterface extends DataInterface<MatchData> implements IMatchInvitationInterface{
    
    private matchData: MatchData;
    private readonly matchStatusInterface: MockMatchStatusInterface;

    constructor(matchData: MatchData, userMatchStatusInterface: MockMatchStatusInterface){
        super();

        this.matchData = matchData;
        this.matchStatusInterface = userMatchStatusInterface;
    }

    public async acceptInvite() {
        await this.matchStatusInterface.participateInMatch();
        return this.matchData;
    }
    
    public async declineInvite() {
        await this.matchStatusInterface.clearUserStatus();
        return this.matchData;
    }
    
    protected async loadData() {
        return this.matchData;
    }

}