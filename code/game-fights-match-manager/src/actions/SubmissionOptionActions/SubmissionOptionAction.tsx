import InterfaceAction from '../../utility/InterfaceAction'
import { AnswerSubmissionData } from '../../types/datatypes';
import IAnswerSubmissionDataInterface from '../../backend_interface/game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface';

/**
 * An interface action to be performed on an answer submission.
 */
export default abstract class SubmissionOptionAction implements 
    InterfaceAction<AnswerSubmissionData[], IAnswerSubmissionDataInterface>{
    
    private _submission: AnswerSubmissionData;
    get Submission(): AnswerSubmissionData{
        return this._submission;
    }

    constructor(submission: AnswerSubmissionData){
        this._submission = submission;
    }

    public abstract execute(i: IAnswerSubmissionDataInterface): Promise<void>;

}