import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IMatchResultsDataInterface from "../../game_fights_data_interface/data_interfaces/IMatchResultsDataInterface";

import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { MatchResultsDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";

import { MatchResultData } from "../../../types/datatypes";
import { MatchStage } from "../../../enums/statusEnums";
import AbstractMockMatchDataInterface from "./AbstractMockMatchDataInterface";

export default class MockMatchResultsDataInterface extends AbstractMockMatchDataInterface<MatchResultData[]> 
                                                   implements IMatchResultsDataInterface{
    
    private results: UniquelyIdentifiableCollection<MatchResultData>;

    constructor(results: MatchResultData[], userMatchStatusInterface: MockUserMatchStatusInterface, 
            matchStageInterface: MockMatchStageDataInterface){
        super(userMatchStatusInterface, matchStageInterface);

        this.results = new UniquelyIdentifiableCollection<MatchResultData>(results, new MatchResultsDataEquator());
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

        return this.results.asArray();

    }

    public async progressMatch() {
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS);
        await this.userMatchStatusInterface.clear();
    }

}