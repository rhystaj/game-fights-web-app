import QuestionsInterface from "./QuestionsInterface"
import { QuestionAnswersJudgementData } from "../../../../types/datatypes";
import { AnswerSubmissionState } from "../../../../enums/statusEnums";


export default abstract class QuestionAnswerJudgementsInterface extends QuestionsInterface<QuestionAnswersJudgementData>{

    public abstract submitAnswerJudgementStateUpdate(question: QuestionAnswersJudgementData, answerIndex: number, 
        answerStatus: AnswerSubmissionState): Promise<void>;

    /**
     * [DES/PRE] Cut off any further submissions of answers and make any accepted answers the final answers for
     * the questions.
     */
    public abstract finaliseAnswerSubmissions(): Promise<void>;

}