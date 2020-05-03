import React from 'react';
import MatchManager from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'

import { MatchStage } from '../../enums/statusEnums';

import DataInterface from '../../backend_interface/lib/DataInterface';

class ParticipantMatchManager extends MatchManager{
    
    public getDataInterface(): import("../../backend_interface/lib/DataInterface").default<MatchStage> {
        throw new Error("Method not implemented.");
    }

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