import IQuestionsInterface from "./IQuestionsInterface"

import { JudgeableQuestionData } from "../../../../types/datatypes";
import { AnswerSubmissionState } from "../../../../enums/statusEnums";

export default interface IJudgeableQuestionsInterface extends IQuestionsInterface<JudgeableQuestionData>{

    submitAnswerJudgementStateUpdate(question: JudgeableQuestionData, answerIndex: number, 
        answerStatus: AnswerSubmissionState): Promise<JudgeableQuestionData[]>;

}