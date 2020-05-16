import SubmissionOptionAction from "./SubmissionOptionAction";
import { AnswerSubmissionData } from "../../types/datatypes";
import IAnswerSubmissionDataInterface from '../../backend_interface/game_fights_data_interface/data_interfaces/IAnswerSubmissionDataInterface';

export default class UpdateAnswerSubmissionOptionAction extends SubmissionOptionAction{
    
    private newAnswer: string;

    constructor(submission: AnswerSubmissionData, newAnswer: string){
        super(submission);
        this.newAnswer = newAnswer;
    }

    public async execute(i: IAnswerSubmissionDataInterface){
        return await i.submitAnswerUpdate(this.Submission, this.newAnswer);
    }

}