import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IMatchResultsDataInterface from "../../game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";

import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { MatchResultsDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";

import { MatchResultData } from "../../../types/datatypes";
import { MatchStage } from "../../../enums/statusEnums";

export default class MockMatchResultsDataInterface extends DataInterface<MatchResultData[]> implements IMatchResultsDataInterface{
    
    private results: UniquelyIdentifiableCollection<MatchResultData>;
    private userMatchStatusInterface: MockUserMatchStatusInterface;
    private matchStageInterface: MockMatchStageDataInterface;

    constructor(results: MatchResultData[], userMatchStatusInterface: MockUserMatchStatusInterface, 
            matchStageInterface: MockMatchStageDataInterface){
        super();

        this.results = new UniquelyIdentifiableCollection<MatchResultData>(results, new MatchResultsDataEquator());
        this.userMatchStatusInterface = userMatchStatusInterface;
        this.matchStageInterface = matchStageInterface;
    }
    

    protected async loadData() {
        return this.results.asArray()
    }

    public async specifyQuestionResult(resultData: MatchResultData, chosenAnswerIndex: number) {
        
        const oldResultData = this.results.retrieveElementWithId(resultData.id);
        const newResultData: MatchResultData = {
            id: oldResultData.id,
            question: oldResultData.question,
            answers: oldResultData.answers,
            chosenAnswerIndex: chosenAnswerIndex
        }

        this.results = this.results.removeElementWithId(oldResultData.id)
                                   .add(newResultData);

        this.refresh();

    }

    public async progressMatch() {
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS);
        await this.userMatchStatusInterface.clear();
    }
    
    public async cancelMatch() {
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS);
        await this.userMatchStatusInterface.clear();
    }

}