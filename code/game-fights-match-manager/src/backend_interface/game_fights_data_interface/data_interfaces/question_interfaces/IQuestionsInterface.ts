import IDataInterface from "../../../lib/interfaces/IDataInterface";

import { Question } from "../../../../types/datatypes";
import IMatchProgressingDataInterface from "../IMatchProgessingDataInterface";

export default interface IQuestionsInterface<Q> extends IMatchProgressingDataInterface<Q[]>{

    /**
     * Submit a question to be added to the list of questions in the match.
     * @param question 
     */
    submitNewQuestion(question: string): Promise<void>;

    /**
     * Request that a question be removed from the match's list of questions.
     * @param question 
     */
    requestQuestionDeletion(question: Question): Promise<void>;

}