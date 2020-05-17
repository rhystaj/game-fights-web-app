import MatchProgressingControls from "./MatchProgressingContols"
import { Question } from "../../types/datatypes";

import IQuestionListInterface from "../../backend_interface/game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";

export default class QuestionListProgressingControls extends MatchProgressingControls<Question[], IQuestionListInterface>{
    
    protected get proceedButtonText(): string {
        return "Open Answer Submission";
    }
    
}