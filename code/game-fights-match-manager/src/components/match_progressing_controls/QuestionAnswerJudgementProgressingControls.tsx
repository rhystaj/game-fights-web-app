import MatchProgressingControls from "./MatchProgressingContols";
import { QuestionAnswersJudgementData } from "../../types/datatypes";
import IQuestionAnswerJudgementsInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";

export default class QuestionAnswerJudgementProgressingControls extends MatchProgressingControls<QuestionAnswersJudgementData[],
        IQuestionAnswerJudgementsInterface>{
    
    protected get controlsTypeClassName(){
        return "QuestionAnswerJudgementProgressingControls";
    }

    protected get proceedButtonText(): string {
        return "Finalise Answers";
    }
            
}