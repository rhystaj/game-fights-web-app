import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'
import fighterDatabase, { FAILURE_FIGHTER_ID } from './test_data/testFighterDatabase'

import { QueryCallback } from '../../types/functionTypes';

import GameFightsDataInterface from '../GameFightsDataInterface';

import { UserMatchStatus, MatchStage } from '../../enums/statusEnums';
import { Question, AnswerSubmissionData, MatchData, FighterData } from '../../types/datatypes';

export default class MockGameFightsDataInterface extends GameFightsDataInterface{

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
    }

    public queryMatchInfo(queryCallback: QueryCallback<MatchData>){
        setTimeout(() => queryCallback(matchData), 1000);
    }

    public fetchFightersByName(name: string): (queryCallback: QueryCallback<FighterData[]>) => void {
        return queryCallback => {
            queryCallback(fighterDatabase.asArray().filter(fighter => fighter.name.indexOf(name) >= 0))
        };
    }

    public submitQuestion(question: string){
        return new Promise<string>(this.testSubmission(question, (data: string) => (data.localeCompare("Fail") === 0)));
    }

    public submitMatchParticipants(participants: FighterData[]) {
        return new Promise<FighterData[]>(this.testSubmission(participants, 
            (participants: FighterData[]) => participants.filter(f => f.id === FAILURE_FIGHTER_ID).length > 0));
    }

    public submitMatchTitle(title: string){
        return new Promise<string>(this.testSubmission(title, (data: string) => (data.localeCompare("Fail") === 0)));
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