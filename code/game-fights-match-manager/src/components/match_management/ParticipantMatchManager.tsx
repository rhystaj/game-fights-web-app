import React from 'react';
import MatchManager from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'
import GameFightsDataInterface from '../../backend_interface/GameFightsDataInterface';
import { MatchStage } from '../../enums/statusEnums';

class ParticipantMatchManager extends MatchManager{


    renderMatchInfo(dataInterface: GameFightsDataInterface, matchStage: MatchStage){
        return <ParticipantMatchInfo dataInterface={dataInterface} />
    }

    renderManagementComponent(dataInterface: GameFightsDataInterface, stage: MatchStage){
        if(stage === MatchStage.DETERMINING_QUESTIONS){
            return<QuestionsViewer dataInterface={dataInterface} />
        }
        else{
            return super.renderManagementComponent(dataInterface, stage);
        }
    }

}

export default ParticipantMatchManager