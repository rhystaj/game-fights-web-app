import status from './../../enums/userMatchStatus'
import stage from './../../enums/matchStage'

import submissions from './test_data/submissions'
import matchData from './test_data/matchData'
import questions from './test_data/questions'

export default Object.freeze({
    
    queryUserMatchStatus: function(queryCallback){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(status.JUDGING);}, 1000);
        
    },

    queryMatchStage: function(queryCallback){
        setTimeout(() => {queryCallback(stage.DETERMINING_QUESTIONS)}, 1000);
    },

    queryQuestions: function(queryCallback){
        setTimeout(() => {queryCallback({questions});}, 1000);
    },

    queryAnswerSubmissions: function(queryCallback){
        setTimeout(() => {queryCallback( {submissions} );}, 1000);
    },

    queryMatchInfo(queryCallback){
        setTimeout(() => queryCallback(matchData.soloData), 1000);
    }

});