import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IUserMatchStatusInterface from "../../game_fights_data_interface/data_interfaces/IUserMatchStatusInterface";

import { UserMatchStatus, MatchStage } from "../../../enums/statusEnums";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

export default class MockUserMatchStatusInterface extends DataInterface<UserMatchStatus> implements IUserMatchStatusInterface{
    
    private matchStatus: UserMatchStatus;

    private matchStageInterface: MockMatchStageDataInterface;

    constructor(matchStatus: UserMatchStatus, matchStageInterface: MockMatchStageDataInterface){
        super();
        this.matchStatus = matchStatus;
        this.matchStageInterface = matchStageInterface;
    }

    protected async loadData() {
        return this.matchStatus;
    }

    public async clearStatus(){
        this.matchStatus = UserMatchStatus.NONE;
        await this.refresh();
    }
    
    public async participateInMatch() {
        this.matchStatus = UserMatchStatus.PARTCIPATING;
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS)

        await this.refresh();
    }
    
    public async judgeMatch() {
        this.matchStatus = UserMatchStatus.JUDGING;
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS)

        await this.refresh();
    }
    
}