import QuestionAnswerJudgementsInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface";
import { UniquelyIdentifiableEquator, QuestionAnswersJudgementEquator, AnswerSubmissionDataEquator, FighterDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";
import { QuestionAnswersJudgementData, Question } from "../../../types/datatypes";
import { AnswerJudgementDataEquator } from "../../../types/equators/DataEquators";
import { AnswerSubmissionState } from "../../../enums/statusEnums";
import questions from "../test_data/questions";

export default class MockQuestionAnswerJudgementsInterface extends QuestionAnswerJudgementsInterface{
    
    private judgements: UniquelyIdentifiableCollection<QuestionAnswersJudgementData>;

    private fighterDataEquator = new FighterDataEquator();
    private answerJudgementDataEquator = new AnswerJudgementDataEquator(this.fighterDataEquator);
    private questionAnswersJudgementEquator = new QuestionAnswersJudgementEquator(this.answerJudgementDataEquator);

    constructor(judgements: QuestionAnswersJudgementData[]){
        super();
        this.judgements = new UniquelyIdentifiableCollection(judgements, this.questionAnswersJudgementEquator);
    }

    protected async loadData() {
        return this.judgements.asArray();
    }
    
    public async requestQuestionDeletion(question: Question) {
        this.judgements.removeElementWithId(question.id);
    }

    public async submitNewQuestion(question: string) {
        throw new Error("Method not implemented.");
    }

    public async submitAnswerJudgementStateUpdate(question: QuestionAnswersJudgementData, answerIndex: number, 
            answerStatus: AnswerSubmissionState) {
        
        const oldQuestion = this.judgements.retrieveElementWithId(question.id);
        const oldJudgement = oldQuestion.answerJudgements[answerIndex];

        const newQuestion = {
            id: oldQuestion.id,
            text: oldQuestion.text,
            answerJudgements: oldQuestion.answerJudgements.filter(e => true)
        }
        const newJudgement = {
            participant: oldJudgement.participant,
            answer: oldJudgement.answer,
            state: answerStatus
        }
        newQuestion.answerJudgements[answerIndex] = newJudgement; 

        this.judgements = this.judgements.removeElementWithId(oldQuestion.id)
                              .add(newQuestion);

    }
    
    
 
}