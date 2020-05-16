import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IQuestionListInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";

import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { Question } from "../../../types/datatypes";
import { QuestionEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { MatchStage } from "../../../enums/statusEnums";

export default class MockQuestionsListInterface extends DataInterface<Question[]> implements IQuestionListInterface{
    
    private questions: UniquelyIdentifiableCollection<Question>;
    private matchStageInterface: MockMatchStageDataInterface;

    constructor(questions: Question[], matchStageInterface: MockMatchStageDataInterface){
        super();
        this.questions = new UniquelyIdentifiableCollection<Question>(questions, new QuestionEquator());
        this.matchStageInterface = matchStageInterface;
    }

    protected async loadData(){
        
        //Simulate latency.
        await new Promise(res => setTimeout(() => res(), 3000));

        return this.questions.asArray();

    }

    public async submitNewQuestion(question: string){
        
        if(question.localeCompare("FAIL") === 0)
            throw Error();
        
        const newQuestionId = this.questions.nextAvaliableId;
        this.questions = this.questions.add({
            id: newQuestionId,
            text: question
        })

        this.refresh();
    }
    
    public async requestQuestionDeletion(question: Question){
        this.questions = this.questions.removeElementWithId(question.id);
        this.refresh();
    }

    public async openAnswerSubmissions() {
        this.matchStageInterface.setMatchStage(MatchStage.ANSWERS_OPENED);
    }

}