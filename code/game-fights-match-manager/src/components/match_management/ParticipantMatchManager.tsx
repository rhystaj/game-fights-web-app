import React from 'react';
import MatchManager from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'

import { MatchStage } from '../../enums/statusEnums';

import DataInterface from '../../backend_interface/lib/abstract_implementations/AbstractDataInterface';

class ParticipantMatchManager extends MatchManager{
    
    renderMatchInfo(dataInterface: DataInterface<MatchStage>, matchStage: MatchStage){
        return <ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />
    }

    renderManagementComponent(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        if(stage === MatchStage.DETERMINING_QUESTIONS){
            return<QuestionsViewer dataInterfaceManager={this.props.dataInterfaceManager} />
        }
        else{
            return super.renderManagementComponent(dataInterface, stage);
        }
    }

}

export default ParticipantMatchManager