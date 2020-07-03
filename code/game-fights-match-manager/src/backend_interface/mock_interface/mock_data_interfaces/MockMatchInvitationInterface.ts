import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IMatchInvitationInterface from "../../game_fights_data_interface/data_interfaces/IMatchInvitationInterface";

import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";

import { MatchData } from "../../../types/datatypes";

export default class MockMatchInvitiationInterface extends DataInterface<MatchData> implements IMatchInvitationInterface{
    
    private matchData: MatchData;
    private readonly matchStatusInterface: MockUserMatchStatusInterface;

    constructor(matchData: MatchData, userMatchStatusInterface: MockUserMatchStatusInterface){
        super();

        this.matchData = matchData;
        this.matchStatusInterface = userMatchStatusInterface;
    }

    public async acceptInvite() {
        await this.matchStatusInterface.participateInMatch();
        return this.matchData;
    }
    
    public async declineInvite() {
        await this.matchStatusInterface.clearStatus();
        return this.matchData;
    }
    
    protected async loadData() {
        return this.matchData;
    }

}