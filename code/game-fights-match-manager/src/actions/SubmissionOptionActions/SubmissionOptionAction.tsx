import InterfaceAction from '../../utility/InterfaceAction'
import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface';
import { AnswerSubmissionData } from '../../types/datatypes';

/**
 * An interface action to be performed on an answer submission.
 */
export default abstract class SubmissionOptionAction implements InterfaceAction<GameFightsDataInterface, AnswerSubmissionData[]>{
    
    private _submission: AnswerSubmissionData;
    get Submission(): AnswerSubmissionData{
        return this._submission;
    }

    constructor(submission: AnswerSubmissionData){
        this._submission = submission;
    }

    public abstract execute(i: GameFightsDataInterface): Promise<AnswerSubmissionData[]>;

}