import QuestionsInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/QuestionsInterface";
import { Question } from "../../../types/datatypes";
import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { QuestionEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import questions from "../test_data/questions";

export default class MockQuestionsListInterface extends QuestionsInterface<Question>{
    
    private questions: UniquelyIdentifiableCollection<Question>;

    constructor(questions: Question[]){
        super();
        this.questions = new UniquelyIdentifiableCollection<Question>(questions, new QuestionEquator());
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

}