import IAnswerSubmissionDataInterface from "../../game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface";
import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { AnswerSubmissionData } from "../../../types/datatypes";
import { AnswerSubmissionDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { AnswerSubmissionState } from "../../../enums/statusEnums";
import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

export default class MockAnswerSubmissionDataInterface extends DataInterface<AnswerSubmissionData[]> 
                                                       implements IAnswerSubmissionDataInterface{
    
    private answerSubmissions: UniquelyIdentifiableCollection<AnswerSubmissionData>;

    constructor(answerSubmissions: AnswerSubmissionData[]){
        super();
        this.answerSubmissions = new UniquelyIdentifiableCollection(answerSubmissions, new AnswerSubmissionDataEquator());

        // setTimeout(() => {
        //     this.submitAnswerUpdate(this.answerSubmissions.retrieveElementWithId(4), "Uh... I don't know, maybe?");
        // }, 10000)

    }

    protected async loadData() {
        return this.answerSubmissions.asArray();
    }

    public async submitAnswerUpdate(answerSubmission: AnswerSubmissionData, newAnswer: string) {
        
        const oldSubmission = this.answerSubmissions.retrieveElementWithId(answerSubmission.id);
        const newSubmission = {
            id: oldSubmission.id,
            question: oldSubmission.question,
            answer: newAnswer,
            validatedByUser: oldSubmission.validatedByUser,
            state: AnswerSubmissionState.PENDING_JUDGE_APPROVAL
        }
        
        this.answerSubmissions = this.answerSubmissions.removeElementWithId(oldSubmission.id)
                                                       .add(newSubmission);

        await new Promise(res => setTimeout(() => res(), 3000));
        
        return this.answerSubmissions.asArray();

    }

} 