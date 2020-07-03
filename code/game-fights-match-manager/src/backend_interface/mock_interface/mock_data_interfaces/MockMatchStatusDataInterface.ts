import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";
import { MatchStatusData } from "../../../types/datatypes";
import IMatchStatusDataInterface from "../../game_fights_data_interface/data_interfaces/IMatchStatusDatainterface";
import { UserMatchStatus, MatchStage } from "../../../enums/statusEnums";

export default class MockMatchStatusDataInterface extends DataInterface<MatchStatusData> implements IMatchStatusDataInterface {
    
    private matchStatus: MatchStatusData;

    public constructor(userMatchStatus: UserMatchStatus, matchStage: MatchStage){
        super();
        this.matchStatus = {
            userMatchStatus: userMatchStatus,
            matchStage: matchStage
        }
    }
    
    protected async loadData() {
        return this.matchStatus;
    }
    
    async clearUserStatus() {
        
        this.matchStatus = {
            userMatchStatus: UserMatchStatus.NONE,
            matchStage: MatchStage.DETERMINING_QUESTIONS
        }

        return this.matchStatus;

    }
    
    async participateInMatch() {
        
        this.matchStatus = {
            userMatchStatus: UserMatchStatus.PARTCIPATING,
            matchStage: MatchStage.DETERMINING_QUESTIONS
        }

        return this.matchStatus;

    }

    async judgeMatch() {

        this.matchStatus = {
            userMatchStatus: UserMatchStatus.JUDGING,
            matchStage: MatchStage.DETERMINING_QUESTIONS
        }

        return this.matchStatus;
    }

    async progressMatchStage() {

        switch(this.matchStatus.matchStage){

            case MatchStage.DETERMINING_QUESTIONS:
                this.matchStatus.matchStage = MatchStage.ANSWERS_OPENED
                break;

            case MatchStage.ANSWERS_OPENED:
                this.matchStatus.matchStage = MatchStage.RECORDING_RESULTS;
                break;

            case MatchStage.RECORDING_RESULTS:
                this.matchStatus = await this.clearUserStatus();
                break;

        }

        return this.matchStatus;

    }

}