import MatchResultsDataInterface from "../../game_fights_data_interface/data_interfaces/MatchResultsDataInterface";
import { MatchResultData } from "../../../types/datatypes";
import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { MatchResultsDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";

export default class MockMatchResultsDataInterface extends MatchResultsDataInterface{
    
    private results: UniquelyIdentifiableCollection<MatchResultData>;

    constructor(results: MatchResultData[]){
        super();
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

        this.refresh();

    }

}