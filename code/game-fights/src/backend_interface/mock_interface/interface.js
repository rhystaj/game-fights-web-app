import status from './../../enums/userMatchStatus'
import stage from './../../enums/matchStage'

import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'

const beInterface = {
    
    queryUserMatchStatus: function(queryCallback){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(status.JUDGING);}, 1000);
        
    },

    queryMatchStage: function(queryCallback){
        setTimeout(() => {queryCallback(stage.DETERMINING_QUESTIONS)}, 1000);
    },

    queryQuestions: function(queryCallback){
        setTimeout(() => {queryCallback({questions});}, 1000);
        
        //To simulate a question being added after the page has loaded.
        setTimeout(() => {beInterface.updateQuestion()}, 10000);
    },

    updateQuestion: function(){
        if(this.events.onQuestionUpdate !== undefined){
            this.events.onQuestionUpdate(questions.concat("New quesiton"));
        }
    },

    queryAnswerSubmissions: function(queryCallback){
        setTimeout(() => {queryCallback( {submissions} );}, 1000);
    },

    queryMatchInfo: function(queryCallback){
        setTimeout(() => queryCallback(matchData.soloData), 1000);
    },

    submitQuestion: function(data, successCallback, failureCallback){
        
        if(data.localeCompare("Fail") === 0){
            //For testing purposes.
            failureCallback();
        }
        else{
            successCallback();
        }
        
    },

    events: {
        onQuestionUpdate: undefined //Will be overridden.
    }

}

export default beInterface;