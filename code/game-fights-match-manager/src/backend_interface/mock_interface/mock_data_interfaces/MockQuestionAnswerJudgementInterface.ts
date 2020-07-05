import DataInterface from "../../lib/abstract_implementations/AbstractDataInterface";

import IJudgeableQuestionsInterface from "../../game_fights_data_interface/data_interfaces/question_interfaces/IQuestionAnswerJudgementsInterface";

import UniquelyIdentifiableCollection from "../../../utility/UniquelyIdentifiableCollection";

import { ParticipantAnswerDataEquator } from "../../../types/equators/DataEquators";
import { QuestionAnswersJudgementEquator, FighterDataEquator } from "../../../types/equators/UniquelyIndentifiableEquators";
import { AnswerSubmissionState, MatchStage } from "../../../enums/statusEnums";
import { JudgeableQuestionData, Question } from "../../../types/datatypes";

import testFighterDatabase from "../test_data/testFighterDatabase";

export default class MockJudgeableQuestionsInterface extends DataInterface<JudgeableQuestionData[]> implements IJudgeableQuestionsInterface{
    
    private judgements: UniquelyIdentifiableCollection<JudgeableQuestionData>;

    private fighterDataEquator = new FighterDataEquator();
    private answerJudgementDataEquator = new ParticipantAnswerDataEquator(this.fighterDataEquator);
    private questionAnswersJudgementEquator = new QuestionAnswersJudgementEquator(this.answerJudgementDataEquator);

    constructor(judgements: JudgeableQuestionData[]){
        super();
        this.judgements = new UniquelyIdentifiableCollection(judgements, this.questionAnswersJudgementEquator);
    }

    protected async loadData() {
        return this.judgements.asArray();
    }
    
    public async requestQuestionDeletion(question: Question) {
        await new Promise((resolve) => { setTimeout(() => { resolve() }, 3000)});
        this.judgements = this.judgements.removeElementWithId(question.id);
        return this.judgements.asArray();
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
                    timeSubmitted: new Date(Date.now()),
                    state: AnswerSubmissionState.NO_ANSWER
                },
                {
                    participant: testFighterDatabase.retrieveElementWithId(13),
                    answer: "",
                    timeSubmitted: new Date(Date.now()),
                    state: AnswerSubmissionState.NO_ANSWER
                }
            ]
        }

        this.judgements = this.judgements.add(newQuestion);
        return this.judgements.asArray();

    }

    public async submitAnswerJudgementStateUpdate(question: JudgeableQuestionData, answerIndex: number, 
            answerStatus: AnswerSubmissionState) {
        
        await new Promise((resolve) => { setTimeout(() => { resolve() }, 3000)});

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
            timeSubmitted: oldJudgement.timeSubmitted,
            state: answerStatus
        }
        newQuestion.answerJudgements[answerIndex] = newJudgement; 

        this.judgements = this.judgements.removeElementWithId(oldQuestion.id)
                              .add(newQuestion);

    return this.judgements.asArray();

    }
    
}