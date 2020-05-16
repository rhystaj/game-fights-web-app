import QuestionAnswerJudgementsInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/QuestionAnswerJudgementsInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { ParticipantAnswerDataEquator } from "../../../types/equators/DataEquators";
import { QuestionAnswersJudgementEquator, FighterDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { AnswerSubmissionState, MatchStage } from "../../../enums/statusEnums";
import { QuestionAnswersJudgementData, Question } from "../../../types/datatypes";

import testFighterDatabase from "../test_data/testFighterDatabase";
import UserMatchStatusInterface from "../../game_fights_data_interface/data_interfaces/UserMatchStatusInterface";
import MockUserMatchStatusInterface from "./MockUserMatchStatusInterface";
import MockMatchStageDataInterface from "./MockMatchStageDataInterface";

export default class MockQuestionAnswerJudgementsInterface extends QuestionAnswerJudgementsInterface{
    
    private judgements: UniquelyIdentifiableCollection<QuestionAnswersJudgementData>;
    private matchStageInterface: MockMatchStageDataInterface;

    private fighterDataEquator = new FighterDataEquator();
    private answerJudgementDataEquator = new ParticipantAnswerDataEquator(this.fighterDataEquator);
    private questionAnswersJudgementEquator = new QuestionAnswersJudgementEquator(this.answerJudgementDataEquator);

    constructor(judgements: QuestionAnswersJudgementData[], matchStageInterface: MockMatchStageDataInterface){
        super();
        this.judgements = new UniquelyIdentifiableCollection(judgements, this.questionAnswersJudgementEquator);
        this.matchStageInterface = matchStageInterface;
    }

    protected async loadData() {
        return this.judgements.asArray();
    }
    
    public async requestQuestionDeletion(question: Question) {
        this.judgements = this.judgements.removeElementWithId(question.id);
        this.refresh();
    }

    public async submitNewQuestion(question: string) {
        
        if(question.localeCompare("FAIL") === 0)
            throw Error();

        const nextId = this.judgements.nextAvaliableId;
        const newQuestion = {
            id: nextId,
            text: question,
            answerJudgements: [
                {
                    participant: testFighterDatabase.retrieveElementWithId(10),
                    answer: "",
                    state: AnswerSubmissionState.NO_ANSWER
                },
                {
                    participant: testFighterDatabase.retrieveElementWithId(13),
                    answer: "",
                    state: AnswerSubmissionState.NO_ANSWER
                }
            ]
        }

        this.judgements = this.judgements.add(newQuestion);
        this.refresh();

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

        this.refresh();

    }
    
    public async finaliseAnswerSubmissions() {
        await this.matchStageInterface.setMatchStage(MatchStage.RECORDING_RESULTS);
    }
 
}