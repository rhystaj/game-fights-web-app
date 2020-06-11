import React from 'react';
import MatchManager from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'

import { MatchStage } from '../../enums/statusEnums';

import DataInterface from '../../backend_interface/lib/abstract_implementations/AbstractDataInterface';
import AnswerSubmissionManager from './answer_submission/manager/AnswerSubmissionManager';

class ParticipantMatchManager extends MatchManager{
    
    renderMatchInfo(dataInterface: DataInterface<MatchStage>, matchStage: MatchStage){
        return <ParticipantMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />
    }

    renderManagementComponent(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        
        switch(stage){

            case MatchStage.DETERMINING_QUESTIONS:
                return <QuestionsViewer dataInterfaceManager={this.props.dataInterfaceManager} />
            
            case MatchStage.ANSWERS_OPENED:
                return <AnswerSubmissionManager dataInterfaceManager={this.props.dataInterfaceManager} />

            default:
                throw Error("A component has not been assinged to state " + stage + " in the ParticipantMatchManager.");

        }
        
    }

}

export default ParticipantMatchManager