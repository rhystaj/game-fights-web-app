import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'
import fighterSearchResults from './test_data/fighterSearchResults'

import { QueryCallback } from '../../types/functionTypes';

import GameFightsDataInterface from '../GameFightsDataInterface';

import { UserMatchStatus, MatchStage } from '../../enums/statusEnums';
import { Question, AnswerSubmissionData, MatchData, FighterData } from '../../types/datatypes';

export default class MockGameFightsDataInterface extends GameFightsDataInterface{
    
    public queryUserMatchStatus(queryCallback: QueryCallback<UserMatchStatus>){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(UserMatchStatus.PARTCIPATING);}, 1000);
        
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
            queryCallback(fighterSearchResults.filter(fighter => fighter.name.indexOf(name) >= 0))
        };
    }

    public submitQuestion(question: string, successCallback: () => void, failureCallback: () => void){
        this.testSubmission(question, successCallback, failureCallback);
    }

    public submitMatchTitle(title: string, successCallback: () => void, failureCallback: () => void){
        this.testSubmission(title, successCallback, failureCallback)
    }

    /**
     * Mock a submission that can be deliberately failed by enterinf keyword 'Fail', but otherwise will succeed/
     * @param data The data to be sent in the mock submission.
     * @param successCallback Called if the data is not set to 'Fail' - mocks a successful submission.
     * @param failureCallback Called if the dtat is set to 'Fail' - mocks a failed submission.
     */
    private testSubmission(data: string, successCallback: () => void, failureCallback: () => void){
        
        if(data.localeCompare("Fail") === 0){
            //For testing purposes.
            failureCallback();
        }
        else{
            successCallback();
        }
        
    }

}