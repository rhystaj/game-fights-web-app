import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IUserMatchStatusInterface from "../../game_fights_data_interface/data_interfaces/IUserMatchStatusInterface";

import { UserMatchStatus } from "../../../enums/statusEnums";

export default class MockUserMatchStatusInterface extends DataInterface<UserMatchStatus> implements IUserMatchStatusInterface{
    
    private matchStatus: UserMatchStatus;

    constructor(matchStatus: UserMatchStatus){
        super();
        this.matchStatus = matchStatus;
    }

    protected async loadData() {
        return this.matchStatus;
    }

    public async clear(){
        this.matchStatus = UserMatchStatus.NONE;
        this.refresh();
    }
    
    public async setAsParticipating() {
        this.matchStatus = UserMatchStatus.PARTCIPATING;
        this.refresh();
    }
    
    public async setAsJudging() {
        this.matchStatus = UserMatchStatus.JUDGING;
        this.refresh();
    }
    
}