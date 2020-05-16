import IQuestionsInterface from "./IQuestionsInterface";

import { Question } from "../../../../types/datatypes";

export default interface IQuestionListInterface extends IQuestionsInterface<Question>{

    /**
     * [DES/PRE] Give the participants in the match the abilty to submit answers for the questions in the list.
     */
    openAnswerSubmissions() : Promise<void>;

}