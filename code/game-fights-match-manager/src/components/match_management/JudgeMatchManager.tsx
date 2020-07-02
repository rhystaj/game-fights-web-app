import React from 'react'
import MatchManager from './MatchManager';
import QuestionListEditor from './question_management/QuestionListEditor'
import JudgeMatchInfo from './match_info/JudgeMatchInfo';

import { MatchStage } from '../../enums/statusEnums';

import { LoadingComponentState } from '../utility/LoadingComponent';
import AnswerJudgementManager from './answer_judgement/AnswerJudgementManager';
import DataInterface from '../../backend_interface/lib/abstract_implementations/AbstractDataInterface';
import MatchResultsManager from './match_results/MatchResultsManager';

export default class JudgeMatchManager extends MatchManager{
    
    protected get cancelButtonText(): string {
        return "Cancel Match";
    }

    renderMatchInfo(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        return <JudgeMatchInfo dataInterfaceManager={this.props.dataInterfaceManager} />
    }

    renderManagementComponent(dataInterface: DataInterface<MatchStage>, stage: MatchStage){
        
        switch(stage){

            case MatchStage.DETERMINING_QUESTIONS:
                return (<QuestionListEditor dataInterfaceManager={this.props.dataInterfaceManager}/>)
            
            case MatchStage.ANSWERS_OPENED:
                return (<AnswerJudgementManager dataInterfaceManager={this.props.dataInterfaceManager}/>)
            
            case MatchStage.RECORDING_RESULTS:
                return (<MatchResultsManager dataInterfaceManager={this.props.dataInterfaceManager} />)
            
            default:
                throw Error("A component has not been assigned to stage " + MatchStage[stage] + " in the JudgeMatchManager.");

        }
        
    }

}