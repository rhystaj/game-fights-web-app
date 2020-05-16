import QuestionsInterface from "./QuestionsInterface";
import { Question } from "../../../../types/datatypes";

export default abstract class QuestionListInterface extends QuestionsInterface<Question>{

    /**
     * [DES/PRE] Give the participants in the match the abilty to submit answers for the questions in the list.
     */
    public abstract openAnswerSubmissions() : Promise<void>;

}