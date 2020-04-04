import React from 'react';
import MatchManager from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'

import matchState from './../../enums/matchStage';

class ParticipantMatchManager extends MatchManager{

    constructor(props){
        super(props);
    }

    renderMatchInfo(){
        return <ParticipantMatchInfo />
    }

    renderManagementComponent(stage){
        if(stage === matchState.DETERMINING_QUESTIONS){
            return<QuestionsViewer />
        }
    }

}

export default ParticipantMatchManager