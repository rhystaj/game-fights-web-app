import IQuestionsInterface from "./IQuestionsInterface"
import { QuestionAnswersJudgementData } from "../../../../types/datatypes";
import { AnswerSubmissionState } from "../../../../enums/statusEnums";


export default interface IQuestionAnswerJudgementsInterface extends IQuestionsInterface<QuestionAnswersJudgementData>{

    submitAnswerJudgementStateUpdate(question: QuestionAnswersJudgementData, answerIndex: number, 
        answerStatus: AnswerSubmissionState): Promise<void>;

    /**
     * [DES/PRE] Cut off any further submissions of answers and make any accepted answers the final answers for
     * the questions.
     */
    finaliseAnswerSubmissions(): Promise<void>;

}