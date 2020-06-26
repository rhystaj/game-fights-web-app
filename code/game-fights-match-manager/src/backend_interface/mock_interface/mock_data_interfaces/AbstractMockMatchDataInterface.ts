import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";
import IMatchCancellingDataInterface from "../../game_fights_data_interface/data_interfaces/IMatchCancellingDataInterface";
import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";
import { MatchStage } from "../../../enums/statusEnums";

export default abstract class AbstractMockMatchDataInterface<D> extends DataInterface<D> 
                                                                implements IMatchCancellingDataInterface<D>{

    private _userMatchStatusInterface: MockUserMatchStatusInterface;
    protected get userMatchStatusInterface(){
        return this._userMatchStatusInterface;
    }
    
    private _matchStageInterface: MockMatchStageDataInterface;
    protected get matchStageInterface(){
        return this._matchStageInterface;
    }

    constructor(userMatchStatusInterface: MockUserMatchStatusInterface, matchStageInterface: MockMatchStageDataInterface){
        super();
        
        this._userMatchStatusInterface = userMatchStatusInterface;
        this._matchStageInterface = matchStageInterface;           
    }

    async cancelMatch() {
        await this._matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS);
        await this._userMatchStatusInterface.clear();
    }

}