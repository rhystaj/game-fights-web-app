import { Question } from "../../../../types/datatypes";
import IDataInterface from "../../../lib/interfaces/IDataInterface";

export default interface IQuestionsInterface<Q> extends IDataInterface<Q[]>{

    /**
     * Submit a question to be added to the list of questions in the match.
     * @param question 
     */
    submitNewQuestion(question: string): Promise<Q[]>;

    /**
     * Request that a question be removed from the match's list of questions.
     * @param question 
     */
    requestQuestionDeletion(question: Question): Promise<Q[]>;

}