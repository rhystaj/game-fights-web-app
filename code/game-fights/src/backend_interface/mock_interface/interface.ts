import status from '../../enums/userMatchStatus'
import stage from '../../enums/matchStage'

import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'
import fighterSearchResults from './test_data/fighterSearchResults'

import { QuestionSubmission, SoloMatchData, FighterData } from '../../types/datatypes';


const beInterface = {
    queryUserMatchStatus: function(queryCallback: (resultStatus: number) => void){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(status.JUDGING);}, 1000);
        
    },

    queryMatchStage: function(queryCallback: (resultStage: number) => void){
        setTimeout(() => {queryCallback(stage.DETERMINING_QUESTIONS)}, 1000);
    },

    queryQuestions: function(queryCallback: (resultQuestions: {questions: string[]}) => void){
        setTimeout(() => {queryCallback({questions});}, 1000);
        
        //To simulate a question being added after the page has loaded.
        setTimeout(() => {beInterface.updateQuestion()}, 10000);
    },

    updateQuestion: function(){
        if(this.events.onQuestionUpdate !== undefined){
            this.events.onQuestionUpdate(questions.concat("New quesiton"));
        }
    },

    queryAnswerSubmissions: function(queryCallback : (resultSubmissions: { submissions: QuestionSubmission[] }) => void){
        setTimeout(() => {queryCallback( {submissions} );}, 1000);
    },

    queryMatchInfo: function(queryCallback: (matchData: SoloMatchData) => void){
        setTimeout(() => queryCallback(matchData.soloData), 1000);
    },

    fetchFightersByName: (name: string) => (queryCallback: (fighterData: FighterData[]) => void) => {
        queryCallback(fighterSearchResults.filter(fighter => fighter.name.indexOf(name) >= 0));
    },

    testSubmission: function(data: string, successCallback: () => void, failureCallback: () => void){
        
        if(data.localeCompare("Fail") === 0){
            //For testing purposes.
            failureCallback();
        }
        else{
            successCallback();
        }
        
    },

    submitQuestion: function(question: string, successCallback: () => void, failureCallback: () => void){
        beInterface.testSubmission(question, successCallback, failureCallback);
    }, 

    submitMatchTitle: function(title: string, successCallback: () => void, failureCallback: () => void){
        beInterface.testSubmission(title, successCallback, failureCallback)
    },

    events: {
        //Does nothing - to be overridden.
        onQuestionUpdate: (mockParam: string[]) => {}
    }
}

export default beInterface;
