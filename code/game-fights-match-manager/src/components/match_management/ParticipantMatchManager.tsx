import React from 'react';
import MatchManager, { MatchManagerProps } from './MatchManager';

import ParticipantMatchInfo from './match_info/ParticipantMatchInfo';
import QuestionsViewer from './question_management/QuestionViewer'
import AnswerSubmissionManager from './answer_submission/manager/AnswerSubmissionManager';
import AnswerSubmissionViewer from './answer_submission/manager/AnswerSubmissionViewer';

import { MatchStage } from '../../enums/statusEnums';

import DataInterface from '../../backend_interface/lib/abstract_implementations/AbstractDataInterface';

class ParticipantMatchManager extends MatchManager{
    
    protected get cancelButtonText(): string {
        return "Forfiet";
    }

    renderManagementComponent(){
        
        switch(this.props.matchStage){

            case MatchStage.DETERMINING_QUESTIONS:
                return <QuestionsViewer dataInterfaceManager={this.props.dataInterfaceManager} />
            
            case MatchStage.ANSWERS_OPENED:
                return <AnswerSubmissionManager dataInterfaceManager={this.props.dataInterfaceManager} />

            case MatchStage.RECORDING_RESULTS:
                    return <AnswerSubmissionViewer dataInterfaceManager={this.props.dataInterfaceManager} />

            default:
                throw Error("A component has not been assinged to stage " + MatchStage[this.props.matchStage] + 
                        " in the ParticipantMatchManager.");

        }
        
    }

}

export default ParticipantMatchManager