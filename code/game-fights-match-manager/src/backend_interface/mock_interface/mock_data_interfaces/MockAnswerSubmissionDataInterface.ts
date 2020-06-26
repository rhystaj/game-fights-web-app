import IAnswerSubmissionDataInterface from "../../game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface";
import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { AnswerSubmissionData } from "../../../types/datatypes";
import { AnswerSubmissionDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { AnswerSubmissionState } from "../../../enums/statusEnums";
import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";
import AbstractMockMatchDataInterface from "./AbstractMockMatchDataInterface";
import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

export default class MockAnswerSubmissionDataInterface extends AbstractMockMatchDataInterface<AnswerSubmissionData[]> 
                                                       implements IAnswerSubmissionDataInterface{
    
    private answerSubmissions: UniquelyIdentifiableCollection<AnswerSubmissionData>;

    constructor(answerSubmissions: AnswerSubmissionData[], userMatchStatusInterface: MockUserMatchStatusInterface,
                matchStageInterface: MockMatchStageDataInterface){
        super(userMatchStatusInterface, matchStageInterface);
        this.answerSubmissions = new UniquelyIdentifiableCollection(answerSubmissions, new AnswerSubmissionDataEquator());
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