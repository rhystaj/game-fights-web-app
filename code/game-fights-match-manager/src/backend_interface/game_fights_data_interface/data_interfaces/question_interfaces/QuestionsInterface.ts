import { Question } from "../../../../types/datatypes";
import DataInterface from "../../../lib/DataInterface";

export default abstract class QuestionsInterface<Q> extends DataInterface<Q[]>{

    /**
     * Submit a question to be added to the list of questions in the match.
     * @param question 
     */
    public abstract submitNewQuestion(question: string): Promise<void>;

    /**
     * Request that a question be removed from the match's list of questions.
     * @param question 
     */
    public abstract requestQuestionDeletion(question: Question): Promise<void>;

}