import IQuestionsInterface from "./IQuestionsInterface"

import { QuestionAnswersJudgementData } from "../../../../types/datatypes";
import { AnswerSubmissionState } from "../../../../enums/statusEnums";



export default interface IQuestionAnswerJudgementsInterface extends IQuestionsInterface<QuestionAnswersJudgementData>{

    submitAnswerJudgementStateUpdate(question: QuestionAnswersJudgementData, answerIndex: number, 
        answerStatus: AnswerSubmissionState): Promise<QuestionAnswersJudgementData[]>;

}