import status from './../../enums/userMatchStatus'
import submissions from './test_data/submissions'
import matchData from './test_data/matchData'

export default Object.freeze({
    
    queryMatchStatus: function(queryCallback){
        
        //Set timeout is to simulate latency.
        setTimeout(() => {queryCallback(status.MATCH);}, 1000);
        
    },

    queryQuestionSubmissions: function(queryCallback){
        setTimeout(() => {queryCallback(submissions);}, 1000);
    },

    queryParticipantMatchInfo(queryCallback){
        setTimeout(() => queryCallback(matchData.soloData), 1000);
    }

});