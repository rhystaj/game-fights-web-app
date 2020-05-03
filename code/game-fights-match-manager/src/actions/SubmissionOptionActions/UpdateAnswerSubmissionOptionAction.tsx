import GameFightsDataInterface from '../../backend_interface/game_fights_data_interface/GameFightsDataInterface';

import SubmissionOptionAction from "./SubmissionOptionAction";
import { AnswerSubmissionData } from "../../types/datatypes";

export default class UpdateAnswerSubmissionOptionAction extends SubmissionOptionAction{
    
    private newAnswer: string;

    constructor(submission: AnswerSubmissionData, newAnswer: string){
        super(submission);
        this.newAnswer = newAnswer;
    }

    public async execute(i: GameFightsDataInterface){
        return await i.submitAnswerUpdate(this.Submission, this.newAnswer);
    }

}