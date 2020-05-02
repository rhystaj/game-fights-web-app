import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'
import fighterDatabase, { FAILURE_FIGHTER_ID } from './test_data/testFighterDatabase'

import { QueryCallback } from '../../types/functionTypes';

import GameFightsDataInterface from '../GameFightsDataInterface';

import { UserMatchStatus, MatchStage, AnswerSubmissionState } from '../../enums/statusEnums';
import { Question, AnswerSubmissionData, MatchData, FighterData, QuestionAnswersJudgementData, AnswerJudgementData } from '../../types/datatypes';
import UniquelyIdentifiableCollection from '../../utility/UniquelyIdentifiableCollection';
import { AnswerSubmissionDataEquator, QuestionEquator, FighterDataEquator, QuestionAnswersJudgementEquator } from '../../types/equators/UniquelyIndentifiableEquators';
import answerJudgements from './test_data/answerJudgements';
import { AnswerJudgementDataEquator } from '../../types/equators/DataEquators';
import testFighterDatabase from './test_data/testFighterDatabase';

export default class MockGameFightsDataInterface extends GameFightsDataInterface{
    
    private answerSubmissionDataEquator = new AnswerSubmissionDataEquator();
    private questionEquator = new QuestionEquator();
    private fighterDataEquator = new FighterDataEquator();
    private answerJudgementDataEquator = new AnswerJudgementDataEquator(this.fighterDataEquator);
    private questionAnswersJudgementDataEquator = new QuestionAnswersJudgementEquator(this.answerJudgementDataEquator);

    private answerSubmissions = new UniquelyIdentifiableCollection(submissions, this.answerSubmissionDataEquator);
    private questions = new UniquelyIdentifiableCollection(questions, this.questionEquator);
    private questionAnswersJudgements = new UniquelyIdentifiableCollection(answerJudgements, this.questionAnswersJudgementDataEquator)

