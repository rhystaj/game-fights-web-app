import DataInterface from "../../lib/DataInterface";
import { AnswerSubmissionData } from "../../../types/datatypes";

export default abstract class AnswerSubmissionDataInterface extends DataInterface<AnswerSubmissionData[]>{

    public abstract submitAnswerUpdate(answerSubmission: AnswerSubmissionData, newAnswer: string): Promise<void>;

}