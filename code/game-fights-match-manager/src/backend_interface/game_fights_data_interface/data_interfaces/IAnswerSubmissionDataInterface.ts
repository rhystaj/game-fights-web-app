import IDataInterface from "../../lib/interfaces/IDataInterface";

import { AnswerSubmissionData } from "../../../types/datatypes";

export default interface IAnswerSubmissionDataInterface extends IDataInterface<AnswerSubmissionData[]>{

    submitAnswerUpdate(answerSubmission: AnswerSubmissionData, newAnswer: string): Promise<void>;

}