    public queryUserMatchStatus(queryCallback: QueryCallback<UserMatchStatus>){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(UserMatchStatus.JUDGING);}, 1000);
        
    }

    public queryMatchStage(queryCallback: QueryCallback<MatchStage>){
        setTimeout(() => {queryCallback(MatchStage.DETERMINING_QUESTIONS)}, 1000);
    }

    public queryQuestions(queryCallback: QueryCallback<Question[]>){
        
        setTimeout(() => {queryCallback(questions);}, 1000);
        
        //To simulate a question being added after the page has loaded.
        setTimeout(() => {this.updateQuestion()}, 10000);
        
    }

    /**
     * [DES] Mocks the addition of a new question and the successive calling of the event.
     */
    private updateQuestion(){
        if(this.events.onQuestionUpdate !== undefined){
            this.events.onQuestionUpdate(questions.concat({
                id: 6,
                text: "New quesiton"
            }));
        }
    }

    public queryAnswerSubmissions(queryCallback : QueryCallback<AnswerSubmissionData[]>){
        
        setTimeout(() => {queryCallback(submissions);}, 1000);

        //To simulate the state of an answer submission being changed after the submissions have been loaded.
        setTimeout(() => { 
            submissions[3].state = AnswerSubmissionState.ACCEPTED;
            this.events.onExternalAnswerSubmissionStateChange(submissions);
        }, 5000);

    }

    public queryMatchInfo(queryCallback: QueryCallback<MatchData>){
        setTimeout(() => queryCallback(matchData), 1000);
    }

    public fetchFightersByName(name: string): (queryCallback: QueryCallback<FighterData[]>) => void {
        return queryCallback => {
            queryCallback(fighterDatabase.asArray().filter(fighter => fighter.name.indexOf(name) >= 0))
        };
    }

    public queryAnswerJudgements(queryCallback: QueryCallback<QuestionAnswersJudgementData[]>){
        setTimeout(() => queryCallback(answerJudgements), 1000)
    }

    public async submitQuestion(question: string){
        
        if(question.localeCompare("Fail") === 0) throw Error();
        
        const newQuestionId = this.questions.nextAvaliableId;
        this.questions = this.questions.add({
            id: newQuestionId,
            text: question
        })

        return this.questions.asArray();

    }

    public async requestQuestionDeletion(question: Question){

        this.questions = this.questions.removeElementWithId(question.id);
        return this.questions.asArray();

    }

    public async submitImmediatelyAnswerableQuestion(question: string){

        const newQuestionId = this.questionAnswersJudgements.nextAvaliableId;

        const newQuestionSubmission = {

            id: newQuestionId,
            text: question,
            answerJudgements: [
                {
                    participant: testFighterDatabase.retrieveElementWithId(1) as FighterData,
                    answer: "",
                    state: AnswerSubmissionState.NO_ANSWER
                },
                {
                    participant: testFighterDatabase.retrieveElementWithId(2) as FighterData,
                    answer: "",
                    state: AnswerSubmissionState.NO_ANSWER
                }
            ]

        }

        this.questionAnswersJudgements = this.questionAnswersJudgements.add(newQuestionSubmission)

        //To simulate an answer submission being set later.
        setTimeout(() => {
            
            const answerJudgement = this.questionAnswersJudgements.retrieveElementWithId(newQuestionId).answerJudgements[0];
            answerJudgement.answer = "Answer Submitted Later.";
            answerJudgement.state = AnswerSubmissionState.PENDING_JUDGE_APPROVAL;

            this.events.onParticipantAnswerSubmissionChange(this.questionAnswersJudgements.asArray());

        }, 5000)

        return this.questionAnswersJudgements.asArray();

    }

    public async requestAnswerableQuestionDeletion(question: QuestionAnswersJudgementData){
        this.questionAnswersJudgements = this.questionAnswersJudgements.removeElementWithId(question.id);
        return this.questionAnswersJudgements.asArray();
    }

    public submitMatchParticipants(participants: FighterData[]) {
        return new Promise<FighterData[]>(this.testSubmission(participants, 
            (participants: FighterData[]) => participants.filter(f => f.id === FAILURE_FIGHTER_ID).length > 0));
    }

    public submitMatchTitle(title: string){
        return new Promise<string>(this.testSubmission(title, (data: string) => (data.localeCompare("Fail") === 0)));
    }

    public async submitAnswerUpdate(submission: AnswerSubmissionData, updatedAnswer: string){
        
        if(updatedAnswer.localeCompare("Fail") === 0) throw Error();

        let answerSub: AnswerSubmissionData | undefined = this.answerSubmissions.retrieveElementWithId(submission.id);
        if(answerSub !== undefined){
            answerSub.answer = updatedAnswer;
            answerSub.state = AnswerSubmissionState.PENDING_JUDGE_APPROVAL;
        }

        return this.answerSubmissions.asArray();

    }

    public async submitAnswerJudgementStateUpdate(questionsAnswersJudgement: QuestionAnswersJudgementData, 
            answerIndex: number, updateState: AnswerSubmissionState){

        const questionsAnswersJudgementInDatabase = this.questionAnswersJudgements.retrieveElementWithId(questionsAnswersJudgement.id);
        if(questionsAnswersJudgementInDatabase !== undefined){
            questionsAnswersJudgementInDatabase.answerJudgements[answerIndex].state = updateState;
        }

        return this.questionAnswersJudgements.asArray();

    }

    /**
     * Mock a submission that can be deliberately failed by enterinf keyword 'Fail', but otherwise will succeed/
     * @param data The data to be sent in the mock submission.
     * @param successCallback Called if the data is not set to 'Fail' - mocks a successful submission.
     * @param failureCallback Called if the dtat is set to 'Fail' - mocks a failed submission.
     */
    private testSubmission<T>(data: T, failCondition: (t: T) => boolean): 
        (resolve: (result: T) => void, reject: (any: any) => void) => void{


        return (resolve: (result: T) => void, reject: (any: any) => void) => {
            if(failCondition(data)){
                //For testing purposes.
                reject(null);
            }
            else{
                resolve(data);
            }
        }

    
    }

}