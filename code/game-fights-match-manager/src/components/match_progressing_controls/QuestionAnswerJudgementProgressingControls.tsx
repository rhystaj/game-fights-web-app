import MatchProgressingControls from "./MatchProgressingContols";
import { JudgeableQuestionData } from "../../types/datatypes";
import IJudgeableQuestionsInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";

export default class QuestionAnswerJudgementProgressingControls extends MatchProgressingControls<JudgeableQuestionData[],
        IJudgeableQuestionsInterface>{
    
    protected get controlsTypeClassName(){
        return "QuestionAnswerJudgementProgressingControls";
    }

    protected get proceedButtonText(): string {
        return "Finalise Answers";
    }
            
}