import DataInterface from "../../lib/DataInterface";
import { MatchStage } from "../../../enums/statusEnums";

export default class MockMatchStageDataInterface extends DataInterface<MatchStage>{
    
    private matchStage: MatchStage;

    constructor(initialMatchStage: MatchStage){
        super();
        this.matchStage = initialMatchStage;
    }

    protected async loadData() {
        return this.matchStage;
    }

    public setMatchStage(newMatchStage: MatchStage): void{
        this.matchStage = newMatchStage;
        this.refresh();
    }

}