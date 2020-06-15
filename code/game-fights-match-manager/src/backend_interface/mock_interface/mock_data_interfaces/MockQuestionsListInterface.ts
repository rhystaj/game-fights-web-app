import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IQuestionListInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionListInterface";

import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { Question } from "../../../types/datatypes";
import { QuestionEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { MatchStage } from "../../../enums/statusEnums";

import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";

export default class MockQuestionsListInterface extends DataInterface<Question[]> implements IQuestionListInterface{
    
    private questions: UniquelyIdentifiableCollection<Question>;
    private userMatchStatusInterface: MockUserMatchStatusInterface;
    private matchStageInterface: MockMatchStageDataInterface;

    constructor(questions: Question[], userMatchStatusInterface: MockUserMatchStatusInterface,
            matchStageInterface: MockMatchStageDataInterface){
        super();
        this.questions = new UniquelyIdentifiableCollection<Question>(questions, new QuestionEquator());
        this.userMatchStatusInterface = userMatchStatusInterface;
        this.matchStageInterface = matchStageInterface;
    }
    
    protected async loadData(){
        
        //Simulate latency.
        await new Promise(res => setTimeout(() => res(), 3000));

        return this.questions.asArray();

    }

    public async submitNewQuestion(question: string){

        await new Promise(res => setTimeout(() => res(), 3000));

        if(question.localeCompare("FAIL") === 0)
            throw Error();
        
        const newQuestionId = this.questions.nextAvaliableId;
        this.questions = this.questions.add({
            id: newQuestionId,
            text: question
        })

        return this.questions.asArray();
    }
    
    public async requestQuestionDeletion(question: Question){
        
        await new Promise((resolve) => { setTimeout(() => { resolve() }, 3000)});
        
        this.questions = this.questions.removeElementWithId(question.id);
        return this.questions.asArray();

    }

    public async progressMatch() {
        this.matchStageInterface.setMatchStage(MatchStage.ANSWERS_OPENED);
    }

    public async cancelMatch() {
        await this.matchStageInterface.setMatchStage(MatchStage.DETERMINING_QUESTIONS);
        await this.userMatchStatusInterface.clear();
    }

}