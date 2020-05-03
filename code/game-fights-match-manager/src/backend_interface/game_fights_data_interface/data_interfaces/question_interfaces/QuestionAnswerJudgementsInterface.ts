import QuestionsInterface from "./QuestionsInterface"
import { QuestionAnswersJudgementData } from "../../../../types/datatypes";
import { AnswerSubmissionState } from "../../../../enums/statusEnums";


export default abstract class QuestionAnswerJudgementsInterface extends QuestionsInterface<QuestionAnswersJudgementData>{

    public abstract submitAnswerJudgementStateUpdate(question: QuestionAnswersJudgementData, answerIndex: number, 
        answerStatus: AnswerSubmissionState): Promise<void>;

}